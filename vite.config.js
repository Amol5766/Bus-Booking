// vite.config.js
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  server: {
    allowedHosts: ['.csb.app', 'localhost'], 
    host: true, 
    strictPort: true
  }
});
