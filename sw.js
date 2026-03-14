const CACHE_NAME = 'memes-v4'; // SEMPRE mude esse número quando atualizar o app
const ASSETS = [
  '/memes-ctrlc-ctrlv/',
  '/memes-ctrlc-ctrlv/index.html',
  '/memes-ctrlc-ctrlv/manifest.json',
  '/memes-ctrlc-ctrlv/memes.json'
];

// Instala o Service Worker e guarda os arquivos básicos
self.addEventListener('install', e => {
  self.skipWaiting(); // Força o SW novo a ficar ativo na hora
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))
  );
});

// Limpa o cache antigo automaticamente quando a versão muda
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim(); // Faz o app usar o SW novo imediatamente
});

// Tenta buscar na internet primeiro; se falhar (offline), usa o cache
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
