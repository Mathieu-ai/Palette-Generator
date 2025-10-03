import type { UseScriptContext } from '@unhead/vue';
import type { MaybePromise } from '../utils.js';
import type { RegistryScriptInput } from '#nuxt-scripts/types';
export interface YouTubePlayerApi {
    YT: MaybePromise<{
        Player: YT.Player;
        PlayerState: YT.PlayerState;
        get(k: string): any;
        loaded: 0 | 1;
        loading: 0 | 1;
        ready(f: () => void): void;
        scan(): void;
        setConfig(config: YT.PlayerOptions): void;
        subscribe<EventName extends keyof YT.Events>(event: EventName, listener: YT.Events[EventName], context?: any): void;
        unsubscribe<EventName extends keyof YT.Events>(event: EventName, listener: YT.Events[EventName], context?: any): void;
    }>;
}
declare global {
    interface Window extends YouTubePlayerApi {
        onYouTubeIframeAPIReady: () => void;
    }
}
export type YouTubePlayerInput = RegistryScriptInput;
export declare function useScriptYouTubePlayer<T extends YouTubePlayerApi>(_options: YouTubePlayerInput): UseScriptContext<T>;
