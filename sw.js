const CACHE_NAME = 'memes-v26'; // Subi para v20 para forçar a atualização
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './memes.json' // Adicione isso aqui também!
];

// Instalação e cache de arquivos principais
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// A MÁGICA: Captura as imagens e guarda no cache enquanto você navega
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Se já tem no cache (como o index.html), entrega direto
      if (response) return response;

      // Se não tem, tenta buscar na internet
      return fetch(e.request).then((networkResponse) => {
        // Se for uma imagem, guarda uma cópia no cache para a próxima vez
        if (e.request.url.includes('.jpg') || e.request.url.includes('.png') || e.request.url.includes('.gif') || e.request.url.includes('googleusercontent')) {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, networkResponse.clone());
            return networkResponse;
          });
        }
        return networkResponse;
      });
    })
  );
});
