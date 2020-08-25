self.addEventListener('install', (event) => {
    async function buildCache() {
        const cache = await caches.open(cacheName);
        return cache.addAll([
            '../style.min.css',
            `./script.min.js`,
            `./sw.js`,
            `./swiper-bundle.min.js`,
            `..img/blog-1.webp`,
            `..img/blog-2.webp`,
            `..img/blog-3.webp`,
            `..img/pr-1.webp`,
            `..img/pr-2.webp`,
            `..img/pr-3.webp`,
            `..img/pr-4.webp`,
            `..img/pr-5.webp`,
            `..img/pr-6.webp`,
            `..img/team_1.webp`,
            `..img/team_2.webp`,
            `..img/team_3.webp`,
            `..img/team_4.webp`,
            `..img/logo.webp`,
            `..img/hero_bg.webp`
        ]);
    }
    event.waitUntil(buildCache());
});

self.addEventListener('fetch', (event) => {
    async function cachedFetch(event) {
        const cache = await caches.open(cacheName);
        let response = await cache.match(event.request);
        if (response) return response;
        response = await fetch(event.request);
        cache.put(event.request, response.clone());
        return response;
    }
    event.respondWith(cachedFetch(event));
});