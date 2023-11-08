import { defineNuxtPlugin } from '#app'
import mitt from 'mitt';

export default defineNuxtPlugin((nuxtApp) => {
    const emitter = mitt();

    return {
        provide: {
            bus: emitter
        }
    }
})