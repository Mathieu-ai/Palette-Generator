import { joinURL } from "ufo";
import { useRegistryScript } from "../utils.js";
import { object, optional, string } from "#nuxt-scripts-validator";
export const SegmentOptions = object({
  writeKey: string(),
  analyticsKey: optional(string())
});
const methods = ["track", "page", "identify", "group", "alias", "reset"];
export function useScriptSegment(_options) {
  return useRegistryScript("segment", (options) => {
    const k = options?.analyticsKey ?? "analytics";
    return {
      scriptInput: {
        "data-global-segment-analytics-key": k,
        "src": joinURL("https://cdn.segment.com/analytics.js/v1", options?.writeKey || "", "analytics.min.js")
      },
      clientInit: import.meta.server ? void 0 : () => {
        window[k] = window[k] || [];
        window[k].methods = methods;
        window[k].factory = function(method) {
          return function(...params) {
            const args = Array.prototype.slice.call(params);
            args.unshift(method);
            window[k].push(args);
            return window[k];
          };
        };
        for (let i = 0; i < window[k].methods.length; i++) {
          const key = window[k].methods[i];
          window[k][key] = window[k].factory(key);
        }
        window[k].page();
      },
      schema: import.meta.dev ? SegmentOptions : void 0,
      scriptOptions: {
        use() {
          return methods.reduce((acc, key) => {
            acc[key] = window[k].factory(key);
            return acc;
          }, {});
        }
      }
    };
  }, _options);
}
