import { watch } from "vue";
import { useHead } from "@unhead/vue";
import { useRegistryScript } from "../utils.js";
export function useScriptVimeoPlayer(_options) {
  const instance = useRegistryScript("vimeoPlayer", () => ({
    scriptInput: {
      src: "https://player.vimeo.com/api/player.js"
    },
    scriptOptions: {
      use() {
        return {
          Vimeo: window.Vimeo
        };
      }
    }
  }), _options);
  if (import.meta.client) {
    const _ = watch(instance.status, (status) => {
      if (status === "loading") {
        useHead({
          link: [
            {
              rel: "preconnect",
              href: "https://i.vimeocdn.com"
            },
            {
              rel: "preconnect",
              href: "https://f.vimeocdn.com"
            },
            {
              rel: "preconnect",
              href: "https://fresnel.vimeocdn.com"
            }
          ]
        });
        _();
      }
    });
  }
  return instance;
}
