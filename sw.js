const CACHE_NAME = 'memes-v29';

// Lista revisada e limpa (sem espaços e sem ./)
const ASSETS = [
  '',
  'index.html',
  'manifest.json',
  'memes.json',
  '5021535940282886753.jpg',
  'icone.png',
  '5019579037218704274.jpg',
  '5019579037218704273.jpg',
  '5019579037218704275.jpg',
  '5885547093810679032.jpg',
  'meme6.jpg'
];

// Instalação: O "Tudo ou Nada" acontece aqui
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Tentando salvar todos os arquivos no cache...');
      return cache.addAll(ASSETS);
    })
  );
});

// Ativação: Limpa caches velhos
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

// Busca: Tenta o cache primeiro, se falhar vai na rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
