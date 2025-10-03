import type { RegistryScriptInput } from '#nuxt-scripts/types';
export declare const SegmentOptions: import("valibot").ObjectSchema<{
    readonly writeKey: import("valibot").StringSchema<undefined>;
    readonly analyticsKey: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
}, undefined>;
export type SegmentInput = RegistryScriptInput<typeof SegmentOptions>;
interface AnalyticsApi {
    track: (event: string, properties?: Record<string, any>) => void;
    page: (name?: string, properties?: Record<string, any>) => void;
    identify: (userId: string, traits?: Record<string, any>, options?: Record<string, any>) => void;
    group: (groupId: string, traits?: Record<string, any>, options?: Record<string, any>) => void;
    alias: (userId: string, previousId: string, options?: Record<string, any>) => void;
    reset: () => void;
    /**
     * @internal
     */
    methods: string[];
    /**
     * @internal
     */
    factory: (method: string) => (...args: any[]) => AnalyticsApi;
    /**
     * @internal
     */
    push: (args: any[]) => void;
}
export type SegmentApi = Pick<AnalyticsApi, 'track' | 'page' | 'identify' | 'group' | 'alias' | 'reset'>;
declare global {
    interface Window extends SegmentApi {
    }
}
export declare function useScriptSegment<T extends SegmentApi>(_options?: SegmentInput): import("#nuxt-scripts/types").UseScriptContext<T>;
export {};
