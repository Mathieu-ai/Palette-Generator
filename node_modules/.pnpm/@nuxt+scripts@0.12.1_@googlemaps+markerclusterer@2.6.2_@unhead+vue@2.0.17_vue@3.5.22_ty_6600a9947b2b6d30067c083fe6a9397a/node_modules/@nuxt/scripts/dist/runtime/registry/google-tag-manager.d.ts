import type { GTag } from './google-analytics.js';
import type { NuxtUseScriptOptions, RegistryScriptInput, UseFunctionType, UseScriptContext } from '#nuxt-scripts/types';
/**
 * Improved DataLayer type that better reflects GTM's capabilities
 * Can contain either gtag event parameters or custom data objects
 */
export type DataLayerItem = Parameters<GTag> | Record<string, unknown>;
export type DataLayer = Array<DataLayerItem>;
/**
 * DataLayer push function type
 */
export interface DataLayerPush {
    (...args: Parameters<GTag>): void;
    (obj: Record<string, unknown>): void;
}
/**
 * Improved DataLayer API type with more precise methods
 */
export interface GoogleTagManagerDataLayerApi {
    name: string;
    push: DataLayerPush;
    set: (config: Record<string, unknown>) => void;
    get: <T = unknown>(key: string) => T;
    reset: () => void;
    listeners: Array<() => void>;
}
/**
 * DataLayer status information
 */
export interface GoogleTagManagerDataLayerStatus {
    dataLayer: {
        gtmDom: boolean;
        gtmLoad: boolean;
        subscribers: number;
        [key: string]: unknown;
    };
}
/**
 * Container instance type
 */
export interface GoogleTagManagerContainer {
    callback: () => void;
    dataLayer: GoogleTagManagerDataLayerApi;
    state: Record<string, unknown>;
}
/**
 * Complete GTM instance object
 */
export interface GoogleTagManagerInstance extends GoogleTagManagerDataLayerStatus {
    [containerId: string]: GoogleTagManagerContainer | any;
}
/**
 * Complete Google Tag Manager API accessible via window
 */
export interface GoogleTagManagerApi {
    google_tag_manager: GoogleTagManagerInstance;
    dataLayer: DataLayer & {
        push: DataLayerPush;
    };
}
/**
 * Enhanced window type with GTM
 */
declare global {
    interface Window extends GoogleTagManagerApi {
    }
}
/**
 * GTM configuration options with improved documentation
 */
export declare const GoogleTagManagerOptions: import("valibot").ObjectSchema<{
    /** GTM container ID (format: GTM-XXXXXX) */
    readonly id: import("valibot").StringSchema<undefined>;
    /** Optional dataLayer variable name */
    readonly l: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    /** Authentication token for environment-specific container versions */
    readonly auth: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    /** Preview environment name */
    readonly preview: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    /** Forces GTM cookies to take precedence when true */
    readonly cookiesWin: import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").BooleanSchema<undefined>, import("valibot").LiteralSchema<"x", undefined>], undefined>, undefined>;
    /** Enables debug mode when true */
    readonly debug: import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").BooleanSchema<undefined>, import("valibot").LiteralSchema<"x", undefined>], undefined>, undefined>;
    /** No Personal Advertising - disables advertising features when true */
    readonly npa: import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").BooleanSchema<undefined>, import("valibot").LiteralSchema<"1", undefined>], undefined>, undefined>;
    /** Custom dataLayer name (alternative to "l" property) */
    readonly dataLayer: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    /** Environment name for environment-specific container */
    readonly envName: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    /** Referrer policy for analytics requests */
    readonly authReferrerPolicy: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
}, undefined>;
export type GoogleTagManagerInput = RegistryScriptInput<typeof GoogleTagManagerOptions>;
/**
 * Hook to use Google Tag Manager in Nuxt applications
 */
export declare function useScriptGoogleTagManager<T extends GoogleTagManagerApi>(options?: GoogleTagManagerInput & {
    /**
     * Optional callback that runs before GTM starts
     * Allows for custom initialization or configuration
     */
    onBeforeGtmStart?: (gtag: DataLayerPush) => void;
}): UseScriptContext<UseFunctionType<NuxtUseScriptOptions<T>, T>>;
