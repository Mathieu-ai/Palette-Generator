import { isRef, ref, toValue, watch } from "vue";
import { tryUseNuxtApp, onNuxtReady, requestIdleCallback } from "nuxt/app";
export function useScriptTriggerConsent(options) {
  if (import.meta.server)
    return new Promise(() => {
    });
  const consented = ref(false);
  const nuxtApp = tryUseNuxtApp();
  const promise = new Promise((resolve) => {
    watch(consented, (ready) => {
      if (ready) {
        const runner = nuxtApp?.runWithContext || ((cb) => cb());
        if (options?.postConsentTrigger instanceof Promise) {
          options.postConsentTrigger.then(() => runner(resolve));
          return;
        }
        if (typeof options?.postConsentTrigger === "function") {
          if (options?.postConsentTrigger.length === 1) {
            options.postConsentTrigger(resolve);
            return;
          }
          const val = options.postConsentTrigger();
          if (val instanceof Promise) {
            return val.then(() => runner(resolve));
          }
          return;
        }
        if (options?.postConsentTrigger === "onNuxtReady") {
          const idleTimeout = options?.postConsentTrigger ? nuxtApp ? onNuxtReady : requestIdleCallback : (cb) => cb();
          runner(() => idleTimeout(resolve));
          return;
        }
        runner(resolve);
      }
    });
    if (options?.consent) {
      if (isRef(options?.consent)) {
        watch(options.consent, (_val) => {
          const val = toValue(_val);
          consented.value = Boolean(val);
        }, { immediate: true });
      } else if (typeof options?.consent === "boolean") {
        consented.value = options?.consent;
      } else if (options?.consent instanceof Promise) {
        options?.consent.then((res) => {
          consented.value = typeof res === "boolean" ? res : true;
        });
      }
    }
  });
  promise.accept = () => {
    consented.value = true;
  };
  return promise;
}
