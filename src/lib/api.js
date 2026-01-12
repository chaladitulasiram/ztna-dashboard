import axios from 'axios';

// In production, this should be a unique hardware ID stored in localStorage
export const DEVICE_ID = localStorage.getItem('ZTNA_DEVICE_ID') || 'DEV-NODE-99';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Matches server.port in application.properties
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('supabase_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // CRITICAL: This header is required by your DevicePostureFilter.java
    config.headers['X-Device-Id'] = DEVICE_ID;
    return config;
});

export default api;