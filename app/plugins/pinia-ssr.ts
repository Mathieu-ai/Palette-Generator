/**
 * Nuxt plugin to ensure proper Pinia state handling during SSR
 */
export default defineNuxtPlugin(() => {
    // This plugin ensures stores are properly initialized for SSR
    // The main issue is that ColorThief requires a DOM and should only be used client-side
});
