// vite.config.ts
// pour supprimer l'erreur SyntaxError: Failed to construct 'WebSocket': The URL 'ws://localhost:undefined/' is invalid
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173 // Adjust the port number as needed
  }
});