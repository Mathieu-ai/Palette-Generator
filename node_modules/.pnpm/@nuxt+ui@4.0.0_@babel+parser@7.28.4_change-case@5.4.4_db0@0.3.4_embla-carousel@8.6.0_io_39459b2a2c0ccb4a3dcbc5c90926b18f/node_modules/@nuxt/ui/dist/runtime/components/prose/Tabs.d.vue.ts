export interface ProseTabsProps {
    /**
     * The default tab to select.
     * @example '1'
     */
    defaultValue?: string;
    /**
     * Sync the selected tab with a local storage key.
     */
    sync?: string;
    /**
     * The hash to scroll to when the tab is selected.
     */
    hash?: string;
    class?: any;
}
export interface ProseTabsSlots {
    default(props?: {}): any;
}
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<ProseTabsProps & {
    modelValue?: string;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | undefined) => any;
}, string, import("vue").PublicProps, Readonly<ProseTabsProps & {
    modelValue?: string;
}> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | undefined) => any) | undefined;
}>, {
    defaultValue: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, ProseTabsSlots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
