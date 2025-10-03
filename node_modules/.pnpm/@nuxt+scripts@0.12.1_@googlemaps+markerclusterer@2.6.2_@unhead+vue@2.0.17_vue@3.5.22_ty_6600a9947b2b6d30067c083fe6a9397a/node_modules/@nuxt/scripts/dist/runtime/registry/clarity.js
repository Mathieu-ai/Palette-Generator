import { useRegistryScript } from "../utils.js";
import { minLength, object, string, pipe } from "#nuxt-scripts-validator";
export const ClarityOptions = object({
  /**
   * The Clarity token.
   */
  id: pipe(string(), minLength(10))
});
export function useScriptClarity(_options) {
  return useRegistryScript(
    "clarity",
    (options) => ({
      scriptInput: {
        src: `https://www.clarity.ms/tag/${options.id}`
      },
      schema: import.meta.dev ? ClarityOptions : void 0,
      scriptOptions: {
        use() {
          return {
            // @ts-expect-error untyped
            clarity: Object.assign(function(...params) {
              const clarity = window.clarity;
              return clarity.apply(this, params);
            }, window.clarity)
          };
        }
      },
      clientInit: import.meta.server ? void 0 : () => {
        window.clarity = window.clarity || function(...params) {
          (window.clarity.q = window.clarity.q || []).push(params);
        };
      }
    }),
    _options
  );
}
