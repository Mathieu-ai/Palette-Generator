// https://nuxt.com/docs/api/configuration/nuxt-config
import pkg from "./package.json" assert { type: "json" };

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },

    // SSR disabled - this is a client-side only app (requires browser APIs for image processing)
    ssr: false,

    app: {
        // Configure base URL for GitHub Pages deployment
        baseURL: process.env.NUXT_APP_BASE_URL || "/",
        buildAssetsDir: "/_nuxt/",
        head: {
            title: pkg.name,
            meta: [
                { name: "description", content: pkg.description },
                { name: "viewport", content: "width=device-width, initial-scale=1" },
            ],
        },
    },

    // Nitro configuration for static generation
    nitro: {
        preset: "static",
    },
    modules: [
        "@nuxt/eslint",
        "@nuxt/image",
        "@nuxt/scripts",
        "@nuxt/ui",
        "@nuxtjs/i18n",
        "@pinia/nuxt",
    ],
    css: ["~/assets/css/main.css"],
    i18n: {
        defaultLocale: "en",
        locales: [
            { code: "en", name: "English", flag: "🇬🇧", file: "en.json" },
            { code: "fr", name: "Français", flag: "🇫🇷", file: "fr.json" },
            { code: "es", name: "Español", flag: "🇪🇸", file: "es.json" },
            { code: "de", name: "Deutsch", flag: "🇩🇪", file: "de.json" },
            { code: "nl", name: "Nederlands", flag: "🇳🇱", file: "nl.json" },
            { code: "pt", name: "Português", flag: "🇵🇹", file: "pt.json" },
            { code: "it", name: "Italiano", flag: "🇮🇹", file: "it.json" },
            { code: "ru", name: "Русский", flag: "🇷🇺", file: "ru.json" },
            { code: "pl", name: "Polski", flag: "🇵🇱", file: "pl.json" },
            { code: "cs", name: "Čeština", flag: "🇨🇿", file: "cs.json" },
            { code: "sv", name: "Svenska", flag: "🇸🇪", file: "sv.json" },
            { code: "no", name: "Norsk", flag: "🇳🇴", file: "no.json" },
            { code: "fi", name: "Suomi", flag: "🇫🇮", file: "fi.json" },
            { code: "el", name: "Ελληνικά", flag: "🇬🇷", file: "el.json" },
            { code: "tr", name: "Türkçe", flag: "🇹🇷", file: "trk.json" },
            { code: "ro", name: "Română", flag: "🇷🇴", file: "rum.json" },
            { code: "vi", name: "Tiếng Việt", flag: "🇻🇳", file: "vie.json" },
            { code: "ja", name: "日本語", flag: "🇯🇵", file: "jpn.json" },
            { code: "zh-cn", name: "简体中文", flag: "🇨🇳", file: "chn.json" },
            { code: "zh-tw", name: "繁體中文", flag: "🇹🇼", file: "tcw.json" },
            {
                code: "zh-hk",
                name: "粵語 (香港)",
                flag: "🇭🇰",
                file: "tcv.json",
            },
            { code: "bn", name: "বাংলা", flag: "🇧🇩", file: "bng.json" },
            { code: "hi", name: "हिन्दी", flag: "🇮🇳", file: "hnd.json" },
            { code: "ur", name: "اردو", flag: "🇵🇰", file: "urd.json" },
            { code: "ar", name: "العربية", flag: "🇸🇦", file: "arq.json" },
            { code: "am", name: "አማርኛ", flag: "🇪🇹", file: "amh.json" },
            { code: "az", name: "Azərbaycanca", flag: "🇦🇿", file: "azb.json" },
            { code: "gu", name: "ગુજરાતી", flag: "🇮🇳", file: "bhj.json" },
            { code: "or", name: "ଓଡ଼ିଆ", flag: "🇮🇳", file: "ory.json" },
            { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳", file: "pnb.json" },
            {
                code: "pn",
                name: "ਪੰਜਾਬੀ (ਪੰਜਾਬੀ)",
                flag: "🇵🇰",
                file: "pnj.json",
            },
            { code: "ml", name: "മലയാളം", flag: "🇮🇳", file: "mli.json" },
            { code: "mr", name: "मराठी", flag: "🇮🇳", file: "mrt.json" },
            { code: "mk", name: "मैथिली", flag: "🇮🇳", file: "mjs.json" },
            { code: "uz", name: "Oʻzbekcha", flag: "🇺🇿", file: "uzb.json" },
            {
                code: "plk",
                name: "ਪੰਜਾਬੀ (ਪੰਜਾਬ)",
                flag: "🇵🇰",
                file: "pnb.json",
            },
            { code: "ps", name: "پښتو", flag: "🇦🇫", file: "pes.json" },
            { code: "ky", name: "Кырык", flag: "🇰🇬", file: "kjv.json" },
            { code: "sw", name: "Kiswahili", flag: "🇰🇪", file: "kjv.json" },
            { code: "fa", name: "فارسی", flag: "🇮🇷", file: "pes.json" },
            {
                code: "azb",
                name: "Azərbaycanca (AZB)",
                flag: "🇦🇿",
                file: "azb.json",
            },
            {
                code: "pt-br",
                name: "Português (BR)",
                flag: "🇧🇷",
                file: "pt.json",
            },
        ],
    },
});
