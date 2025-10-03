export interface ProseAccordionProps {
    type?: 'single' | 'multiple';
    class?: any;
}
export interface ProseAccordionSlots {
    default(props?: {}): any;
}
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<ProseAccordionProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ProseAccordionProps> & Readonly<{}>, {
    type: "single" | "multiple";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, ProseAccordionSlots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
