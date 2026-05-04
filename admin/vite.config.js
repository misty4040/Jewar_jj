import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        proxy: {
            '/api': 'https://jewar-jj.onrender.com',
            '/uploads': 'https://jewar-jj.onrender.com',
        },
    },
});
