import { useRegistryScript } from "../utils.js";
import { array, boolean, number, object, optional, string, union } from "#nuxt-scripts-validator";
export const RybbitAnalyticsOptions = object({
  siteId: union([string(), number()]),
  // required
  autoTrackPageview: optional(boolean()),
  trackSpa: optional(boolean()),
  trackQuery: optional(boolean()),
  trackOutbound: optional(boolean()),
  trackErrors: optional(boolean()),
  sessionReplay: optional(boolean()),
  webVitals: optional(boolean()),
  skipPatterns: optional(array(string())),
  maskPatterns: optional(array(string())),
  debounce: optional(number()),
  apiKey: optional(string())
});
export function useScriptRybbitAnalytics(_options) {
  return useRegistryScript("rybbitAnalytics", (options) => {
    return {
      scriptInput: {
        "src": "https://app.rybbit.io/api/script.js",
        "data-site-id": String(options?.siteId),
        "data-auto-track-pageview": options?.autoTrackPageview,
        "data-track-spa": options?.trackSpa,
        "data-track-query": options?.trackQuery,
        "data-track-outbound": options?.trackOutbound,
        "data-track-errors": options?.trackErrors,
        "data-session-replay": options?.sessionReplay,
        "data-web-vitals": options?.webVitals,
        "data-skip-patterns": options?.skipPatterns ? JSON.stringify(options.skipPatterns) : void 0,
        "data-mask-patterns": options?.maskPatterns ? JSON.stringify(options.maskPatterns) : void 0,
        "data-debounce": options?.debounce ? options.debounce.toString() : void 0,
        "data-api-key": options?.apiKey
      },
      schema: import.meta.dev ? RybbitAnalyticsOptions : void 0,
      scriptOptions: {
        use() {
          if (typeof window.rybbit === "undefined") {
            return null;
          }
          return {
            pageview: window.rybbit.pageview,
            event: window.rybbit.event,
            identify: window.rybbit.identify,
            clearUserId: window.rybbit.clearUserId,
            getUserId: window.rybbit.getUserId,
            rybbit: window.rybbit
          };
        }
      }
    };
  }, _options);
}
