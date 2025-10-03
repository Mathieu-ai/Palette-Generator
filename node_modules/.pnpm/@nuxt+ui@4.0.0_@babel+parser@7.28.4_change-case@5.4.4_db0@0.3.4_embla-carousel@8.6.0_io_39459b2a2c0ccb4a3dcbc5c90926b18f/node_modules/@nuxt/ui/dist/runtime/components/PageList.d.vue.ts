export interface PageListProps {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    divide?: boolean;
    class?: any;
}
export interface PageListSlots {
    default(props?: {}): any;
}
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<PageListProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<PageListProps> & Readonly<{}>, {
    divide: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, PageListSlots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
