
declare module '#app' {
  interface NuxtApp {
    $scripts: Record<string, (import('#nuxt-scripts/types').UseScriptContext<any>)>
    _scripts: Record<string, (import('#nuxt-scripts/types').UseScriptContext<any>)>
  }
  interface RuntimeNuxtHooks {
    'scripts:updated': (ctx: { scripts: Record<string, (import('#nuxt-scripts/types').UseScriptContext<any>)> }) => void | Promise<void>
  }
}

export {}