export interface IdleTimeoutScriptTriggerOptions {
    /**
     * The timeout in milliseconds to wait before loading the script.
     */
    timeout: number;
}
/**
 * Create a trigger that loads a script after an idle timeout once Nuxt is ready.
 */
export declare function useScriptTriggerIdleTimeout(options: IdleTimeoutScriptTriggerOptions): Promise<boolean>;
