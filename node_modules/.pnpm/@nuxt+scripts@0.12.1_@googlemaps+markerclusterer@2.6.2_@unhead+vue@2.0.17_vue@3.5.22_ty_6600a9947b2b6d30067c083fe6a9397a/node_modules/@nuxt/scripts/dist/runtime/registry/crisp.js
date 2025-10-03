import { useRegistryScript } from "../utils.js";
import { object, string, optional, number } from "#nuxt-scripts-validator";
export const CrispOptions = object({
  /**
   * The Crisp ID.
   */
  id: string(),
  /**
   * Extra configuration options. Used to configure the locale.
   * Same as CRISP_RUNTIME_CONFIG.
   * @see https://docs.crisp.chat/guides/chatbox-sdks/web-sdk/language-customization/
   */
  runtimeConfig: optional(object({
    locale: optional(string())
  })),
  /**
   * Associated a session, equivalent to using CRISP_TOKEN_ID variable.
   * Same as CRISP_TOKEN_ID.
   * @see https://docs.crisp.chat/guides/chatbox-sdks/web-sdk/session-continuity/
   */
  tokenId: optional(string()),
  /**
   * Restrict the domain that the Crisp cookie is set on.
   * Same as CRISP_COOKIE_DOMAIN.
   * @see https://docs.crisp.chat/guides/chatbox-sdks/web-sdk/cookie-policies/
   */
  cookieDomain: optional(string()),
  /**
   * The cookie expiry in seconds.
   * Same as CRISP_COOKIE_EXPIRATION.
   * @see https://docs.crisp.chat/guides/chatbox-sdks/web-sdk/cookie-policies/#change-cookie-expiration-date
   */
  cookieExpiry: optional(number())
});
export function useScriptCrisp(_options) {
  let readyPromise = Promise.resolve();
  return useRegistryScript("crisp", (options) => ({
    scriptInput: {
      src: "https://client.crisp.chat/l.js"
      // can't be bundled
    },
    schema: import.meta.dev ? CrispOptions : void 0,
    scriptOptions: {
      use() {
        const wrapFn = (fn) => window.$crisp?.[fn] || ((...args) => {
          readyPromise.then(() => window.$crisp[fn](...args));
        });
        return {
          push: window.$crisp.push,
          do: wrapFn("do"),
          set: wrapFn("set"),
          get: wrapFn("get"),
          on: wrapFn("on"),
          off: wrapFn("off"),
          config: wrapFn("config"),
          help: wrapFn("help")
        };
      }
    },
    clientInit: import.meta.server ? void 0 : () => {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = options.id;
      if (options.runtimeConfig?.locale)
        window.CRISP_RUNTIME_CONFIG = { locale: options.runtimeConfig.locale };
      if (options.cookieDomain)
        window.CRISP_COOKIE_DOMAIN = options.cookieDomain;
      if (options.cookieExpiry)
        window.CRISP_COOKIE_EXPIRATION = options.cookieExpiry;
      if (options.tokenId)
        window.CRISP_TOKEN_ID = options.tokenId;
      readyPromise = new Promise((resolve) => {
        window.CRISP_READY_TRIGGER = resolve;
      });
    }
  }), _options);
}
