import { withQuery } from "ufo";
import { useRegistryScript } from "../utils.js";
import { array, literal, object, optional, string, union } from "#nuxt-scripts-validator";
export const GoogleMapsOptions = object({
  apiKey: string(),
  libraries: optional(array(string())),
  language: optional(string()),
  region: optional(string()),
  v: optional(union([literal("weekly"), literal("quarterly"), literal("beta"), literal("alpha"), string()]))
});
export function useScriptGoogleMaps(_options) {
  let readyPromise = Promise.resolve();
  return useRegistryScript("googleMaps", (options) => {
    const libraries = options?.libraries || ["places"];
    const language = options?.language ? { language: options.language } : void 0;
    const region = options?.region ? { region: options.region } : void 0;
    const version = options?.v ? { v: options.v } : void 0;
    return {
      scriptInput: {
        src: withQuery(`https://maps.googleapis.com/maps/api/js`, {
          libraries: libraries.join(","),
          key: options?.apiKey,
          loading: "async",
          callback: "google.maps.__ib__",
          ...language,
          ...region,
          ...version
        })
      },
      clientInit: import.meta.server ? void 0 : () => {
        window.google = window.google || {};
        window.google.maps = window.google.maps || {};
        readyPromise = new Promise((resolve) => {
          window.google.maps.__ib__ = resolve;
        });
      },
      schema: import.meta.dev ? GoogleMapsOptions : void 0,
      scriptOptions: {
        use() {
          return {
            maps: readyPromise.then(() => window.google.maps)
          };
        }
      }
    };
  }, _options);
}
