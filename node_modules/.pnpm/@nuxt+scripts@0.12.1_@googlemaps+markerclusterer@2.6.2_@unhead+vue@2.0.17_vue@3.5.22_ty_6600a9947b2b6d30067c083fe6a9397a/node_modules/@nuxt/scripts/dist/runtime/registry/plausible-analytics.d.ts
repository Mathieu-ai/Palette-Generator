import type { RegistryScriptInput } from '#nuxt-scripts/types';
export declare const PlausibleAnalyticsOptions: import("valibot").ObjectSchema<{
    readonly domain: import("valibot").StringSchema<undefined>;
    readonly extension: import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").UnionSchema<(import("valibot").LiteralSchema<"hash", undefined> | import("valibot").LiteralSchema<"outbound-links", undefined> | import("valibot").LiteralSchema<"file-downloads", undefined> | import("valibot").LiteralSchema<"tagged-events", undefined> | import("valibot").LiteralSchema<"revenue", undefined> | import("valibot").LiteralSchema<"pageview-props", undefined> | import("valibot").LiteralSchema<"compat", undefined> | import("valibot").LiteralSchema<"local", undefined> | import("valibot").LiteralSchema<"manual", undefined>)[], undefined>, import("valibot").ArraySchema<import("valibot").UnionSchema<(import("valibot").LiteralSchema<"hash", undefined> | import("valibot").LiteralSchema<"outbound-links", undefined> | import("valibot").LiteralSchema<"file-downloads", undefined> | import("valibot").LiteralSchema<"tagged-events", undefined> | import("valibot").LiteralSchema<"revenue", undefined> | import("valibot").LiteralSchema<"pageview-props", undefined> | import("valibot").LiteralSchema<"compat", undefined> | import("valibot").LiteralSchema<"local", undefined> | import("valibot").LiteralSchema<"manual", undefined>)[], undefined>, undefined>], undefined>, undefined>;
}, undefined>;
export type PlausibleAnalyticsInput = RegistryScriptInput<typeof PlausibleAnalyticsOptions, false>;
export interface PlausibleAnalyticsApi {
    plausible: ((event: '404', options: Record<string, any>) => void) & ((event: 'event', options: Record<string, any>) => void) & ((...params: any[]) => void) & {
        q: any[];
    };
}
declare global {
    interface Window {
        plausible: PlausibleAnalyticsApi;
    }
}
export declare function useScriptPlausibleAnalytics<T extends PlausibleAnalyticsApi>(_options?: PlausibleAnalyticsInput): import("#nuxt-scripts/types").UseScriptContext<T>;
