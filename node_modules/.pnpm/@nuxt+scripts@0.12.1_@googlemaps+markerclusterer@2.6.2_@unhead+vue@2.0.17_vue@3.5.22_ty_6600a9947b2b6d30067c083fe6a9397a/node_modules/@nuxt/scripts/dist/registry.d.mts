import { ResolvePathOptions } from '@nuxt/kit';
import { RegistryScript } from '../dist/runtime/types.js';

declare function registry(resolve?: (path: string, opts?: ResolvePathOptions | undefined) => Promise<string>): Promise<RegistryScript[]>;

export { registry };
