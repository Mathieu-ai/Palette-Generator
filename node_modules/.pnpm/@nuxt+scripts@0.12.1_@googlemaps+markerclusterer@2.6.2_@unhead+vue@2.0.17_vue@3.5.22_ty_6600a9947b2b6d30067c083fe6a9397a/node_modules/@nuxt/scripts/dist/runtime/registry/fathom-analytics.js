import { useRegistryScript } from "../utils.js";
import { boolean, literal, object, optional, string, union } from "#nuxt-scripts-validator";
export const FathomAnalyticsOptions = object({
  /**
   * The Fathom Analytics site ID.
   */
  site: string(),
  /**
   * The Fathom Analytics tracking mode.
   */
  spa: optional(union([literal("auto"), literal("history"), literal("hash")])),
  /**
   * Automatically track page views.
   */
  auto: optional(boolean()),
  /**
   * Enable canonical URL tracking.
   */
  canonical: optional(boolean()),
  /**
   * Honor Do Not Track requests.
   */
  honorDnt: optional(boolean())
});
export function useScriptFathomAnalytics(_options) {
  return useRegistryScript("fathomAnalytics", (options) => ({
    scriptInput: {
      src: "https://cdn.usefathom.com/script.js",
      // can't be bundled
      // append the data attr's
      ...Object.entries(options).filter(([key]) => ["site", "spa", "auto", "canonical", "honorDnt"].includes(key)).reduce((acc, [_key, value]) => {
        const key = _key === "honourDnt" ? "honor-dnt" : _key;
        acc[`data-${key}`] = value;
        return acc;
      }, {})
    },
    schema: import.meta.dev ? FathomAnalyticsOptions : void 0,
    scriptOptions: {
      use() {
        return window.fathom;
      }
    }
  }), _options);
}
