import { useRegistryScript } from "../utils.js";
import { object, optional, string, boolean, array, union, custom } from "#nuxt-scripts-validator";
export const UmamiAnalyticsOptions = object({
  websiteId: string(),
  // required
  /**
   * By default, Umami will send data to wherever the script is located.
   * You can override this to send data to another location.
   */
  hostUrl: optional(string()),
  /**
   * By default, Umami tracks all pageviews and events for you automatically.
   * You can disable this behavior and track events yourself using the tracker functions.
   * https://umami.is/docs/tracker-functions
   */
  autoTrack: optional(boolean()),
  /**
   * If you want the tracker to only run on specific domains, you can add them to your tracker script.
   * This is a comma delimited list of domain names.
   * Helps if you are working in a staging/development environment.
   */
  domains: optional(array(string())),
  /**
   * If you want the tracker to collect events under a specific tag.
   * Events can be filtered in the dashboard by a specific tag.
   */
  tag: optional(string()),
  /**
   * Function that will be called before data is sent to Umami.
   * The function takes two parameters: type and payload.
   * Return the payload to continue sending, or return a falsy value to cancel.
   */
  beforeSend: optional(union([
    custom((input) => typeof input === "function"),
    string()
  ]))
});
export function useScriptUmamiAnalytics(_options) {
  return useRegistryScript("umamiAnalytics", (options) => {
    const domains = Array.isArray(options?.domains) ? options.domains.join(",") : options?.domains;
    let beforeSendFunctionName;
    if (import.meta.client) {
      if (options?.beforeSend && typeof options.beforeSend === "function") {
        beforeSendFunctionName = `__umamiBeforeSend_${Math.random().toString(36).substring(2, 15)}`;
        window[beforeSendFunctionName] = options.beforeSend;
      } else if (typeof options.beforeSend === "string") {
        beforeSendFunctionName = options.beforeSend;
      }
    }
    return {
      scriptInput: {
        "src": "https://cloud.umami.is/script.js",
        "data-website-id": options.websiteId,
        "data-host-url": options?.hostUrl || void 0,
        "data-auto-track": typeof options?.autoTrack === "boolean" ? options.autoTrack : true,
        "data-domains": domains || void 0,
        "data-tag": options?.tag || void 0,
        "data-before-send": beforeSendFunctionName || void 0
      },
      schema: import.meta.dev ? UmamiAnalyticsOptions : void 0,
      scriptOptions: {
        use() {
          return window.umami;
        }
      }
    };
  }, _options);
}
