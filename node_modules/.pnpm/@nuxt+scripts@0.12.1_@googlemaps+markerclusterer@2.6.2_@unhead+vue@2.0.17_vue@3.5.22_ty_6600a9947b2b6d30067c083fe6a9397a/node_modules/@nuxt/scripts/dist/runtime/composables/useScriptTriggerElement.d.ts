import type { MaybeComputedElementRef, MaybeElement } from '@vueuse/core';
import type { ElementScriptTrigger } from '../types.js';
export interface ElementScriptTriggerOptions {
    /**
     * The event to trigger the script load.
     */
    trigger?: ElementScriptTrigger | undefined;
    /**
     * The element to watch for the trigger event.
     * @default document.body
     */
    el?: MaybeComputedElementRef<MaybeElement>;
}
/**
 * Create a trigger for an element to load a script based on specific element events.
 */
export declare function useScriptTriggerElement(options: ElementScriptTriggerOptions): Promise<boolean> & {
    ssrAttrs?: Record<string, string>;
} | 'onNuxtReady';
