import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// UIBOOK_BASE lets forks deploy under a different repository name
// (GitHub Pages serves project sites from /<repo>/).
// Note: `vite preview` reports command 'serve' + isPreview — it must use the
// production base, or the built /uibook/ asset URLs won't resolve locally.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? process.env.UIBOOK_BASE ?? '/uibook/' : '/',
  plugins: [react()],
  build: {
    // Keep the bundle honest: warn early if docs + library ever balloon.
    chunkSizeWarningLimit: 400,
  },
}));
