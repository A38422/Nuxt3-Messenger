import admin from "firebase-admin";
import serviceAccount from "./nuxt3-messenger-firebase-adminsdk-581wr-3365ac9735.json";
import {readBody} from "h3";

admin.initializeApp({
    // @ts-ignore
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://nuxt3-messenger-default-rtdb.asia-southeast1.firebasedatabase.app",
});

export default defineEventHandler((event) => {
    const body = readBody(event);

    body.then((result) => {
        if (result && result.tokenDevice) {
            const registrationToken = result.tokenDevice;

            const message = {
                notification: {
                    title: result.name,
                    body: result.content,
                    image: result.image
                },
                webpush: {
                    fcmOptions: {
                        link: '/?breakingnews'
                    }
                },
                token: registrationToken
            };

            admin.messaging().send(message)
                .then((response: any) => {
                    console.log('Successfully sent message:', response);
                })
                .catch((error: any) => {
                    console.log('Error sending message:', error);
                });
        }
    });

    return {

    }
})