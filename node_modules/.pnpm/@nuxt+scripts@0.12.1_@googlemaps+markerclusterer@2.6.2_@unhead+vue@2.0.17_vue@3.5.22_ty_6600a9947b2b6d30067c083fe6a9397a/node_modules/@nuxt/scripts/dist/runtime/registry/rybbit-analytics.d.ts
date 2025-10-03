import type { RegistryScriptInput } from '#nuxt-scripts/types';
export declare const RybbitAnalyticsOptions: import("valibot").ObjectSchema<{
    readonly siteId: import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").NumberSchema<undefined>], undefined>;
    readonly autoTrackPageview: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
    readonly trackSpa: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
    readonly trackQuery: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
    readonly trackOutbound: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
    readonly trackErrors: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
    readonly sessionReplay: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
    readonly webVitals: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
    readonly skipPatterns: import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").StringSchema<undefined>, undefined>, undefined>;
    readonly maskPatterns: import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").StringSchema<undefined>, undefined>, undefined>;
    readonly debounce: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
    readonly apiKey: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
}, undefined>;
export type RybbitAnalyticsInput = RegistryScriptInput<typeof RybbitAnalyticsOptions, false>;
export interface RybbitAnalyticsApi {
    /**
     * Tracks a page view
     */
    pageview: () => void;
    /**
     * Tracks a custom event
     * @param name Name of the event
     * @param properties Optional properties for the event
     */
    event: (name: string, properties?: Record<string, any>) => void;
    /**
     * Sets a custom user ID for tracking logged-in users
     * @param userId The user ID to set (will be stored in localStorage)
     */
    identify: (userId: string) => void;
    /**
     * Clears the stored user ID
     */
    clearUserId: () => void;
    /**
     * Gets the currently set user ID
     * @returns The current user ID or null if not set
     */
    getUserId: () => string | null;
    /**
     * @deprecated use top level functions instead
     */
    rybbit: RybbitAnalyticsApi;
}
declare global {
    interface Window {
        rybbit: RybbitAnalyticsApi;
    }
}
export declare function useScriptRybbitAnalytics<T extends RybbitAnalyticsApi>(_options?: RybbitAnalyticsInput): import("#nuxt-scripts/types").UseScriptContext<T>;
