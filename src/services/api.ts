import axios from 'axios';
import { refreshAccessToken } from "./authActions"
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,

    },
    withCredentials: true
});



api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshAccessToken();
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // رفرش توکن هم مشکل داشت، لاگ اوت یا ریدایرکت به صفحه ورود
                // logoutUser();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
