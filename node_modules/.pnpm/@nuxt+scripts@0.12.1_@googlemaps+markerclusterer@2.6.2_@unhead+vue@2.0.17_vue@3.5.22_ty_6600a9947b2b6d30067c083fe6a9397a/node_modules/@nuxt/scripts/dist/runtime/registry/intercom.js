import { joinURL } from "ufo";
import { useRegistryScript } from "../utils.js";
import { literal, number, object, optional, string, union } from "#nuxt-scripts-validator";
export const IntercomOptions = object({
  app_id: string(),
  api_base: optional(union([literal("https://api-iam.intercom.io"), literal("https://api-iam.eu.intercom.io"), literal("https://api-iam.au.intercom.io")])),
  name: optional(string()),
  email: optional(string()),
  user_id: optional(string()),
  // customizing the messenger
  alignment: optional(union([literal("left"), literal("right")])),
  horizontal_padding: optional(number()),
  vertical_padding: optional(number())
});
export function useScriptIntercom(_options) {
  return useRegistryScript("intercom", (options) => ({
    scriptInput: {
      src: joinURL(`https://widget.intercom.io/widget`, options?.app_id || "")
    },
    schema: import.meta.dev ? IntercomOptions : void 0,
    scriptOptions: {
      use() {
        return { Intercom: window.Intercom };
      }
    },
    clientInit: import.meta.server ? void 0 : () => {
      window.intercomSettings = options;
    }
  }), _options);
}
