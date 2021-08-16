const staticDevCoffee = "sai-kitchen-site-v1"
const assets = [
//   "/",
  "/index.html",
  "/offline.html",
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
//   "/css/style.css",
//   "/js/app.js",
  "/assets/js/pages/sai-kitchen/signin.js",
  "/assets/media/gif/404.gif",
  "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css",
  "https://fonts.googleapis.com/css?family=Arvo",
//   "/images/coffee1.jpg",
//   "/images/coffee2.jpg",
//   "/images/coffee3.jpg",
//   "/images/coffee4.jpg",
//   "/images/coffee5.jpg",
//   "/images/coffee6.jpg",
//   "/images/coffee7.jpg",
//   "/images/coffee8.jpg",
//   "/images/coffee9.jpg",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", function (event) {
  event.respondWith(
  caches.match(event.request).then(function (response) {
    if (response) {
      return response;
      // if valid response is found in cache return it
    } else {
      return (
        fetch(event.request)
        //fetch from internet
        .then(function (res) {

          if(!event.request.url.includes('backendsaikitchen.azurewebsites.net')){
          return caches.
          open(staticDevCoffee).
          then( function (cache) {
            // console.log(event.request.url+' Cached');
            cache.put(event.request.url, res.clone());
            //save the response for future
            return res;
            // return the fetched data
          });
        }
          else{
            return res || fetch(fetchEvent.request)
          }
        }).
        catch(function (err) {
          // fallback mechanism  
          if(!event.request.url.includes('backendsaikitchen.azurewebsites.net')){
    
          return caches.
          open(staticDevCoffee).
          then(function (cache) {
            return cache.match("/offline.html");
          });
        }else{
          return response;
        }
        }));
     
    }
  }));

});


// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.filter(function(cacheName) {
//           // Return true if you want to remove this cache,
//           // but remember that caches are shared across
//           // the whole origin
//           return true;
//         }).map(function(cacheName) {
//           return caches.delete(cacheName);
//         })
//       );
//     })
//   );
// });