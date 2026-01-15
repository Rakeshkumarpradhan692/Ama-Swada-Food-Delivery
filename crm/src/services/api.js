import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: 'http://localhost:9000/ama-swad-api', // Matching server app.js
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For HttpOnly refresh token
});

// Request Interceptor: Attach Access Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 & Refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post('/auth/refresh'); // HttpOnly cookie handling
        // After refresh, the new access token is usually returned or set.
        // If the backend returns a new access token, store it.
        // For now assuming the refresh endpoint sets the cookie or returns the token.
        // Let's assume it returns { accessToken }
        // const { accessToken } = res.data;
        // localStorage.setItem('accessToken', accessToken);
        
        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - Logout user
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
