# ZTNA Dashboard - Backend Quick Start Guide

This guide helps you quickly implement the required backend endpoints for the ZTNA Dashboard.

## 🎯 Priority Endpoints (Must Implement First)

These endpoints are actively being called by the frontend:

### 1. Dashboard Metrics (HIGH PRIORITY)
```
GET /api/system/metrics
```

**Example Response**:
```json
{
  "avgRiskScore": 24,
  "activeDevices": 1024,
  "blockedAttempts": 142,
  "complianceRate": 98.2
}
```

**Implementation Hint**:
- Query your database for active sessions/devices
- Calculate average risk score from recent audit logs
- Count blocked access attempts in last 24h
- Calculate compliance rate from device posture checks

---

### 2. Risk Trends (HIGH PRIORITY)
```
GET /api/system/risk-trends
```

**Example Response**:
```json
[
  { "time": "00:00", "risk": 20 },
  { "time": "04:00", "risk": 35 },
  { "time": "08:00", "risk": 65 },
  { "time": "12:00", "risk": 45 },
  { "time": "16:00", "risk": 80 },
  { "time": "20:00", "risk": 30 }
]
```

**Implementation Hint**:
- Aggregate risk scores by 4-hour intervals over last 24 hours
- Format time as "HH:MM"
- Return array of time/risk pairs

---

### 3. Device Health (HIGH PRIORITY)
```
GET /api/system/device-health
```

**Example Response**:
```json
{
  "firewallStatus": 100,
  "diskEncryption": 85,
  "osUpToDate": 62
}
```

**Implementation Hint**:
- Query device posture database
- Calculate percentage of devices passing each check
- Return values as integers (0-100)

---

### 4. Public Status (ALREADY IMPLEMENTED?)
```
GET /api/system/public-status
```

**Example Response**:
```json
{
  "activeConnections": 24,
  "currentRiskScore": 35,
  "uptime": "48h 12m",
  "segmentCount": 4
}
```

**Note**: This endpoint should already exist based on your Landing page working.

---

### 5. Audit Logs (ALREADY IMPLEMENTED?)
```
GET /api/resource/logs
```

**Example Response**:
```json
[
  {
    "id": "log-001",
    "timestamp": "2026-01-13T09:00:00Z",
    "endpoint": "/api/resource/segments",
    "userEmail": "user@example.com",
    "outcome": "ALLOWED",
    "riskScore": 15
  }
]
```

**Note**: This endpoint should already exist based on your Audit Logs page.

---

### 6. Network Segments (ALREADY IMPLEMENTED?)
```
GET /api/resource/segments
```

**Example Response**:
```json
[
  {
    "id": "seg-001",
    "name": "Production",
    "cidr": "10.0.1.0/24",
    "status": "ACTIVE",
    "policyType": "STRICT"
  }
]
```

**Note**: This endpoint should already exist based on your Network Segments page.

---

## 🔧 Quick Implementation Template (Spring Boot Example)

```java
@RestController
@RequestMapping("/api/system")
public class SystemController {

    @GetMapping("/metrics")
    public ResponseEntity<SystemMetrics> getMetrics() {
        // TODO: Implement actual logic
        SystemMetrics metrics = new SystemMetrics();
        metrics.setAvgRiskScore(calculateAverageRiskScore());
        metrics.setActiveDevices(countActiveDevices());
        metrics.setBlockedAttempts(countBlockedAttempts());
        metrics.setComplianceRate(calculateComplianceRate());
        return ResponseEntity.ok(metrics);
    }

    @GetMapping("/risk-trends")
    public ResponseEntity<List<RiskTrendPoint>> getRiskTrends() {
        // TODO: Implement actual logic
        List<RiskTrendPoint> trends = aggregateRiskScoresLast24Hours();
        return ResponseEntity.ok(trends);
    }

    @GetMapping("/device-health")
    public ResponseEntity<DeviceHealth> getDeviceHealth() {
        // TODO: Implement actual logic
        DeviceHealth health = new DeviceHealth();
        health.setFirewallStatus(calculateFirewallCompliance());
        health.setDiskEncryption(calculateEncryptionCompliance());
        health.setOsUpToDate(calculateOSUpdateCompliance());
        return ResponseEntity.ok(health);
    }
}
```

---

## 🧪 Testing Your Endpoints

### Using curl:

```bash
# Test metrics endpoint
curl -H "Authorization: Bearer YOUR_TOKEN" \
     -H "X-Device-Id: dev-win-11-prod-01" \
     http://localhost:8080/api/system/metrics

# Test risk trends
curl -H "Authorization: Bearer YOUR_TOKEN" \
     -H "X-Device-Id: dev-win-11-prod-01" \
     http://localhost:8080/api/system/risk-trends

# Test device health
curl -H "Authorization: Bearer YOUR_TOKEN" \
     -H "X-Device-Id: dev-win-11-prod-01" \
     http://localhost:8080/api/system/device-health
```

### Using Postman:

1. Create a new request
2. Set method to GET
3. Add headers:
   - `Authorization: Bearer YOUR_TOKEN`
   - `X-Device-Id: dev-win-11-prod-01`
4. Send request to endpoint

---

## 🚨 Common Issues & Solutions

### Issue 1: CORS Errors
**Symptom**: Browser console shows CORS policy errors

**Solution**: Add CORS configuration to your backend:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
```

---

### Issue 2: 401 Unauthorized
**Symptom**: All requests return 401

**Possible Causes**:
1. Token is missing or invalid
2. Device ID header is missing
3. Token has expired

**Solution**: Check that frontend is sending both headers correctly.

---

### Issue 3: Empty/Null Data
**Symptom**: Frontend shows "No data available"

**Possible Causes**:
1. Backend returning empty arrays/null values
2. Database has no data
3. Query logic is incorrect

**Solution**: 
- Add logging to backend to see what data is being returned
- Seed database with test data
- Verify query logic

---

## 📊 Sample Data for Testing

If you don't have real data yet, you can return mock data temporarily:

```java
@GetMapping("/metrics")
public ResponseEntity<SystemMetrics> getMetrics() {
    // TEMPORARY: Return mock data for testing
    SystemMetrics metrics = new SystemMetrics();
    metrics.setAvgRiskScore(24);
    metrics.setActiveDevices(1024);
    metrics.setBlockedAttempts(142);
    metrics.setComplianceRate(98.2);
    return ResponseEntity.ok(metrics);
}
```

**Remember to replace with real data later!**

---

## ✅ Verification Checklist

- [ ] Backend is running on `http://localhost:8080`
- [ ] All 3 new endpoints are implemented:
  - [ ] `/api/system/metrics`
  - [ ] `/api/system/risk-trends`
  - [ ] `/api/system/device-health`
- [ ] CORS is configured to allow `http://localhost:5173`
- [ ] Endpoints require authentication (except `/system/public-status`)
- [ ] Endpoints validate `X-Device-Id` header
- [ ] Endpoints return correct JSON format
- [ ] Test with curl/Postman - all endpoints return 200 OK
- [ ] Frontend can successfully fetch data (check browser console)
- [ ] Dashboard displays real data (not "..." or errors)

---

## 🎉 Success Criteria

When everything is working, you should see:

1. **Dashboard Page**:
   - Status shows "BACKEND ONLINE" (green)
   - Metric tiles show real numbers (not "...")
   - Risk trend chart displays data
   - Device health bars show percentages

2. **Browser Console**:
   - No CORS errors
   - No 401/403 errors
   - Successful API responses logged

3. **Network Tab**:
   - Requests to `/api/system/*` return 200 OK
   - Response payloads match expected format

---

## 📞 Need Help?

If you encounter issues:

1. Check browser console for errors
2. Check backend logs for exceptions
3. Verify request/response in Network tab
4. Ensure all headers are being sent
5. Test endpoints directly with curl/Postman

---

## 🔄 Auto-Refresh Behavior

The frontend will automatically poll these endpoints:

- **Dashboard Metrics**: Every 30 seconds
- **Risk Trends**: Every 30 seconds
- **Device Health**: Every 30 seconds

Make sure your backend can handle this polling frequency!

---

## 📝 Full Documentation

For complete API documentation, see: **`API_REQUIREMENTS.md`**
