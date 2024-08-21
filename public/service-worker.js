const cacheName = 'large-type-svelte-pwa-assets';
const filesToCache = [
    '/',
    '/index.html',
    '/global.css',
    "app.css",
    "icon.png",
    "linkedin-qr.png",
    "instagram-qr.png",
    "whatsapp-qr.png",
    "telegram-qr.png"
];

self.addEventListener('install', (e) => {
    // @ts-ignore
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', (e) => {
    // @ts-ignore
    e.respondWith(
        // @ts-ignore
        caches.match(e.request).then((response) => {
            // @ts-ignore
            return response || fetch(e.request);
        })
    );
});
