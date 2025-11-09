import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // ✅ More permissive CSP for development
    headers: {
      'Content-Security-Policy': [
        "default-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.paystack.co https://*.paystack.co",
        "connect-src 'self' https://js.paystack.co https://api.paystack.co https://*.paystack.co ws://localhost:* wss://localhost:*",
        "frame-src 'self' https://js.paystack.co https://checkout.paystack.com https://*.paystack.co",
        "style-src 'self' 'unsafe-inline' https: blob:",
        "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com",
        "img-src 'self' https: data: blob:",
        "worker-src 'self' blob: 'unsafe-inline'"
      ].join('; '),
      // ✅ Disable Chrome's strict CSP enforcement
      'X-Frame-Options': 'ALLOWALL',
      'Access-Control-Allow-Origin': '*'
    },
    // ✅ Allow all file access
    fs: {
      strict: false,
      allow: ['..']
    },
    // ✅ Proxy Paystack requests through Vite
    proxy: {
      '/paystack': {
        target: 'https://js.paystack.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/paystack/, '')
      }
    }
  },
  // ✅ Exclude Paystack from optimization
  optimizeDeps: {
    exclude: ['https://js.paystack.co/v1/inline.js']
  },
  define: {
    global: 'globalThis',
  },
  build: {
    target: 'esnext',
    minify: false, // Disable minification during testing
    rollupOptions: {
      external: ['https://js.paystack.co/v1/inline.js']
    }
  }
});