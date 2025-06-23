// vite.config.js
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  server: {
    allowedHosts: ['.csb.app'], // ✅ wildcard for all CodeSandbox URLs
    port: 4200
  }
});
