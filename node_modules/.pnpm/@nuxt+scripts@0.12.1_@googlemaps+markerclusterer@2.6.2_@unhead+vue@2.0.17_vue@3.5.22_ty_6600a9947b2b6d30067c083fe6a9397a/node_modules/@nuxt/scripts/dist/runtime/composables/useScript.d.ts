import type { UseScriptInput } from '@unhead/vue/scripts';
import type { NuxtUseScriptOptions, UseFunctionType, UseScriptContext } from '../types.js';
export declare function resolveScriptKey(input: any): string;
export declare function useScript<T extends Record<symbol | string, any> = Record<symbol | string, any>>(input: UseScriptInput, options?: NuxtUseScriptOptions<T>): UseScriptContext<UseFunctionType<NuxtUseScriptOptions<T>, T>>;
