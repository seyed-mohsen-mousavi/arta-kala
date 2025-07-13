import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
    },
    withCredentials: true
});

api.interceptors.request.use(
    res => res,
    err => Promise.reject(err)
)
api.interceptors.response.use(
    res => res,
    async err => {
        const originalConfig = err.config;

        if (err.response?.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;

            try {
                await fetch('/api/auth/refresh/', {
                    method: 'POST',
                    credentials: 'include',
                });

                return api(originalConfig);
            } catch (error) {
                try {
                    await fetch('http://localhost:3000/api/auth/logout/', {
                        method: "POST",
                        credentials: 'include',
                    });
                } catch (logoutErr) {
                    console.error('Logout failed after refresh error:', logoutErr);
                }

                return Promise.reject(error);
            }
        }

        return Promise.reject(err);
    }
);

export default api;
