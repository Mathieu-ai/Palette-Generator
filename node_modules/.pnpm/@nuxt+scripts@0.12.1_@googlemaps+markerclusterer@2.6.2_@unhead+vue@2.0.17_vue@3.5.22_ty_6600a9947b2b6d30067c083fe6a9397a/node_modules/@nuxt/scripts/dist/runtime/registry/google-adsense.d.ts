import type { RegistryScriptInput } from '#nuxt-scripts/types';
export declare const GoogleAdsenseOptions: import("valibot").ObjectSchema<{
    /**
     * The Google Adsense ID.
     */
    readonly client: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    /**
     * Enable or disable Auto Ads.
     */
    readonly autoAds: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
}, undefined>;
export type GoogleAdsenseInput = RegistryScriptInput<typeof GoogleAdsenseOptions, true, false, false>;
export interface GoogleAdsenseApi {
    /**
     * The Google Adsense API.
     */
    adsbygoogle: any[] & {
        loaded?: boolean;
    };
}
declare global {
    interface Window extends GoogleAdsenseApi {
    }
}
/**
 * useScriptGoogleAdsense
 *
 * A 3P wrapper for Google Analytics that takes an options input to feed into third-party-capital({@link https://github.com/GoogleChromeLabs/third-party-capital}), which returns instructions for nuxt-scripts.
 */
export declare function useScriptGoogleAdsense<T extends GoogleAdsenseApi>(_options?: GoogleAdsenseInput): import("#nuxt-scripts/types").UseScriptContext<T>;
