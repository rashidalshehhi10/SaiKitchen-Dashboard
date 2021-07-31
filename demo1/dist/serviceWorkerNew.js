importScripts('assets/js/pages/sai-kitchen/dexie.min.js');
 

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
  // We will cache all POST requests, but in the real world, you will probably filter for
	// specific URLs like if(... || event.request.url.href.match(...)) GeAllNotificationofUser
	if(event.request.method === "POST" && event.request.url.match('backendsaikitchen.azurewebsites.net') && !event.request.url.match('GeAllNotificationofUser') && !event.request.url.match('SetFcmToken')&& !event.request.url.match('login') ){
		
	   // Init the cache. We use Dexie here to simplify the code. You can use any other
		 // way to access IndexedDB of course.
	  
     var db = new Dexie("post_cache");
     db.version(1).stores({
     post_cache: 'key,response,timestamp'
     })

		event.respondWith(
			// First try to fetch the request from the server
			fetch(event.request.clone())
			.then(function(response) {
				// If it works, put the response into IndexedDB
				cachePut(event.request.clone(), response.clone(), db.post_cache);
				return response;
			})
			.catch(function() {
				// If it does not work, return the cached response. If the cache does not
				// contain a response for our request, it will give us a 503-response
				return cacheMatch(event.request.clone(), db.post_cache);
			})
		);
	}else{
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
          return caches.
          open(staticDevCoffee).
          then( function (cache) {
            // console.log(event.request.url+' Cached');
            cache.put(event.request.url, res.clone());
            //save the response for future
            return res;
            // return the fetched data
          });
        }).
        catch(function (err) {
          // fallback mechanism
          return caches.
          open(staticDevCoffee).
          then(function (cache) {
            return cache.match("/offline.html");
          });
        }));

    }
  }));
}

});




/**
* Returns a string identifier for our POST request.
* 
* @param request
* @return string
*/
 function getPostId(request) {
 var value= serializeRequest(request.clone());
  return Promise.resolve(JSON.stringify(value));
  }
/**
 * Serializes a Request into a plain JS object.
 * 
 * @param request
 * @returns Promise
 */ 
 async function serializeRequest(request) {
  var serialized = {
  url: request.url,
  headers: serializeHeaders(request.headers),
  method: request.method,
  mode: request.mode,
  credentials: request.credentials,
  cache: request.cache,
  redirect: request.redirect,
  referrer: request.referrer
  };
  // Only if method is not `GET` or `HEAD` is the request allowed to have body.
  // request.method !== 'GET' &&
  if ( request.method !== 'HEAD') {
    
  var bodyString = await request.clone().text();
  serialized.body=bodyString;
  return request.clone().text().then(function(body) {
    // serialized.body = body;
    return Promise.resolve(serialized);
  });

  }
  return Promise.resolve(serializeds);
}

/**
* Serializes a Response into a plain JS object
* 
* @param response
* @returns Promise
*/ 
async function serializeResponse(response) {
  var serialized = {
  headers: serializeHeaders(response.headers),
  status: response.status,
  statusText: response.statusText,
  }; 
  var bodyString = await response.clone().text();
  serialized.body = bodyString;
  return response.clone().text().then(function(body) {
    // serialized.body = body;
    return Promise.resolve(serialized);
  });
  
  // return Promise.resolve(serialized);
}

/**
* Serializes headers into a plain JS object
* 
* @param headers
* @returns object
*/ 
function serializeHeaders(headers) {
var serialized = {};
// `for(... of ...)` is ES6 notation but current browsers supporting SW, support this
// notation as well and this is the only way of retrieving all the headers.
for (var entry of headers.entries()) {
  serialized[entry[0]] = entry[1];
}
return serialized;
}

/**
* Creates a Response from it's serialized version
* 
* @param data
* @returns Promise
*/ 
function deserializeResponse(data) {
return Promise.resolve(new Response(data.body, data));
}

/**
* Saves the response for the given request eventually overriding the previous version
* 
* @param data
* @returns Promise
*/
function cachePut(request, response, store) {
var key, data;
getPostId(request.clone())
.then(function(id){
  key = id;
  return serializeResponse(response.clone());
}).then(function(serializedResponse) {
  data = serializedResponse;
  var entry = {
    key: key,
    response: data,
    timestamp: Date.now()
  };
  store
  .add(entry)
  .catch(function(error){
    store.update(entry.key, entry);
  });
});
}

/**
* Returns the cached response for the given request or an empty 503-response  for a cache miss.
* 
* @param request
* @return Promise
*/
function cacheMatch(request,store) {
return getPostId(request.clone())
.then(function(id) {
  return store.get(id);
}).then(function(data){
  if (data) {
    return deserializeResponse(data.response);
  } else {
    return new Response('', {
      isError: true,
      errorMessage: "Internet Connection Problem",
      data: null
    });
  }
});
}

