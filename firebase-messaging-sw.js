importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-analytics.js');

if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('../firebase-messaging-sw.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  }).catch(function(err) {
    console.log('Service worker registration failed, error:', err);
  });
}


var firebaseConfig = {
  apiKey: "AIzaSyA-EIWBSnzMjwRn2f1As44EFmlTotNPAvY",
  authDomain: "sai-kitchencrm.firebaseapp.com",
  projectId: "sai-kitchencrm",
  storageBucket: "sai-kitchencrm.appspot.com",
  messagingSenderId: "594405209317",
  appId: "1:594405209317:web:eaedec823ab863be58d00c",
  measurementId: "G-2XK841QWDT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();


const messaging = firebase.messaging();
messaging.usePublicVapidKey('BD83snemAmHCjdA9SM6rJCAMdh4AhTbrgGhZzsgpxD86g3AMaPBmrPZSUXxWsxsOJ1AEQ5VNlF2b3bsR_ye3aEk');

// messaging.onMessage((payload) => {
//   console.log('Message received. ', payload);
//   // ...
//   }); 

messaging.setBackgroundMessageHandler(function(payload) {
console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
);
// Customize notification here
const notificationTitle = "Background Message Title";
const notificationOptions = {
    body: "Background Message body.",
    icon: "/itwonders-web-logo.png",
};

return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
);
});