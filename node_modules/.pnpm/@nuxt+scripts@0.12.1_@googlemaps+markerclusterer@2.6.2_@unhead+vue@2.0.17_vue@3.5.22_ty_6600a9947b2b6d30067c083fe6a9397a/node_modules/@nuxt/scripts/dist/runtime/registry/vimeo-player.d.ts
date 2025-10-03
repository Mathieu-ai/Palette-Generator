import type Vimeo from '@vimeo/player';
import type { UseScriptContext } from '@unhead/vue';
import type { RegistryScriptInput } from '#nuxt-scripts/types';
type Constructor<T extends new (...args: any) => any> = T extends new (...args: infer A) => infer R ? new (...args: A) => R : never;
export interface VimeoPlayerApi {
    Vimeo: {
        Player: Constructor<typeof Vimeo>;
    };
}
export type VimeoPlayerInput = RegistryScriptInput;
declare global {
    interface Window extends VimeoPlayerApi {
    }
}
export declare function useScriptVimeoPlayer<T extends VimeoPlayerApi>(_options?: VimeoPlayerInput): UseScriptContext<T>;
export {};
