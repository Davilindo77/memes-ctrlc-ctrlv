const CACHE_NAME = 'memes-v1';
const ASSETS = [
  '/memes-ctrlc-ctrlv/',
  '/memes-ctrlc-ctrlv/index.html',
  '/memes-ctrlc-ctrlv/manifest.json',
  '/memes-ctrlc-ctrlv/memes.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
