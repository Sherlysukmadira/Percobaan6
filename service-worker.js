const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    './halaman.html',
    './style.css',
    './patners.html',
    './offline.html',
    './192x192.png',
    './512x512.png',
    './Foto1.avif',
    './Foto2.avif',
    './Foto3.avif',
    './Offline.avif'
];

// Event install untuk caching
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Event activate untuk menghapus cache lama
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        console.log('Deleting old cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

// Event fetch untuk mengambil resource dari cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
     caches.match(event.request)
      .then((response) => {
        // Jika cache ditemukan, kembalikan respon dari cache
        if (response){
            return response;
        }
        // Jika tidak ditemukan, lakukan fetch
        return fetch(event.request).catch(() => {
          // Jika fetch gagal (misalnya karena offline), tampilkan offline.html
          return caches.match('./offline.html');
        });
      })
    );
    
});
