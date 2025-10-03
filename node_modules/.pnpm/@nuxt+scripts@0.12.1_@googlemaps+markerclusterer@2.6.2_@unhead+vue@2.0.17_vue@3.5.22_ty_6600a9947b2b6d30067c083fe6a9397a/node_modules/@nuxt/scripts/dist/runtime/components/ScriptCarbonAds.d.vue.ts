import type { ElementScriptTrigger } from '#nuxt-scripts/types';
type __VLS_Props = {
    serve: string;
    placement: string;
    format: string;
    /**
     * Defines the trigger event to load the script.
     */
    trigger?: ElementScriptTrigger;
};
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {};
type __VLS_Slots = {} & {
    awaitingLoad?: (props: typeof __VLS_1) => any;
} & {
    loading?: (props: typeof __VLS_3) => any;
} & {
    error?: (props: typeof __VLS_5) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (error: string | Event) => any;
    ready: (args_0: HTMLScriptElement) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onError?: ((error: string | Event) => any) | undefined;
    onReady?: ((args_0: HTMLScriptElement) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
