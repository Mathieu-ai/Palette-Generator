import { useRegistryScript } from "../utils.js";
import { number, object, string, union } from "#nuxt-scripts-validator";
export const MetaPixelOptions = object({
  id: union([string(), number()])
});
export function useScriptMetaPixel(_options) {
  return useRegistryScript("metaPixel", (options) => ({
    scriptInput: {
      src: "https://connect.facebook.net/en_US/fbevents.js",
      crossorigin: false
    },
    schema: import.meta.dev ? MetaPixelOptions : void 0,
    scriptOptions: {
      use() {
        return { fbq: window.fbq };
      }
    },
    clientInit: import.meta.server ? void 0 : () => {
      const fbq = window.fbq = function(...params) {
        if (fbq.callMethod) {
          fbq.callMethod(...params);
        } else {
          fbq.queue.push(params);
        }
      };
      if (!window._fbq)
        window._fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];
      fbq("init", options?.id);
      fbq("track", "PageView");
    }
  }), _options);
}
