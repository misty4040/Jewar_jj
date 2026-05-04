import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    timeout: 20000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('jewar_admin_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (r) => r,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem('jewar_admin_token');
            localStorage.removeItem('jewar_admin_user');
            if (!location.pathname.startsWith('/login')) {
                location.href = '/login';
            }
        }
        return Promise.reject(err);
    }
);

export const apiUrl = (path) => (path?.startsWith('http') ? path : path);

export default api;
