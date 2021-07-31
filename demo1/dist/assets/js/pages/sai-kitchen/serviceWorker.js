const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
    "/index.html",
    "/assets/css/pages/login/login-3.css",
    "/assets/plugins/global/plugins.bundle.css",
    "/assets/plugins/custom/prismjs/prismjs.bundle.css",
    "/assets/css/style.bundle.css",
    "/assets/css/themes/layout/header/base/light.css",
    "/assets/css/themes/layout/header/menu/light.css",
    "/assets/css/themes/layout/brand/dark.css",
    "/assets/css/themes/layout/aside/dark.css",
    "/assets/media/logos/favicon.ico",
    "./assets/media/svg/illustrations/login-visual-5.svg",
    "/assets/media/logos/logo-1.png",
    "/assets/js/pages/sai-kitchen/signin.js",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticDevCoffee).then(cache => {
            //   cache.addAll(assets)
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response; // if valid response is found in cache return it
            } else {
                return fetch(event.request) //fetch from internet
                    .then(function(res) {
                        return caches.open(CACHE_DYNAMIC_NAME)
                            .then(function(cache) {
                                cache.put(event.request.url, res.clone()); //save the response for future
                                return res; // return the fetched data
                            })
                    })
                    .catch(function(err) { // fallback mechanism
                        return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
                            .then(function(cache) {
                                return cache.match('/offline.html');
                            });
                    });
            }
        })
    );
})