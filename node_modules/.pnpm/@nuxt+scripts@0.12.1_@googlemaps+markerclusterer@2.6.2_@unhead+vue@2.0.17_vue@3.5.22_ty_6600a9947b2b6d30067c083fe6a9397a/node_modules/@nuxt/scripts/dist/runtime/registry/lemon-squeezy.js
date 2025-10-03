import { useRegistryScript } from "../utils.js";
export function useScriptLemonSqueezy(_options) {
  return useRegistryScript("lemonSqueezy", () => ({
    scriptInput: {
      src: "https://assets.lemonsqueezy.com/lemon.js",
      crossorigin: false
    },
    scriptOptions: {
      use() {
        if (typeof window.createLemonSqueezy === "undefined")
          return void 0;
        window.createLemonSqueezy();
        return window.LemonSqueezy;
      }
    }
  }), _options);
}
