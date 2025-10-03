import { useRegistryScript } from "../utils.js";
import { object, optional, string } from "#nuxt-scripts-validator";
export const XPixelOptions = object({
  id: string(),
  version: optional(string())
});
export function useScriptXPixel(_options) {
  return useRegistryScript("xPixel", (options) => {
    return {
      scriptInput: {
        src: "https://static.ads-twitter.com/uwt.js",
        crossorigin: false
      },
      clientInit: import.meta.server ? void 0 : () => {
        const s = window.twq = function(...args) {
          if (e.exe) {
            s.exe(s, args);
          } else {
            s.queue.push(args);
          }
        };
        s.version = options?.version || "1.1";
        s.queue = [
          ["config", options?.id]
        ];
      },
      schema: import.meta.dev ? XPixelOptions : void 0,
      scriptOptions: {
        use() {
          return { twq: window.twq };
        }
      }
    };
  }, _options);
}
