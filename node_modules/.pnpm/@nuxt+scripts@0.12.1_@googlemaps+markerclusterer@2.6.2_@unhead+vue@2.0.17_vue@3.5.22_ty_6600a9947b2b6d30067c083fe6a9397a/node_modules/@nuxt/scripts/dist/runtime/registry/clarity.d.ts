import type { RegistryScriptInput } from '#nuxt-scripts/types';
type ClarityFunctions = ((fn: 'start', options: {
    content: boolean;
    cookies: string[];
    dob: number;
    expire: number;
    projectId: string;
    upload: string;
}) => void) & ((fn: 'identify', id: string, session?: string, page?: string, userHint?: string) => Promise<{
    id: string;
    session: string;
    page: string;
    userHint: string;
}>) & ((fn: 'consent', enabled?: boolean) => void) & ((fn: 'set', key: any, value: any) => void) & ((fn: 'event', value: any) => void) & ((fn: 'upgrade', upgradeReason: any) => void) & ((fn: string, ...args: any[]) => void);
export interface ClarityApi {
    clarity: ClarityFunctions & {
        q: any[];
        v: string;
    };
}
declare global {
    interface Window extends ClarityApi {
    }
}
export declare const ClarityOptions: import("valibot").ObjectSchema<{
    /**
     * The Clarity token.
     */
    readonly id: import("valibot").SchemaWithPipe<readonly [import("valibot").StringSchema<undefined>, import("valibot").MinLengthAction<string, 10, undefined>]>;
}, undefined>;
export type ClarityInput = RegistryScriptInput<typeof ClarityOptions>;
export declare function useScriptClarity<T extends ClarityApi>(_options?: ClarityInput): import("#nuxt-scripts/types").UseScriptContext<T>;
export {};
