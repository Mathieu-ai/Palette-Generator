import type { TrackedPage } from '#nuxt-scripts/types';
export declare function useScriptEventPage(onChange?: (payload: TrackedPage) => void): import("vue").Ref<{
    title?: string | undefined;
    path: string;
}, TrackedPage | {
    title?: string | undefined;
    path: string;
}>;
