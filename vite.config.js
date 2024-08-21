import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig({
  plugins: [svelte(), VitePWA({
    manifest: {
      "name": "Large Type",
      "short_name": "Large Type",
      "background_color": "white",
      "theme_color": "white",
      "description": "Display &amp; share text in a large font.",
      "display": "fullscreen",
      "start_url": "index.html",
      "orientation": "portrait",
      "icons": [
        {
          "src": "icons/manifest-icon-192.maskable.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "icons/manifest-icon-192.maskable.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable"
        },
        {
          "src": "icons/manifest-icon-512.maskable.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "icons/manifest-icon-512.maskable.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ]
    },
    registerType: 'autoUpdate',
    // Define assets to precache
    globPatterns: ['**/*.{js,css,html,png,jpg,svg}'],
    workbox: {
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.destination === 'image',
          handler: 'CacheFirst',
          options: {
            cacheName: 'large-type-images-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
            },
          },
        },
        {
          urlPattern: ({ request }) => request.destination === 'document',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'large-type-pages-cache',
          },
        },
        {
          urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'large-type-assets-cache',
          },
        },
      ],
    },
    // Specify files to include in the precache
    includeAssets: ['/*'], // Specify your images or other static assets
    strategies: 'generateSW',
  })],
})
