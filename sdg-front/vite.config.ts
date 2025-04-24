import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    // base: '/survival-decision-game/',
    plugins: [vue(), vueDevTools(), tailwindcss()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        outDir: '../server/public', // change output directory to deploy client and server together
        emptyOutDir: true, // also necessary
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        },
    },
});
