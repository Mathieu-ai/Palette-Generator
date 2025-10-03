import type { FlatConfigComposer } from "../node_modules/.pnpm/eslint-flat-config-utils@2.1.4/node_modules/eslint-flat-config-utils/dist/index.mjs"
import { defineFlatConfigs } from "../node_modules/.pnpm/@nuxt+eslint-config@1.9.0_@typescript-eslint+utils@8.45.0_eslint@9.36.0_jiti@2.6.1__typ_e780031e07953cd2a81042f86ac817d8/node_modules/@nuxt/eslint-config/dist/flat.mjs"
import type { NuxtESLintConfigOptionsResolved } from "../node_modules/.pnpm/@nuxt+eslint-config@1.9.0_@typescript-eslint+utils@8.45.0_eslint@9.36.0_jiti@2.6.1__typ_e780031e07953cd2a81042f86ac817d8/node_modules/@nuxt/eslint-config/dist/flat.mjs"

declare const configs: FlatConfigComposer
declare const options: NuxtESLintConfigOptionsResolved
declare const withNuxt: typeof defineFlatConfigs
export default withNuxt
export { withNuxt, defineFlatConfigs, configs, options }