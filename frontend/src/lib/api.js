import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'https://jewar-jj.onrender.com';

const api = axios.create({
    baseURL,
    timeout: 25000,
});

export const API_BASE = baseURL;

// Resolve an image URL — Cloudinary URLs are absolute, asset paths stay local
export function resolveImage(url) {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('/')) return url;
    return `${baseURL}/${url}`;
}

export default api;
