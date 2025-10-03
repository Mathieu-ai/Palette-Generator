import type { RegistryScriptInput } from '#nuxt-scripts/types';
export declare const GoogleMapsOptions: import("valibot").ObjectSchema<{
    readonly apiKey: import("valibot").StringSchema<undefined>;
    readonly libraries: import("valibot").OptionalSchema<import("valibot").ArraySchema<import("valibot").StringSchema<undefined>, undefined>, undefined>;
    readonly language: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly region: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly v: import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"weekly", undefined>, import("valibot").LiteralSchema<"quarterly", undefined>, import("valibot").LiteralSchema<"beta", undefined>, import("valibot").LiteralSchema<"alpha", undefined>, import("valibot").StringSchema<undefined>], undefined>, undefined>;
}, undefined>;
export type GoogleMapsInput = RegistryScriptInput<typeof GoogleMapsOptions>;
type MapsNamespace = typeof window.google.maps;
export interface GoogleMapsApi {
    maps: Promise<MapsNamespace>;
}
declare global {
    interface Window {
        google: {
            maps: {
                __ib__(): void;
            };
        };
    }
}
export declare function useScriptGoogleMaps<T extends GoogleMapsApi>(_options?: GoogleMapsInput): import("#nuxt-scripts/types").UseScriptContext<T>;
export {};
