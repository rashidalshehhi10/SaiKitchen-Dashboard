const staticDevCoffee = "sai-kitchen-site-v1"
const assets = [
//   "/",
  "./index.html",
  "./assets/css/pages/login/login-3.css",
  "./assets/plugins/global/plugins.bundle.css",
  "./assets/plugins/custom/prismjs/prismjs.bundle.css",
  "./assets/css/style.bundle.css",
  "./assets/css/themes/layout/header/base/light.css",
  "./assets/css/themes/layout/header/menu/light.css",
  "./assets/css/themes/layout/brand/dark.css",
  "./assets/css/themes/layout/aside/dark.css",
  "./assets/media/logos/favicon.ico",
  "./assets/media/svg/illustrations/login-visual-5.svg",
  "./assets/media/logos/logo-1.png",
//   "/css/style.css",
//   "/js/app.js",
// "./assets/js/pages/sai-kitchen/signin.js",
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

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })