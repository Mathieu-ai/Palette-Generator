export interface InteractionScriptTriggerOptions {
    /**
     * The interaction events to listen for.
     */
    events: string[];
    /**
     * The element to listen for events on.
     * @default document.documentElement
     */
    target?: EventTarget | null;
}
/**
 * Create a trigger that loads a script when any of the specified interaction events occur.
 */
export declare function useScriptTriggerInteraction(options: InteractionScriptTriggerOptions): Promise<boolean>;
