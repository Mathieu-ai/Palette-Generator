import type { InferInput } from '#nuxt-scripts-validator';
import type { RegistryScriptInput } from '#nuxt-scripts/types';
type StandardEvents = 'PAGE_VIEW' | 'VIEW_CONTENT' | 'ADD_CART' | 'SIGN_UP' | 'SAVE' | 'START_CHECKOUT' | 'APP_OPEN' | 'ADD_BILLING' | 'SEARCH' | 'SUBSCRIBE' | 'AD_CLICK' | 'AD_VIEW' | 'COMPLETE_TUTORIAL' | 'LEVEL_COMPLETE' | 'INVITE' | 'LOGIN' | 'SHARE' | 'RESERVE' | 'ACHIEVEMENT_UNLOCKED' | 'ADD_TO_WISHLIST' | 'SPENT_CREDITS' | 'RATE' | 'START_TRIAL' | 'LIST_VIEW';
interface EventObjectProperties {
    price?: number;
    client_dedup_id?: string;
    currency?: string;
    transaction_id?: string;
    item_ids?: string[];
    item_category?: string;
    description?: string;
    search_string?: string;
    number_items?: number;
    payment_info_available?: 0 | 1;
    sign_up_method?: string;
    success?: 0 | 1;
    brands?: string[];
    delivery_method?: 'in_store' | 'curbside' | 'delivery';
    customer_status?: 'new' | 'returning' | 'reactivated';
    event_tag?: string;
    [key: string]: any;
}
export declare const InitObjectPropertiesSchema: import("valibot").ObjectSchema<{
    readonly user_email: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly ip_address: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly user_phone_number: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly user_hashed_email: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly user_hashed_phone_number: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly firstname: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly lastname: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly geo_city: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly geo_region: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly geo_postal_code: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly geo_country: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly age: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
}, undefined>;
type InitObjectProperties = InferInput<typeof InitObjectPropertiesSchema>;
type SnapTrFns = ((event: 'track', eventName: StandardEvents | '', data?: EventObjectProperties) => void) & ((event: 'init', id: string, data?: Record<string, any>) => void) & ((event: 'init', id: string, data?: InitObjectProperties) => void) & ((event: string, ...params: any[]) => void);
export interface SnapPixelApi {
    snaptr: SnapTrFns & {
        push: SnapTrFns;
        loaded: boolean;
        version: string;
        queue: any[];
    };
    _snaptr: SnapPixelApi['snaptr'];
    handleRequest?: SnapTrFns;
}
declare global {
    interface Window extends SnapPixelApi {
    }
}
export declare const SnapTrPixelOptions: import("valibot").ObjectSchema<{
    readonly user_email: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly ip_address: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly user_phone_number: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly user_hashed_email: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly user_hashed_phone_number: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly firstname: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly lastname: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly geo_city: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly geo_region: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly geo_postal_code: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly geo_country: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly age: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly id: import("valibot").StringSchema<undefined>;
    readonly trackPageView: import("valibot").OptionalSchema<import("valibot").BooleanSchema<undefined>, undefined>;
}, undefined>;
export type SnapTrPixelInput = RegistryScriptInput<typeof SnapTrPixelOptions, true, false, false>;
export declare function useScriptSnapchatPixel<T extends SnapPixelApi>(_options?: SnapTrPixelInput): import("#nuxt-scripts/types").UseScriptContext<T>;
export {};
