import { useRegistryScript } from "../utils.js";
import { array, literal, object, optional, string, union } from "#nuxt-scripts-validator";
const extensions = [
  literal("hash"),
  literal("outbound-links"),
  literal("file-downloads"),
  literal("tagged-events"),
  literal("revenue"),
  literal("pageview-props"),
  literal("compat"),
  literal("local"),
  literal("manual")
];
export const PlausibleAnalyticsOptions = object({
  domain: string(),
  // required
  extension: optional(union([union(extensions), array(union(extensions))]))
});
export function useScriptPlausibleAnalytics(_options) {
  return useRegistryScript("plausibleAnalytics", (options) => {
    const extensions2 = Array.isArray(options?.extension) ? options.extension.join(".") : [options?.extension];
    return {
      scriptInput: {
        "src": options?.extension ? `https://plausible.io/js/script.${extensions2}.js` : "https://plausible.io/js/script.js",
        "data-domain": options?.domain
      },
      schema: import.meta.dev ? PlausibleAnalyticsOptions : void 0,
      scriptOptions: {
        use() {
          return { plausible: window.plausible };
        }
      }
    };
  }, _options);
}
