const CACHE_NAME = 'memes-v27'; // Mudei para v27 para forçar a atualização

// Lista de arquivos que o app vai salvar para funcionar offline
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './memes.json',
  './5021535940282886753.jpg',             // Sua foto de perfil
  './icone.png',                           // Ícone do app
  './5019579037218704274.jpg',             // Meme 1
  './5019579037218704273.jpg',             // Meme 2
  './5019579037218704275.jpg',             // Meme 3
  './5885547093810679032.jpg',             // Meme 4
  './Documento sem nome-1_page-0001.jpg'   // Meme novo (ID 6)
];

// Instalação: Salva os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache aberto: salvando assets');
      return cache.addAll(ASSETS);
    })
  );
});

// Ativação: Limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Limpando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Busca: Serve os arquivos do cache se estiver offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
