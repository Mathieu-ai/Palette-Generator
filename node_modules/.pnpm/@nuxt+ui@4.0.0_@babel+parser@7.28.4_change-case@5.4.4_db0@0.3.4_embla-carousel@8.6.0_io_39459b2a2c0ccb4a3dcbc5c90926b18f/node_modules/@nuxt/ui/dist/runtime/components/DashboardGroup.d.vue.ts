import type { UseResizableProps } from '../composables/useResizable';
export interface DashboardGroupProps extends Pick<UseResizableProps, 'storage' | 'storageKey' | 'persistent' | 'unit'> {
    /**
     * The element or component this component should render as.
     * @defaultValue 'div'
     */
    as?: any;
    class?: any;
}
export interface DashboardGroupSlots {
    default(props?: {}): any;
}
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<DashboardGroupProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<DashboardGroupProps> & Readonly<{}>, {
    storage: "cookie" | "local";
    storageKey: string;
    persistent: boolean;
    unit: "%" | "rem" | "px";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, DashboardGroupSlots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
