import {
  useEventListener,
  useIntersectionObserver
} from "@vueuse/core";
import { tryOnScopeDispose, tryOnMounted } from "@vueuse/shared";
import { watch } from "vue";
function useElementVisibilityPromise(element) {
  let observer;
  return new Promise((resolve) => {
    observer = useIntersectionObserver(
      element,
      (intersectionObserverEntries) => {
        for (const entry of intersectionObserverEntries) {
          if (entry.isIntersecting)
            resolve(true);
        }
      },
      {
        rootMargin: "30px 0px 0px 0px",
        threshold: 0
      }
    );
    tryOnScopeDispose(() => resolve(false));
  }).finally(() => {
    observer.stop();
  });
}
export function useScriptTriggerElement(options) {
  const { el, trigger } = options;
  const triggers = (Array.isArray(options.trigger) ? options.trigger : [options.trigger]).filter(Boolean);
  if (!trigger || triggers.includes("immediate") || triggers.includes("onNuxtReady")) {
    return "onNuxtReady";
  }
  if (triggers.some((t) => ["visibility", "visible"].includes(t))) {
    if (import.meta.server || !el) {
      return new Promise(() => {
      });
    }
    return useElementVisibilityPromise(el);
  }
  const ssrAttrs = {};
  if (import.meta.server) {
    triggers.forEach((trigger2) => {
      ssrAttrs[`on${trigger2}`] = `this.dataset.script_${trigger2} = true`;
    });
  }
  const p = new Promise((resolve) => {
    const target = typeof el !== "undefined" ? el : document.body;
    const _ = useEventListener(
      target,
      triggers,
      () => {
        _();
        resolve(true);
      },
      { once: true, passive: true }
    );
    tryOnMounted(() => {
      watch(target, ($el) => {
        if ($el) {
          triggers.forEach((trigger2) => {
            if ($el.dataset[`script_${trigger2}`]) {
              _();
              resolve(true);
            }
          });
        }
      }, {
        immediate: true
      });
    });
    tryOnScopeDispose(() => resolve(false));
  });
  return Object.assign(p, { ssrAttrs });
}
