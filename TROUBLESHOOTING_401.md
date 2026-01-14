# 🔧 401 Unauthorized Errors - Troubleshooting Guide

## ❌ Problem
You're seeing **401 (Unauthorized)** errors on all API endpoints:
```
POST http://localhost:8080/api/device/heartbeat - 401 (Unauthorized)
GET http://localhost:8080/api/system/metrics - 401 (Unauthorized)
GET http://localhost:8080/api/mobile/devices - 401 (Unauthorized)
... and more
```

## ✅ Solutions Applied

### 1. **Enhanced API Client** (`src/lib/api.js`)
- ✅ Added global 401 error handling
- ✅ Automatic token cleanup on auth failure
- ✅ Better error messages for network issues
- ✅ 10-second timeout to prevent hanging requests
- ✅ Prevents infinite redirect loops

### 2. **Improved Authentication** (`ProtectedRoute.jsx`)
- ✅ Now validates actual Supabase session (not just localStorage)
- ✅ Auto-refreshes token from active session
- ✅ Listens for auth state changes in real-time
- ✅ Shows loading spinner during auth check
- ✅ Automatic cleanup on component unmount

## 📋 **Step-by-Step Resolution**

### **Step 1: Verify Backend is Running**

```bash
# Check if backend is running on port 8080
# You should see your backend logs
```

**Expected:** Backend server should be running and accepting connections.

**If backend is NOT running:**
```bash
cd path/to/your/backend
npm start
# or
java -jar your-backend.jar
# or whatever command starts your backend
```

---

### **Step 2: Clear Browser Data**

1. Open **DevTools** (F12)
2. Go to **Application** tab
3. Click **Clear Storage** in left sidebar  
4. Click **"Clear site data"** button
5. **Refresh the page** (Ctrl+R or Cmd+R)

This removes any corrupted tokens.

---

### **Step 3: Login Again**

1. Navigate to: `http://localhost:5173/auth` (or your dev port)
2. Enter your credentials
3. Click **AUTHENTICATE** button
4. If successful, you should be redirected to Dashboard

**Successful Login Creates:**
- ✅ Active Supabase session
- ✅ `supabase_token` in localStorage
- ✅ Authorization header on all API requests

---

### **Step 4: Verify Backend Authentication**

Your backend needs to:

#### ✅ **Accept Supabase JWT Tokens**
```java
// Example backend middleware (adjust to your stack)
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) {
        http
            .oauth2ResourceServer()
            .jwt()
            .jwkSetUri("https://nvazukwdinclvqzwensp.supabase.co/.well-known/jwks.json");
        return http.build();
    }
}
```

#### ✅ **Verify Token Structure**
Your backend should validate:
- Bearer token format
- Token signature (using Supabase public key)
- Token expiration
- Token issuer matches Supabase URL

#### ✅ **Check CORS Settings**
```java
// Backend CORS configuration
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.addAllowedOrigin("http://localhost:5173"); // Vite dev server
    configuration.addAllowedOrigin("http://localhost:8080"); // Your port
    configuration.addAllowedMethod("*");
    configuration.addAllowedHeader("*");
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

---

### **Step 5: Test Authentication Flow**

#### **A. Check Token in Browser Console:**

```javascript
// In browser DevTools console:
console.log('Token:', localStorage.getItem('supabase_token'));
```

**Expected Output:**
```
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (long JWT string)
```

**If `null`:** You need to login first.

#### **B. Manual API Test:**

```javascript
// In browser console after logging in:
fetch('http://localhost:8080/api/system/metrics', {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('supabase_token')}`,
        'X-Device-Id': 'dev-win-11-prod-01'
    }
})
.then(res => res.json())
.then(data => console.log('Success:', data))
.catch(err => console.error('Error:', err));
```

**Expected:** Should return data, not 401.

---

## 🔍 **Common Causes & Fixes**

### **Cause 1: Backend Not Running**
**Symptoms:** `ERR_NETWORK` or `ECONNREFUSED`

**Fix:**
```bash
# Start your backend server
cd /path/to/backend
npm start
# OR
java -jar backend.jar
# Check it's running on port 8080
```

---

### **Cause 2: Supabase Misconfiguration**
**Symptoms:** Login works but token is rejected by backend

**Fix:**
1. Verify Supabase URL and key in `src/lib/Auth.js`
2. Ensure backend is configured to accept Supabase JWTs
3. Check Supabase project settings

---

### **Cause 3: Token Expired**
**Symptoms:** Worked before, now getting 401s

**Fix:**
1. Logout: Click logout button or clear localStorage
2. Login again to get fresh token
3. Supabase tokens expire after 1 hour by default

---

### **Cause 4: CORS Issues**
**Symptoms:** Requests blocked in browser, CORS errors in console

**Fix:**
1. Add CORS middleware to backend
2. Allow origin: `http://localhost:5173`
3. Allow credentials: `true`
4. Allow all headers/methods

---

### **Cause 5: Wrong Backend URL**
**Symptoms:** 404 or wrong server responding

**Fix:**
Check `src/lib/api.js`:
```javascript
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Verify this matches your backend
});
```

---

## 🚀 **Quick Verification Checklist**

Run through this checklist:

- [ ] ✅ Backend server is running on port 8080
- [ ] ✅ Backend logs show no errors  
- [ ] ✅ Can access `http://localhost:8080/api/health` (if health endpoint exists)
- [ ] ✅ Frontend dev server is running (Vite)
- [ ] ✅ Cleared browser storage/cache
- [ ] ✅ Logged in via `/auth` page successfully
- [ ] ✅ `localStorage.getItem('supabase_token')` returns a token
- [ ] ✅ No CORS errors in browser console
- [ ] ✅ Backend accepts Supabase JWT verification
- [ ] ✅ Token has not expired (< 1 hour old)

---

## 📊 **Expected vs Actual Flow**

### **✅ Correct Flow:**
```
1. User visits /dashboard
   ↓
2. ProtectedRoute checks Supabase session
   ↓
3. No session? → Redirect to /auth
   ↓
4. User enters credentials
   ↓
5. Supabase validates and creates session
   ↓
6. Token saved to localStorage
   ↓
7. Redirect to /dashboard
   ↓
8. API requests include: Authorization: Bearer {token}
   ↓
9. Backend validates token with Supabase
   ↓
10. Success! Data returned
```

### **❌ Current Issue (401 Flow):**
```
1. User visits /dashboard
   ↓
2. API requests sent (no valid token OR backend rejects token)
   ↓
3. Backend returns 401 Unauthorized
   ↓
4. Error displayed to user
```

---

## 🛠️ **Development vs Production**

### **Development (Current):**
- Frontend: `http://localhost:5173` (Vite)
- Backend: `http://localhost:8080` (Your API)
- Supabase: Cloud-hosted

### **Things to Check:**
1. **Different ports = different origins**
   - Need CORS configured
   - Credentials must be allowed

2. **Token Storage:**
   - Development uses localStorage
   - Production should use httpOnly cookies (more secure)

3. **HTTPS Requirements:**
   - Supabase requires HTTPS in production
   - localhost works for dev

---

## 💡 **Quick Wins**

### **If you just want to test the UI without backend:**

1. **Mock the API responses:**

Create `src/lib/mockApi.js`:
```javascript
export const mockApi = {
    get: async (url) => {
        await new Promise(r => setTimeout(r, 500)); // Simulate delay
        
        if (url === '/system/metrics') {
            return { data: {
                avgRiskScore: 15,
                activeDevices: 42,
                blockedAttempts: 7,
                complianceRate: 98
            }};
        }
        
        // Add more mocks as needed
        return { data: [] };
    }
};
```

2. **Use mock instead of real API** (temporarily):
```javascript
// In Dashboard.jsx
import api from '../lib/mockApi'; // Instead of '../lib/api'
```

---

## 📞 **Need More Help?**

### **Check Backend Logs:**
Look for errors like:
- JWT verification failed
- Invalid signature
- Token expired
- Missing required headers

### **Check Browser Console:**
Look for:
- Network tab: Request/Response details
- Console tab: JavaScript errors
- Application tab: localStorage contents

### **Debug Mode:**
Add to `src/lib/api.js`:
```javascript
api.interceptors.request.use((config) => {
    console.log('📤 Request:', config.method.toUpperCase(), config.url);
    console.log('📋 Headers:', config.headers);
    console.log('💾 Token:', config.headers.Authorization?.substring(0, 50) + '...');
    return config;
});
```

---

## ✅ **Success Indicators**

You'll know it's working when:
1. ✅ No 401 errors in network tab
2. ✅ Dashboard loads with real data
3. ✅ All pages show live information
4. ✅ No console errors
5. ✅ Navigation works smoothly

---

## 🎯 **Final Steps**

1. **Start Backend** (if not running)
2. **Clear Browser Storage**
3. **Login via `/auth` page**
4. **Watch Console** for any errors
5. **Test Each Page** to verify data loads

If you still see 401 errors after following this guide, the issue is likely in your **backend authentication configuration**.

---

**Last Updated:** 2026-01-13  
**Status:** 🔧 Troubleshooting Active
