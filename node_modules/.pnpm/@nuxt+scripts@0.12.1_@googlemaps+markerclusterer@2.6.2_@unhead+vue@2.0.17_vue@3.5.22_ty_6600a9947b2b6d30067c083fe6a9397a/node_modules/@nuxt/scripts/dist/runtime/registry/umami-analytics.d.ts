import type { RegistryScriptInput } from '#nuxt-scripts/types';
export declare const UmamiAnalyticsOptions: import("valibot").ObjectSchema<{
    readonly websiteId: import("valibot").StringSchema<undefined>;
    /**
     * By default, Umami will send data to wherever the script is located.
     * You can override this to send data to another location.
     */
    readonly hostUrl: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    /**
     * By default, Umami tracks all pageviews and events for you automatically.
     * You can disable this behavior and track events yourself using the tracker functions.
     * https://umami.is/docs/tracker-functions
     */
    readonly autoTrack: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
    /**
     * If you want the tracker to only run on specific domains, you can add them to your tracker script.
     * This is a comma delimited list of domain names.
     * Helps if you are working in a staging/development environment.
     */
    readonly domains: import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").StringSchema<undefined>, undefined>, undefined>;
    /**
     * If you want the tracker to collect events under a specific tag.
     * Events can be filtered in the dashboard by a specific tag.
     */
    readonly tag: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    /**
     * Function that will be called before data is sent to Umami.
     * The function takes two parameters: type and payload.
     * Return the payload to continue sending, or return a falsy value to cancel.
     */
    readonly beforeSend: import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").CustomSchema<(type: string, payload: Record<string, any>) => Record<string, any> | null | false, undefined>, import("valibot").StringSchema<undefined>], undefined>, undefined>;
}, undefined>;
export type UmamiAnalyticsInput = RegistryScriptInput<typeof UmamiAnalyticsOptions, false>;
export interface UmamiAnalyticsApi {
    track: ((payload?: Record<string, any>) => void) & ((event_name: string, event_data: Record<string, any>) => void);
    identify: (session_data?: Record<string, any> | string) => void;
}
declare global {
    interface Window {
        umami: UmamiAnalyticsApi;
    }
}
export declare function useScriptUmamiAnalytics<T extends UmamiAnalyticsApi>(_options?: UmamiAnalyticsInput): import("#nuxt-scripts/types").UseScriptContext<T>;
