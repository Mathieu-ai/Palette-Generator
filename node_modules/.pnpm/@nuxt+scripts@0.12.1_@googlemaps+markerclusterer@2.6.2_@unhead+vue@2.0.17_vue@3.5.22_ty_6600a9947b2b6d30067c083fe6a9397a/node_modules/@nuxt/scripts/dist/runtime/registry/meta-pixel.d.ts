import type { RegistryScriptInput } from '#nuxt-scripts/types';
type StandardEvents = 'AddPaymentInfo' | 'AddToCart' | 'AddToWishlist' | 'CompleteRegistration' | 'Contact' | 'CustomizeProduct' | 'Donate' | 'FindLocation' | 'InitiateCheckout' | 'Lead' | 'Purchase' | 'Schedule' | 'Search' | 'StartTrial' | 'SubmitApplication' | 'Subscribe' | 'ViewContent';
interface EventObjectProperties {
    content_category?: string;
    content_ids?: string[];
    content_name?: string;
    content_type?: string;
    contents?: {
        id: string;
        quantity: number;
    }[];
    currency?: string;
    delivery_category?: 'in_store' | 'curbside' | 'home_delivery';
    num_items?: number;
    predicted_ltv?: number;
    search_string?: string;
    status?: 'completed' | 'updated' | 'viewed' | 'added_to_cart' | 'removed_from_cart' | string;
    value?: number;
    [key: string]: any;
}
type ConsentAction = 'grant' | 'revoke';
type FbqArgs = ['track', StandardEvents, EventObjectProperties?] | ['trackCustom', string, EventObjectProperties?] | ['trackSingle', string, StandardEvents, EventObjectProperties?] | ['trackSingleCustom', string, string, EventObjectProperties?] | ['init', string] | ['init', number, Record<string, any>?] | ['consent', ConsentAction] | [string, ...any[]];
type FbqFns = (...args: FbqArgs) => void;
export interface MetaPixelApi {
    fbq: FbqFns & {
        push: FbqFns;
        loaded: boolean;
        version: string;
        queue: any[];
    };
    _fbq: MetaPixelApi['fbq'];
    callMethod?: FbqFns;
}
declare global {
    interface Window extends MetaPixelApi {
    }
}
export declare const MetaPixelOptions: import("valibot").ObjectSchema<{
    readonly id: import("valibot").UnionSchema<[import("valibot").StringSchema<undefined>, import("valibot").NumberSchema<undefined>], undefined>;
}, undefined>;
export type MetaPixelInput = RegistryScriptInput<typeof MetaPixelOptions, true, false, false>;
export declare function useScriptMetaPixel<T extends MetaPixelApi>(_options?: MetaPixelInput): import("#nuxt-scripts/types").UseScriptContext<T>;
export {};
