// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyCZigN06suPXsElTYF3WjDeZbm27vf16ig",
    authDomain: "nuxt3-messenger.firebaseapp.com",
    databaseURL: "https://nuxt3-messenger-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "nuxt3-messenger",
    storageBucket: "nuxt3-messenger.appspot.com",
    messagingSenderId: "727359037732",
    appId: "1:727359037732:web:04e2cbbad7ad73701353b1",
    measurementId: "G-0QBTGPG6EJ"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        // payload
    );

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image || '/logo.svg'
    };

    // self.registration.showNotification(notificationTitle, notificationOptions);
});