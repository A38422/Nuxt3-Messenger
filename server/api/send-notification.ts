import admin from "firebase-admin";
import serviceAccount from "@/server/api/nuxt3-messenger-firebase-adminsdk-581wr-3365ac9735.json";
import {readBody} from "h3";

admin.initializeApp({
    credential: admin.credential.cert({
        // @ts-ignore
        "type": "service_account",
        "project_id": "nuxt3-messenger",
        "private_key_id": "3365ac9735aa41f013eec49ecc97a45c7dca61be",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDHq/0eB4F9Hiau\nYZkaU+2o2lCWzcZVN1JENaYFe501OmAT+HkUeIdfDABdiGvjJXZNcCA067/d84ZM\nOfvxg7cH2w6rAeF1y+IJ3CMVMQcA+hGWjbViy/Bd10vjWInDgI707U1IkjOuDAk7\n6bzRV2nsYfXWN7LtyaJjiMI9XxatFqXZ1pNaPD+Oh6s8sUmLOe8EsVqb3BmM/hc4\ntv8lpFuOQ+zN00daArXtrLeloGrPOwL6k9L4A/DG8Sc28qcVlaa1TGU0bbG64Saj\nQaZ6c5lNS5tf5kF3RP4nzbrvLKDga9tH+7ADHyOJgS2WwWB6RT/3/jcUrIY7URKV\nQm/i3gBVAgMBAAECggEAAtPMocA5dSwYICABqv3FP77XpUsEo/BEmfKohytY7ogF\nFENQc5nBUPc6ihiEbpL5Od98lUNBVEM+g5XOm3zh+pp/eqxsJN7eNIWJeaNYFgt0\ndE1NZDi/DpUd3fpC+SG45H73uS9Yy/4fo1mL8urp9Q7uDDp9riBMzFwDZBsUlx7U\nj/6yuYyXJpuSPUXLTTMvXFYe78WgqLeuVqxygfudHTFIH5htjBaok008ZqABMQzm\nZ0ek+HPPAOzGPMsG3mv5QyA6ICL3lctZbZ+dQTkgugsJqmu4VU1Nr9ewxH1xcuv3\nzcOaNuVfm6Q76n4T+Kncxc0T8kZsT+UiJHT/h2/bgQKBgQDww9SJViep4+3eR62y\nNmSvup4mWg82Soitl27pxtnfNwOjrzc+FqYIp8hUKTFGrmLck+jo4RPvHW+s6UQ4\nvi5vM3HM5qw3UcK08+rY6aMCeV0lITGt9ybyhR7fbsZqrjvA9l/tIX7nVlOwwz6e\nVNKhRGrRBIKna3V1hn92vEeKRwKBgQDUTnzgBETxeUxTWFCskwspWjfRhyl1Xw3y\n6Vc0syvWmeaLFaE8+5TFAhUFuzgE8NGuE1gWM2mJLxWSJZvEAsHJaSrNKz9ZGNxz\nn5psOzEnm7h5JyaTN/EVQBiewxmJ9Rt9Jrze4b1WZxVVdBBsbKp/5dLqp8koGn5c\nnnJs5IzSgwKBgQDdE9TLLvNIyuSW4Nab99pIimHB8ZxaS+JpE85il5djoc6TtMZT\nGtTmybnnndODhYl95ctOW67EOBFdguyD9g4JSgHLFl04hrj1E6yn9REbqnlfKLXH\nelSnCJmqrLtBJi/0Jcc7pTA0GE7M1tte46BtOLekqjGWrdOzUQcl7gj67QKBgA1F\nrtbOTYUPAS+AqOJw+tSl+DFYEsZsn9Gctr/rp4Tt8BSn0IGgdKdwPuIx1wmwCFuq\nh+ozYpiZ4e5V/YveZED0GyHiXz5xqG5t/thfRu5j9L9WLDot2Bts+10Jc1JFiWdk\ngZApao25OgMyk0hD7tC6DFpxDMk+BsJBgYO/MfKDAoGAWjroY8cb02pbJ2ghuTI5\nqahS5XGgF/MRxZ1RKIPMzm0KuCc5XXg+HQK4mOHBFT1/DUbgGpzyViVNDiuN5/sl\nY2O9vj0XfSS70X4rk/k/8sd4avdbeeb9ZXZzGiZ3CujPmDIjhudsMEeM2Cw03VBX\nRTcKMtj5O4XA4+b4cmFtl8g=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-581wr@nuxt3-messenger.iam.gserviceaccount.com",
        "client_id": "115024791156276485415",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-581wr%40nuxt3-messenger.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com",
    }),
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