import { watch } from "vue";
import { useHead } from "@unhead/vue";
import { useRegistryScript } from "../utils.js";
export function useScriptYouTubePlayer(_options) {
  let readyPromise = Promise.resolve();
  const instance = useRegistryScript("youtubePlayer", () => ({
    scriptInput: {
      src: "https://www.youtube.com/iframe_api",
      crossorigin: false
      // crossorigin can't be set or it breaks
    },
    scriptOptions: {
      use() {
        return {
          YT: window.YT || readyPromise.then(() => {
            return window.YT;
          })
        };
      }
    },
    clientInit: import.meta.server ? void 0 : () => {
      readyPromise = new Promise((resolve) => {
        window.onYouTubeIframeAPIReady = resolve;
      });
    }
  }), _options);
  if (import.meta.client) {
    const _ = watch(instance.status, (status) => {
      if (status === "loading") {
        useHead({
          link: [
            {
              rel: "preconnect",
              href: "https://www.youtube-nocookie.com"
            },
            {
              rel: "preconnect",
              href: "https://www.google.com"
            },
            {
              rel: "preconnect",
              href: "https://googleads.g.doubleclick.net"
            },
            {
              rel: "preconnect",
              href: "https://static.doubleclick.net"
            }
          ]
        });
        _();
      }
    });
  }
  return instance;
}
