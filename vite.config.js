// vite.config.js
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  server: {
    host: true,
    port: 4200,
    strictPort: true,
    allowedHosts: ['6kcwdw-4200.csb.app', 'localhost'],
  }
});
