import type { InferInput } from '#nuxt-scripts-validator';
import type { RegistryScriptInput } from '#nuxt-scripts/types';
export declare const IntercomOptions: import("valibot").ObjectSchema<{
    readonly app_id: import("valibot").StringSchema<undefined>;
    readonly api_base: import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"https://api-iam.intercom.io", undefined>, import("valibot").LiteralSchema<"https://api-iam.eu.intercom.io", undefined>, import("valibot").LiteralSchema<"https://api-iam.au.intercom.io", undefined>], undefined>, undefined>;
    readonly name: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly email: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly user_id: import("valibot").OptionalSchema<import("valibot").StringSchema<undefined>, undefined>;
    readonly alignment: import("valibot").OptionalSchema<import("valibot").UnionSchema<[import("valibot").LiteralSchema<"left", undefined>, import("valibot").LiteralSchema<"right", undefined>], undefined>, undefined>;
    readonly horizontal_padding: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
    readonly vertical_padding: import("valibot").OptionalSchema<import("valibot").NumberSchema<undefined>, undefined>;
}, undefined>;
export type IntercomInput = RegistryScriptInput<typeof IntercomOptions, true, false, false>;
export interface IntercomApi {
    Intercom: ((event: 'boot', data?: InferInput<typeof IntercomOptions>) => void) & ((event: 'shutdown') => void) & ((event: 'update', options?: InferInput<typeof IntercomOptions>) => void) & ((event: 'hide') => void) & ((event: 'show') => void) & ((event: 'showSpace', spaceName: 'home' | 'messages' | 'help' | 'news' | 'tasks' | 'tickets' | string) => void) & ((event: 'showMessages') => void) & ((event: 'showNewMessage', content?: string) => void) & ((event: 'onHide', fn: () => void) => void) & ((event: 'onShow', fn: () => void) => void) & ((event: 'onUnreadCountChange', fn: () => void) => void) & ((event: 'trackEvent', eventName: string, metadata?: Record<string, any>) => void) & ((event: 'getVisitorId') => Promise<string>) & ((event: 'startTour', tourId: string | number) => void) & ((event: 'showArticle', articleId: string | number) => void) & ((event: 'showNews', newsItemId: string | number) => void) & ((event: 'startSurvey', surveyId: string | number) => void) & ((event: 'startChecklist', checklistId: string | number) => void) & ((event: 'showTicket', ticketId: string | number) => void) & ((event: 'showConversation', conversationId: string | number) => void) & ((event: 'onUserEmailSupplied', fn: () => void) => void) & ((event: string, ...params: any[]) => void);
}
declare global {
    interface Window extends IntercomApi {
        intercomSettings?: any;
    }
}
export declare function useScriptIntercom<T extends IntercomApi>(_options?: IntercomInput): import("#nuxt-scripts/types").UseScriptContext<T>;
