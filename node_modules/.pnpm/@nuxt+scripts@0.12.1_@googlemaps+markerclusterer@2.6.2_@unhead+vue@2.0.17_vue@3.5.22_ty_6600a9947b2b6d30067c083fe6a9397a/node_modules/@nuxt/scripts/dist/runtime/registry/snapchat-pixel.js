import { useRegistryScript } from "../utils.js";
import { boolean, object, optional, string } from "#nuxt-scripts-validator";
export const InitObjectPropertiesSchema = object({
  user_email: optional(string()),
  ip_address: optional(string()),
  user_phone_number: optional(string()),
  user_hashed_email: optional(string()),
  user_hashed_phone_number: optional(string()),
  firstname: optional(string()),
  lastname: optional(string()),
  geo_city: optional(string()),
  geo_region: optional(string()),
  geo_postal_code: optional(string()),
  geo_country: optional(string()),
  age: optional(string())
});
export const SnapTrPixelOptions = object({
  id: string(),
  trackPageView: optional(boolean()),
  ...InitObjectPropertiesSchema?.entries || {}
});
export function useScriptSnapchatPixel(_options) {
  return useRegistryScript("snapchatPixel", (options) => ({
    scriptInput: {
      src: "https://sc-static.net/scevent.min.js",
      crossorigin: false
    },
    schema: import.meta.dev ? SnapTrPixelOptions : void 0,
    scriptOptions: {
      use() {
        return { snaptr: window.snaptr };
      }
    },
    clientInit: import.meta.server ? void 0 : () => {
      const snaptr = window.snaptr = function(...params) {
        if (snaptr.handleRequest) {
          snaptr.handleRequest(...params);
        } else {
          snaptr.queue.push(params);
        }
      };
      if (!window.snaptr)
        window._snaptr = snaptr;
      snaptr.push = snaptr;
      snaptr.loaded = true;
      snaptr.version = "1.0";
      snaptr.queue = [];
      const { id, ...initData } = options;
      snaptr("init", options?.id, initData);
      if (options?.trackPageView) {
        snaptr("track", "PAGE_VIEW");
      }
    }
  }), _options);
}
