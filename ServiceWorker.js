const cacheName = "FER-UIFlow Virtual-1.2";
const contentToCache = [
    "Build/WebGL Build.loader.js",
    "Build/cc74305f5082de817128096f59f0ecb8.js",
    "Build/5501cdd6015c448b1deb14c74815a6a4.data",
    "Build/33c03911aeb01c809b2f4fb54fc346a3.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
