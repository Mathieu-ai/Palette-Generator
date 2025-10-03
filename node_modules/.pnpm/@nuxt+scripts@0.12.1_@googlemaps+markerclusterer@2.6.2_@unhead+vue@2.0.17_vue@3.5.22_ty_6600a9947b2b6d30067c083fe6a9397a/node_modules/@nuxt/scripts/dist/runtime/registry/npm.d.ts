import type { RegistryScriptInput } from '#nuxt-scripts/types';
export declare const NpmOptions: import("valibot").ObjectSchema<{
    readonly packageName: import("valibot").StringSchema<undefined>;
    readonly file: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly version: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly provider: import("valibot").OptionalSchema<import("valibot").UnionSchema<import("valibot").LiteralSchema<"jsdelivr" | "cdnjs" | "unpkg", undefined>[], undefined>, undefined>;
}, undefined>;
export type NpmInput = RegistryScriptInput<typeof NpmOptions, true, true, false>;
export declare function useScriptNpm<T extends Record<string | symbol, any>>(_options: NpmInput): import("#nuxt-scripts/types").UseScriptContext<T>;
