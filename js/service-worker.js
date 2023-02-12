if ('serviceWorker' in navigator) {
        
    navigator.serviceWorker.register('/js/service-worker.js').then((registration) => {
      console.log('Service worker registration succeeded:', registration);
    },
     (error) => {
      console.error(`Service worker registration failed: ${error}`);
    });
  } else {
    console.error('Service workers are not supported.');
  }


  const cacheName = 'v1';
  const cacheAssets = [
    'index.html',
    'style.css',
    'script.js'
  ];


  self.addEventListener('install', function (event) {
    console.log('service worker: Installed');
    
    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache =>{
                console.log(('service worker:caching Files'));
                cache.addAll(cacheAssets);
            })
            .then(()=>self.skipWaiting())
    );
        });
   

      
      self.addEventListener("activate", (event) => {
        event.waitUntil(
            cache.keys()
                .then(cacheNames => {
                    return Promise.all(
                        cacheName.map(cache =>{
                            if(cache !== cacheName){
                                console.log('Service Worker:Clearing Old Cache');
                                return cache.delete(cache);
                            }
                        })
                    )
                })
        )
      });

      self.addEventListener('fetch', function (event) {
        event.respondWith(
        caches.match(event.request)
        .then(function (response) {
        return response || fetch(event.request);
        })
        );
        });

        self.addEventListener('fetch', function (event) {
            event.respondWith(
            fetch(event.request)
            .catch(function () {
            return caches.match(event.request);
            })
            );
            });

            self.addEventListener('fetch', function (event) {
            event.respondWith(caches.open(cacheName)
            .then(function (cache) {
            return cache.match(event.request)
            .then(function (cachedResponse) {
            const fetchedResponse = fetch(event.request)
            .then(function (networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
            });
            return cachedResponse || fetchedResponse;
            });
            }))});