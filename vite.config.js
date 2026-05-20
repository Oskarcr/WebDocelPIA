import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Path from "path";

export default defineConfig({
    plugins: [react()],
    base: '/',
    resolve: {
        alias: {
            "@": Path.join(__dirname, "./src")
        }
    },
    server: {
        proxy: {
            "/api": "http://localhost:4000",
            "/attachments": "http://localhost:4000"
        }
      }
});