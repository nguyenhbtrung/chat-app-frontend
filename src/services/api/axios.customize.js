import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    response => response,
    error => {
        const { status } = error.response || {};
        if (status === 401) {
            localStorage.removeItem('accessToken');
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);


export default api;