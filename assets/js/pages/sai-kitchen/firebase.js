"use strict";

import {
	baseURL
} from './constant.js'


// import { user } from "./base";

// proper initialization
if ('function' === typeof importScripts) {
  importScripts('script2.js');
  addEventListener('message', onMessage);

  function onMessage(e) {
    // do some work here 
  }
}
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
firebase.analytics();


const messaging = firebase.messaging();

// [START set_public_vapid_key]
// Add the public key generated from the console here.
messaging.usePublicVapidKey('BD83snemAmHCjdA9SM6rJCAMdh4AhTbrgGhZzsgpxD86g3AMaPBmrPZSUXxWsxsOJ1AEQ5VNlF2b3bsR_ye3aEk');
// [END set_public_vapid_key]
console.log(messaging);

messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  // ...
});
// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.


// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.

// const messaging = firebase.messaging();


messaging.requestPermission()
  .then(function () {
    console.log('I am in here');


    return messaging.getToken()
      .then(function (currentToken) {
        console.log(currentToken);
        var login = localStorage.getItem("user");
        if (login === null) {
          // window.location.replace("index.html");
        } else {



          // user = login;
      var    user = JSON.parse(login);
          localStorage.setItem('FCMToken', currentToken);
          var fcm = {
            userId: user.data.userId,
            userFCMToken: currentToken,
          }
          const data = JSON.stringify(fcm);
          console.log(data);
          $.ajax({
            type: "Post",
            url: baseURL + '/User/SetFCMToken',
            headers: {
              'Content-Type': 'application/json'
            },
            data: data,
            success: function (response) {

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {


            }
          });
        }
        messaging.onMessage((payload) => {
          console.log('Message received. ', payload);
          // ...
        });


      })
      .catch(function (err) {
        console.log('An error occurred while retrieving token. ', err);
        showToken('Error retrieving Instance ID token. ', err);
        setTokenSentToServer(false);
      });

  }).catch(function (err) {
    console.log('Error');
  });