import axios from 'axios';

// This ID is used by the backend DevicePostureFilter to verify compliance
export const DEVICE_ID = 'dev-win-11-prod-01';

const api = axios.create({
    // Matches server.port=8080 in application.properties
    baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('supabase_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Mandatory header for the backend DevicePostureFilter
    config.headers['X-Device-Id'] = DEVICE_ID;
    return config;
});

export default api;