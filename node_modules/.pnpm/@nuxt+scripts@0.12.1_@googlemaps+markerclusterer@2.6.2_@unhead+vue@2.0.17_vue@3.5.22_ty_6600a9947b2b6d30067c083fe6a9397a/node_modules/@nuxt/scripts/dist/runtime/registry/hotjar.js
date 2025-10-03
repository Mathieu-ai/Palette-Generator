import { useRegistryScript } from "../utils.js";
import { number, object, optional } from "#nuxt-scripts-validator";
export const HotjarOptions = object({
  id: number(),
  sv: optional(number())
});
export function useScriptHotjar(_options) {
  return useRegistryScript("hotjar", (options) => ({
    scriptInput: {
      src: `https://static.hotjar.com/c/hotjar-${options?.id}.js?sv=${options?.sv || 6}`
    },
    schema: import.meta.dev ? HotjarOptions : void 0,
    scriptOptions: {
      use() {
        return { hj: window.hj };
      }
    },
    clientInit: import.meta.server ? void 0 : () => {
      window._hjSettings = window._hjSettings || { hjid: options?.id, hjsv: options?.sv || 6 };
      window.hj = window.hj || function(...params) {
        (window.hj.q = window.hj.q || []).push(params);
      };
    }
  }), _options);
}
