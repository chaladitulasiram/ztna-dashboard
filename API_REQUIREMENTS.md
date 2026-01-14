# ZTNA Dashboard - Backend API Requirements

This document outlines all the API endpoints required by the frontend to monitor real-world user entry points.

## Base URL
```
http://localhost:8080/api
```

## Authentication
All requests (except `/system/public-status`) require:
- **Header**: `Authorization: Bearer {supabase_token}`
- **Header**: `X-Device-Id: {device_id}`

---

## 📊 Dashboard Endpoints

### 1. GET `/system/metrics`
**Purpose**: Fetch real-time dashboard metrics

**Response**:
```json
{
  "avgRiskScore": 24,
  "activeDevices": 1024,
  "blockedAttempts": 142,
  "complianceRate": 98.2
}
```

### 2. GET `/system/risk-trends`
**Purpose**: Fetch 24-hour risk trend data for chart

**Response**:
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

### 3. GET `/system/device-health`
**Purpose**: Fetch device health percentages

**Response**:
```json
{
  "firewallStatus": 100,
  "diskEncryption": 85,
  "osUpToDate": 62
}
```

---

## 🏠 Landing Page Endpoints

### 4. GET `/system/public-status`
**Purpose**: Public endpoint for landing page stats (no auth required)

**Response**:
```json
{
  "activeConnections": 24,
  "currentRiskScore": 35,
  "uptime": "48h 12m",
  "segmentCount": 4
}
```

---

## 📋 Audit Logs Endpoints

### 5. GET `/resource/logs`
**Purpose**: Fetch real-time audit logs

**Response**:
```json
[
  {
    "id": "log-001",
    "timestamp": "2026-01-13T09:00:00Z",
    "endpoint": "/api/resource/segments",
    "userEmail": "user@example.com",
    "outcome": "ALLOWED",
    "riskScore": 15
  },
  {
    "id": "log-002",
    "timestamp": "2026-01-13T08:55:00Z",
    "endpoint": "/api/admin/users",
    "userEmail": "admin@example.com",
    "outcome": "BLOCKED",
    "riskScore": 85
  }
]
```

---

## 🌐 Network Segments Endpoints

### 6. GET `/resource/segments`
**Purpose**: Fetch network segment information

**Response**:
```json
[
  {
    "id": "seg-001",
    "name": "Production",
    "cidr": "10.0.1.0/24",
    "status": "ACTIVE",
    "policyType": "STRICT"
  },
  {
    "id": "seg-002",
    "name": "Quarantine",
    "cidr": "10.0.99.0/24",
    "status": "ISOLATED",
    "policyType": "DENY_ALL"
  }
]
```

---

## 🛡️ Access Policies Endpoints

### 7. GET `/policies/list`
**Purpose**: Fetch all access policies (if needed for dynamic policy loading)

**Response**:
```json
[
  {
    "id": "pol-001",
    "title": "Admin Remote Access",
    "description": "Require MFA and Managed Device for all administrative console access from outside the office.",
    "action": "Allow",
    "priority": "01",
    "active": true,
    "conditions": [
      { "type": "device", "label": "Managed Device" },
      { "type": "geo", "label": "Outside US/UK" },
      { "type": "time", "label": "24/7" }
    ]
  }
]
```

---

## 📱 Mobile Security Endpoints

### 8. GET `/mobile/devices`
**Purpose**: Fetch enrolled mobile devices

**Response**:
```json
[
  {
    "id": "dev-001",
    "name": "iPhone 15 Pro - Marketing 04",
    "lastSeen": "2 minutes ago",
    "osVersion": "iOS 17.4",
    "status": "Secure"
  }
]
```

### 9. POST `/mobile/devices/{id}/action`
**Purpose**: Execute device actions (lock, locate, wipe, etc.)

**Request Body**:
```json
{
  "action": "lock" | "locate" | "ring" | "restart" | "alert" | "wipe"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Device locked successfully"
}
```

---

## 👤 Identity Management Endpoints

### 10. GET `/identity/current`
**Purpose**: Get current authenticated user details (alternative to Supabase)

**Response**:
```json
{
  "email": "user@example.com",
  "provider": "Supabase Auth",
  "mfaVerified": true,
  "deviceId": "dev-win-11-prod-01"
}
```

---

## 🔐 Authentication Endpoints

### 11. POST `/auth/register`
**Purpose**: Register new user (handled by authService)

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### 12. POST `/auth/login`
**Purpose**: Login user (handled by authService)

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

---

## 📊 Real-Time Updates

The frontend implements polling for real-time data:
- **Dashboard**: 30-second intervals
- **Landing Page**: 5-second intervals
- **Audit Logs**: 5-second intervals
- **Network Segments**: On-demand (component mount)

---

## Error Handling

All endpoints should return consistent error responses:

```json
{
  "error": true,
  "message": "Descriptive error message",
  "code": "ERROR_CODE"
}
```

Common HTTP Status Codes:
- `200`: Success
- `401`: Unauthorized (invalid/missing token)
- `403`: Forbidden (insufficient permissions)
- `404`: Resource not found
- `500`: Internal server error

---

## Notes for Backend Implementation

1. **Device Posture Validation**: The `X-Device-Id` header is mandatory for all authenticated requests
2. **Rate Limiting**: Consider implementing rate limiting on polling endpoints
3. **Caching**: Implement caching for frequently accessed data (e.g., public status)
4. **WebSockets** (Future): Consider WebSocket implementation for true real-time updates instead of polling
5. **Pagination**: Add pagination support for endpoints that may return large datasets (logs, devices)

---

## Frontend Configuration

Current API configuration in `src/lib/api.js`:
```javascript
baseURL: 'http://localhost:8080/api'
DEVICE_ID: 'dev-win-11-prod-01'
```

Update these values based on your deployment environment.
