import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base:'./',
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', '@inertiajs/react'],
                    leaflet: ['leaflet', 'react-leaflet'],
                }
            }
        },
        chunkSizeWarningLimit: 1000
    }
});
