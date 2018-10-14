var cacheName = '2048';
var filesToCache = [
   '../',
  '../index.html',
  '../main.css',
//   '../Images/icon-72x72.png',
//   '../Images/icon-96x96.png',
//   '../Images/icon-128x128.png',
//   '../Images/icon-144x144.png',
//   '../Images/icon-152x152.png',
//   '../Images/icon-192x192.png',
//   '../Images/icon-384x384.png',
//   '../Images/icon-512x512.png',
  './js/animframe_polyfill.js',
  './js/application.js',
  './js/bind_polyfill.js',
  './js/classlist_polyfill.js',
  './js/game_manager.js',
  './js/grid.js',
  './js/html_actuator.js',
  './js/keyboard_input_manager.js',
  './js/local_storage_manager.js',
  './js/sw.js',
  './js/tile.js'
];
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);  
    })
  );
});
self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
})