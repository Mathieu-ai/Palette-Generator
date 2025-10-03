import type { RegistryScriptInput } from '#nuxt-scripts/types';
/**
 * Sample:
 * <!-- Cloudflare Web Analytics -->
 * <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "12ee46bf598b45c2868bbc07a3073f58"}'></script>
 * <!-- End Cloudflare Web Analytics -->
 */
export interface CloudflareWebAnalyticsApi {
    __cfBeacon: {
        load: 'single';
        spa: boolean;
        token: string;
    };
}
declare global {
    interface Window extends CloudflareWebAnalyticsApi {
    }
}
export declare const CloudflareWebAnalyticsOptions: import("valibot").ObjectSchema<{
    /**
     * The Cloudflare Web Analytics token.
     */
    readonly token: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").MinLengthAction<string, 32, undefined>]>;
    /**
     * Cloudflare Web Analytics enables measuring SPAs automatically by overriding the History API’s pushState function
     * and listening to the onpopstate. Hash-based router is not supported.
     *
     * @default true
     */
    readonly spa: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
}, undefined>;
export type CloudflareWebAnalyticsInput = RegistryScriptInput<typeof CloudflareWebAnalyticsOptions>;
export declare function useScriptCloudflareWebAnalytics<T extends CloudflareWebAnalyticsApi>(_options?: CloudflareWebAnalyticsInput): import("#nuxt-scripts/types").UseScriptContext<T>;
