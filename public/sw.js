function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        }
    })
}

if ('serviceWorker' in navigator) {
    requestPermission()
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/firebase-messaging-sw.js');
    });
}
