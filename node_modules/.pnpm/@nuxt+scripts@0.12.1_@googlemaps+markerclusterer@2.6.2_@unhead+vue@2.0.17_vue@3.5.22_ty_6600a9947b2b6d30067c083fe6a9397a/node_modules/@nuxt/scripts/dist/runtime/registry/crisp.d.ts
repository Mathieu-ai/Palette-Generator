import type { RegistryScriptInput } from '#nuxt-scripts/types';
export declare const CrispOptions: import("valibot").ObjectSchema<{
    /**
     * The Crisp ID.
     */
    readonly id: import("valibot").StringSchema<undefined>;
    /**
     * Extra configuration options. Used to configure the locale.
     * Same as CRISP_RUNTIME_CONFIG.
     * @see https://docs.crisp.chat/guides/chatbox-sdks/web-sdk/language-customization/
     */
    readonly runtimeConfig: import("valibot").OptionalSchema<import("valibot").ObjectSchema<{
        readonly locale: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    }, undefined>, undefined>;
    /**
     * Associated a session, equivalent to using CRISP_TOKEN_ID variable.
     * Same as CRISP_TOKEN_ID.
     * @see https://docs.crisp.chat/guides/chatbox-sdks/web-sdk/session-continuity/
     */
    readonly tokenId: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    /**
     * Restrict the domain that the Crisp cookie is set on.
     * Same as CRISP_COOKIE_DOMAIN.
     * @see https://docs.crisp.chat/guides/chatbox-sdks/web-sdk/cookie-policies/
     */
    readonly cookieDomain: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    /**
     * The cookie expiry in seconds.
     * Same as CRISP_COOKIE_EXPIRATION.
     * @see https://docs.crisp.chat/guides/chatbox-sdks/web-sdk/cookie-policies/#change-cookie-expiration-date
     */
    readonly cookieExpiry: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
}, undefined>;
export type CrispInput = RegistryScriptInput<typeof CrispOptions, false, false, false>;
export interface CrispApi {
    push: (...args: any[]) => void;
    is: (name: 'chat:opened' | 'chat:closed' | 'chat:visible' | 'chat:hidden' | 'chat:small' | 'chat:large' | 'session:ongoing' | 'website:available' | 'overlay:opened' | 'overlay:closed' | string) => boolean;
    set: (name: 'message:text' | 'session:data' | 'session:segments' | 'session:event' | 'user:email' | 'user:phone' | 'user:nickname' | 'user:avatar' | 'user:company' | string, value: any) => void;
    get: (name: 'chat:unread:count' | 'message:text' | 'session:identifier' | 'session:data' | 'user:email' | 'user:phone' | 'user:nickname' | 'user:avatar' | 'user:company' | string) => any;
    do: (name: 'chat:open' | 'chat:close' | 'chat:toggle' | 'chat:show' | 'chat:hide' | 'helpdesk:search' | 'helpdesk:article:open' | 'helpdesk:query' | 'overlay:open' | 'overlay:close' | 'message:send' | 'message:show' | 'message:read' | 'message:thread:start' | 'message:thread:end' | 'session:reset' | 'trigger:run' | string, arg2?: any) => any;
    on: (name: 'session:loaded' | 'chat:initiated' | 'chat:opened' | 'chat:closed' | 'message:sent' | 'message:received' | 'message:compose:sent' | 'message:compose:received' | 'user:email:changed' | 'user:phone:changed' | 'user:nickname:changed' | 'user:avatar:changed' | 'website:availability:changed' | 'helpdesk:queried' | string, callback: (...args: any[]) => any) => void;
    off: (name: 'session:loaded' | 'chat:initiated' | 'chat:opened' | 'chat:closed' | 'message:sent' | 'message:received' | 'message:compose:sent' | 'message:compose:received' | 'user:email:changed' | 'user:phone:changed' | 'user:nickname:changed' | 'user:avatar:changed' | 'website:availability:changed' | 'helpdesk:queried' | string, callback: (...args: any[]) => any) => void;
    config: (options: any) => void;
    help: () => void;
    [key: string]: any;
}
declare global {
    interface Window {
        CRISP_READY_TRIGGER: () => void;
        CRISP_WEBSITE_ID: string;
        CRISP_RUNTIME_CONFIG?: {
            locale?: string;
        };
        CRISP_COOKIE_DOMAIN?: string;
        CRISP_COOKIE_EXPIRATION?: number;
        CRISP_TOKEN_ID?: string;
        $crisp: CrispApi;
    }
}
export declare function useScriptCrisp<T extends CrispApi>(_options?: CrispInput): import("#nuxt-scripts/types").UseScriptContext<T>;
