import axios from 'axios';

// Hardware ID required by your backend's DevicePostureFilter
export const DEVICE_ID = 'dev-win-11-prod-01';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Matches your server.port
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('supabase_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // Mandatory security header
    config.headers['X-Device-Id'] = DEVICE_ID;
    return config;
});

export default api;