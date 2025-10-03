import { withBase } from "ufo";
import { useRegistryScript } from "../utils.js";
import { object, optional, string, union, literal } from "#nuxt-scripts-validator";
const PROVIDERS = ["jsdelivr", "cdnjs", "unpkg"];
const providerValidator = union(PROVIDERS.map((provider) => literal(provider)));
export const NpmOptions = object({
  packageName: string(),
  file: optional(string()),
  version: optional(string()),
  provider: optional(providerValidator)
});
export function useScriptNpm(_options) {
  return useRegistryScript(`${_options.packageName}-npm`, (options) => {
    const baseUrl = getProviderBaseUrl(options.provider, options.packageName, options.version);
    return {
      scriptInput: {
        src: withBase(options.file || "", baseUrl)
      },
      schema: import.meta.dev ? NpmOptions : void 0
    };
  }, _options);
}
function getProviderBaseUrl(provider = "unpkg", packageName, version = "latest") {
  switch (provider) {
    case "jsdelivr":
      return `https://cdn.jsdelivr.net/npm/${packageName}@${version}/`;
    case "cdnjs":
      return `https://cdnjs.cloudflare.com/ajax/libs/${packageName}/${version}/`;
    case "unpkg":
    default:
      return `https://unpkg.com/${packageName}@${version}/`;
  }
}
