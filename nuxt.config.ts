// https://nuxt.com/docs/api/configuration/nuxt-config
import {defineNuxtConfig} from "nuxt/config";

// @ts-ignore
export default defineNuxtConfig({
    // @ts-ignore
    ssr: false,
    experimental: {
        watcher: "chokidar",
    },
    devtools: {enabled: false},
    app: {
        head: {
            title: "Messenger",
            meta: [
                // <meta name="viewport" content="width=device-width, initial-scale=1">
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {"http-equiv": "Cross-Origin-Opener-Policy", content: "allow-popups"}
            ],
            script: [
                {src: 'spaghetti.js'}
            ],
            link: [
                {rel: 'icon', href: 'logo.svg'}
            ],
            // please note that this is an area that is likely to change
            noscript: [
                // <noscript>JavaScript is required</noscript>
                {children: 'JavaScript is required'}
            ]
        }
    },
    // $production: {
    //     // @ts-ignore
    //     routeRules: {
    //         '/**': {isr: true}
    //     }
    // },
    // $development: {
    //     //
    // },
    runtimeConfig: {
        app: {

        },
        public: {
            apiKey: process.env.API_KEY_FIREBASE,
            authDomain: process.env.AUTH_DOMAIN,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
            appId: process.env.APP_ID,
            measurementId: process.env.MEASUREMENT_ID
        }
    },
    // webpack: {
    //     loaders: {
    //         vue: {
    //             hotReload: false, // default true
    //         }
    //     }
    // },
    // vite: {
    //     define: { 'process.env.DEBUG': false },
    // },
    alias: {
        // "~": "/<rootDir>",
        // "@": "/<rootDir>",
        // "~~": "/<rootDir>",
        // "@@": "/<rootDir>",
        // "assets": "/<rootDir>/assets",
        // "public": "/<rootDir>/public"
    },
    css: ["/assets/main.scss"],
    plugins: ["@/plugins/firebase.ts"],
    modules: [
        "@nuxt/content",
        "@pinia/nuxt",
        '@element-plus/nuxt',
    ],
    elementPlus: { /** Options */ },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})
