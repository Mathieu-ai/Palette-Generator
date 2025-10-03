import type { RegistryScriptInput } from '#nuxt-scripts/types';
export interface HotjarApi {
    hj: ((event: 'identify', userId: string, attributes?: Record<string, any>) => void) & ((event: 'stateChange', path: string) => void) & ((event: 'event', eventName: string) => void) & ((event: string, arg?: string) => void) & ((...params: any[]) => void) & {
        q: any[];
    };
}
declare global {
    interface Window extends HotjarApi {
        _hjSettings: {
            hjid: number;
            hjsv?: number;
        };
    }
}
export declare const HotjarOptions: import("valibot").ObjectSchema<{
    readonly id: import("valibot").NumberSchema<undefined>;
    readonly sv: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
}, undefined>;
export type HotjarInput = RegistryScriptInput<typeof HotjarOptions, true, false, false>;
export declare function useScriptHotjar<T extends HotjarApi>(_options?: HotjarInput): import("#nuxt-scripts/types").UseScriptContext<T>;
