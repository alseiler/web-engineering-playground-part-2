import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base:
    process.env.NODE_ENV === 'production' ? '/web-engineering-playground' : '/', // Use '/' in dev mode  root: '.',
  build: {
    outDir: 'dist',
  },
});
