import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    server: {
        open: true,
        port: 3000,
        proxy: {
            "/api": "http://localhost:5000"
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                guestbook: resolve(__dirname, 'guestbook.html')
            }
        }
    }
});
