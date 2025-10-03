import { RuntimeConfig as UserRuntimeConfig, PublicRuntimeConfig as UserPublicRuntimeConfig } from 'nuxt/schema'
  interface SharedRuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   nitro: {
      envPrefix: string,
   },

   "nuxt-scripts": {
      version: string,
   },

   icon: {
      serverKnownCssClasses: Array<any>,
   },
  }
  interface SharedPublicRuntimeConfig {
   "nuxt-scripts": {
      version: any,

      defaultScriptOptions: {
         trigger: string,
      },
   },

   i18n: {
      baseUrl: string,

      defaultLocale: string,

      rootRedirect: any,

      redirectStatusCode: number,

      skipSettingLocaleOnNavigate: boolean,

      locales: Array<{

      }>,

      detectBrowserLanguage: {
         alwaysRedirect: boolean,

         cookieCrossOrigin: boolean,

         cookieDomain: any,

         cookieKey: string,

         cookieSecure: boolean,

         fallbackLocale: string,

         redirectOn: string,

         useCookie: boolean,
      },

      experimental: {
         localeDetector: string,

         typedPages: boolean,

         typedOptionsAndMessages: boolean,

         alternateLinkCanonicalQueries: boolean,

         devCache: boolean,

         cacheLifetime: any,

         stripMessagesPayload: boolean,

         preload: boolean,

         strictSeo: boolean,

         nitroContextDetection: boolean,
      },

      domainLocales: {
         en: {
            domain: string,
         },

         fr: {
            domain: string,
         },

         es: {
            domain: string,
         },

         de: {
            domain: string,
         },

         nl: {
            domain: string,
         },

         pt: {
            domain: string,
         },

         it: {
            domain: string,
         },

         ru: {
            domain: string,
         },

         pl: {
            domain: string,
         },

         cs: {
            domain: string,
         },

         sv: {
            domain: string,
         },

         no: {
            domain: string,
         },

         fi: {
            domain: string,
         },

         el: {
            domain: string,
         },

         tr: {
            domain: string,
         },

         ro: {
            domain: string,
         },

         vi: {
            domain: string,
         },

         ja: {
            domain: string,
         },

         "zh-cn": {
            domain: string,
         },

         "zh-tw": {
            domain: string,
         },

         "zh-hk": {
            domain: string,
         },

         bn: {
            domain: string,
         },

         hi: {
            domain: string,
         },

         ur: {
            domain: string,
         },

         ar: {
            domain: string,
         },

         am: {
            domain: string,
         },

         az: {
            domain: string,
         },

         gu: {
            domain: string,
         },

         or: {
            domain: string,
         },

         pa: {
            domain: string,
         },

         pn: {
            domain: string,
         },

         ml: {
            domain: string,
         },

         mr: {
            domain: string,
         },

         mk: {
            domain: string,
         },

         uz: {
            domain: string,
         },

         plk: {
            domain: string,
         },

         ps: {
            domain: string,
         },

         ky: {
            domain: string,
         },

         sw: {
            domain: string,
         },

         fa: {
            domain: string,
         },

         azb: {
            domain: string,
         },

         "pt-br": {
            domain: string,
         },
      },
   },
  }
declare module '@nuxt/schema' {
  interface RuntimeConfig extends UserRuntimeConfig {}
  interface PublicRuntimeConfig extends UserPublicRuntimeConfig {}
}
declare module 'nuxt/schema' {
  interface RuntimeConfig extends SharedRuntimeConfig {}
  interface PublicRuntimeConfig extends SharedPublicRuntimeConfig {}
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: UserRuntimeConfig
        }
      }