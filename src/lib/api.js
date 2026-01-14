import axios from 'axios';

// Hardware ID required by your backend's DevicePostureFilter
export const DEVICE_ID = 'dev-win-11-prod-01';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Matches your server.port
    timeout: 10000, // 10 second timeout
});

// Request interceptor - Add auth token and device ID
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('supabase_token');

        // Add authorization header if token exists
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Mandatory security header
        config.headers['X-Device-Id'] = DEVICE_ID;

        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor - Handle 401 errors globally
api.interceptors.response.use(
    (response) => {
        // Return successful responses as-is
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized errors
        if (error.response && error.response.status === 401) {
            console.warn('🔒 Authentication failed (401). Clearing session...');

            // Clear invalid token
            localStorage.removeItem('supabase_token');

            // Don't auto-redirect here - let components handle it
            // This prevents redirect loops

            // Add a flag to the error so components know it's auth-related
            error.isAuthError = true;
        }

        // Handle network errors
        if (error.code === 'ECONNABORTED') {
            console.error('⏱️ Request timeout');
            error.userMessage = 'Request timed out. Please check your connection.';
        } else if (error.code === 'ERR_NETWORK' || !error.response) {
            console.error('🌐 Network error - Backend may be offline');
            error.userMessage = 'Cannot connect to backend. Please ensure the server is running on port 8080.';
        } else if (error.response) {
            // Server responded with error
            error.userMessage = error.response.data?.message || `Server error: ${error.response.status}`;
        }

        return Promise.reject(error);
    }
);

export default api;
