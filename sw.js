const CACHE_NAME = 'memes-v35'; // Atualizado para v31

const ASSETS = [
  '',
  'index.html',
  'memes.json',
  '5021535940282886753.jpg',
  'icone.png',
  '5019579037218704274.jpg',
  '5019579037218704273.jpg',
  '5019579037218704275.jpg',
  '5885547093810679032.jpg',
  'meme6.jpg'
];

// Instalação
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Instalando novo design v31...');
      return cache.addAll(ASSETS);
    })
  );
});

// Ativação (Limpa o design velho)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estratégia de Busca
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
