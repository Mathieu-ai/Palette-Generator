import type { RegistryScriptInput } from '#nuxt-scripts/types';
interface ContentProperties {
    content_type?: string | null;
    content_id?: string | number | null;
    content_name?: string | null;
    content_price?: string | number | null;
    num_items?: string | number | null;
    content_group_id?: string | number | null;
}
interface EventObjectProperties {
    value?: string | number | null;
    currency?: string | null;
    conversion_id?: string | number | null;
    email_address?: string | null;
    phone_number?: string | null;
    contents: ContentProperties[];
}
type TwqFns = ((event: 'event', eventId: string, data?: EventObjectProperties) => void) & ((event: 'config', id: string) => void) & ((event: string, ...params: any[]) => void);
export interface XPixelApi {
    twq: TwqFns & {
        loaded: boolean;
        version: string;
        queue: any[];
    };
}
declare global {
    interface Window extends XPixelApi {
    }
}
export declare const XPixelOptions: import("valibot").ObjectSchema<{
    readonly id: import("valibot").StringSchema<undefined>;
    readonly version: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
}, undefined>;
export type XPixelInput = RegistryScriptInput<typeof XPixelOptions, true, false, false>;
export declare function useScriptXPixel<T extends XPixelApi>(_options?: XPixelInput): import("#nuxt-scripts/types").UseScriptContext<T>;
export {};
