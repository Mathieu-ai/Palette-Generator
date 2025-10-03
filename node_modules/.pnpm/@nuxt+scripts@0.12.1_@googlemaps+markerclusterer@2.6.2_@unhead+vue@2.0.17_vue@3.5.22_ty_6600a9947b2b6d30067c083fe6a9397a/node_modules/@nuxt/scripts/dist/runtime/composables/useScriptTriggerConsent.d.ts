import type { ConsentScriptTriggerOptions } from '../types.js';
interface UseConsentScriptTriggerApi extends Promise<void> {
    /**
     * A function that can be called to accept the consent and load the script.
     */
    accept: () => void;
}
/**
 * Load a script once consent has been provided either through a resolvable `consent` or calling the `accept` method.
 * @param options
 */
export declare function useScriptTriggerConsent(options?: ConsentScriptTriggerOptions): UseConsentScriptTriggerApi;
export {};
