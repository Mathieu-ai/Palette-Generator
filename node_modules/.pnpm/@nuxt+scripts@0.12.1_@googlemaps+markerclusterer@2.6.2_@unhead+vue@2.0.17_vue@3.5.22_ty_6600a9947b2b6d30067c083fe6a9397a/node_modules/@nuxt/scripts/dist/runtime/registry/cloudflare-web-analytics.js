import { useRegistryScript } from "../utils.js";
import { boolean, minLength, object, optional, pipe, string } from "#nuxt-scripts-validator";
export const CloudflareWebAnalyticsOptions = object({
  /**
   * The Cloudflare Web Analytics token.
   */
  token: pipe(string(), minLength(32)),
  /**
   * Cloudflare Web Analytics enables measuring SPAs automatically by overriding the History API’s pushState function
   * and listening to the onpopstate. Hash-based router is not supported.
   *
   * @default true
   */
  spa: optional(boolean())
});
export function useScriptCloudflareWebAnalytics(_options) {
  return useRegistryScript("cloudflareWebAnalytics", (options) => ({
    scriptInput: {
      "src": "https://static.cloudflareinsights.com/beacon.min.js",
      "data-cf-beacon": JSON.stringify({ token: options.token, spa: options.spa || true }),
      "crossorigin": false
    },
    schema: import.meta.dev ? CloudflareWebAnalyticsOptions : void 0,
    scriptOptions: {
      // we want to load earlier so that the web vitals reports are correct
      trigger: "client",
      use() {
        return { __cfBeacon: window.__cfBeacon };
      }
    }
  }), _options);
}
