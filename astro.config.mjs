import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  // Required for Capacitor: Android WebView only resolves directory indexes with a trailing slash.
  trailingSlash: 'always',
});
