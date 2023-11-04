import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { defineNuxtPlugin } from '#app'
import {getFirestore} from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
    // const runtimeConfig = useRuntimeConfig();
    //
    // const firebaseConfig = {
    //     apiKey: runtimeConfig.public.apiKey,
    //     authDomain: runtimeConfig.public.authDomain,
    //     projectId: runtimeConfig.public.projectId,
    //     storageBucket: runtimeConfig.public.storageBucket,
    //     messagingSenderId: runtimeConfig.public.messagingSenderId,
    //     appId: runtimeConfig.public.appId,
    //     measurementId: runtimeConfig.public.measurementId
    // };
    //
    // const app = initializeApp(firebaseConfig);
    //
    // const auth = getAuth(app);
    // const firestore = getFirestore(app);

    return {
        provide: {
            // firestore,
            // auth,
            // firebaseConfig
        }
    }
})