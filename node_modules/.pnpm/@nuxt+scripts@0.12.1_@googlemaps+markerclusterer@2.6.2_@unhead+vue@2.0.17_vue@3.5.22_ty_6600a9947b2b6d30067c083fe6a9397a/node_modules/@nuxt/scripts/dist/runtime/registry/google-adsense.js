import { useHead } from "nuxt/app";
import { useRegistryScript } from "../utils.js";
import { object, string, optional, boolean } from "#nuxt-scripts-validator";
export const GoogleAdsenseOptions = object({
  /**
   * The Google Adsense ID.
   */
  client: optional(string()),
  /**
   * Enable or disable Auto Ads.
   */
  autoAds: optional(boolean())
});
export function useScriptGoogleAdsense(_options) {
  return useRegistryScript("googleAdsense", (options) => ({
    scriptInput: {
      src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    },
    schema: import.meta.dev ? GoogleAdsenseOptions : void 0,
    scriptOptions: {
      use() {
        return { adsbygoogle: window.adsbygoogle };
      },
      beforeInit() {
        if (options?.client) {
          useHead({
            // Add meta tag for Google Adsense account
            meta: [
              {
                name: "google-adsense-account",
                content: options.client
              }
            ],
            // Inject Auto Ads script dynamically
            script: [
              {
                innerHTML: `
                (adsbygoogle = window.adsbygoogle || []).push({
                  google_ad_client: "${options.client}",
                  enable_page_level_ads: ${options.autoAds ?? false}
                });
                `,
                type: "text/javascript"
              }
            ]
          });
        }
      }
    }
  }), _options);
}
