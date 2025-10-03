<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import { useScriptTriggerElement } from "../composables/useScriptTriggerElement";
import { useScriptCrisp } from "../registry/crisp";
const props = defineProps({
  trigger: { type: [String, Array, Boolean], required: false, default: "click" },
  id: { type: String, required: true },
  runtimeConfig: { type: Object, required: false },
  tokenId: { type: String, required: false },
  cookieDomain: { type: String, required: false },
  cookieExpiry: { type: Number, required: false }
});
const emits = defineEmits(["ready", "error"]);
const rootEl = ref(null);
const trigger = useScriptTriggerElement({ trigger: props.trigger, el: rootEl });
const isReady = ref(false);
const crisp = useScriptCrisp({
  id: props.id,
  runtimeConfig: props.runtimeConfig,
  tokenId: props.tokenId,
  cookieDomain: props.cookieDomain,
  cookieExpiry: props.cookieExpiry,
  scriptOptions: {
    trigger
  }
});
const { onLoaded, status } = crisp;
if (props.trigger === "click") {
  onLoaded((instance) => {
    instance.do("chat:open");
  });
}
defineExpose({
  crisp
});
let observer;
onMounted(() => {
  watch(status, (status2) => {
    if (status2 === "loaded") {
      observer = new MutationObserver(() => {
        if (document.getElementById("crisp-chatbox")) {
          isReady.value = true;
          emits("ready", crisp);
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    } else if (status2 === "error") {
      emits("error");
    }
  });
});
onBeforeUnmount(() => {
  observer?.disconnect();
});
const rootAttrs = computed(() => {
  return {
    ...trigger instanceof Promise ? trigger.ssrAttrs || {} : {}
  };
});
</script>

<template>
  <div
    ref="rootEl"
    :style="{ display: isReady ? 'none' : 'block' }"
    v-bind="rootAttrs"
  >
    <slot :ready="isReady" />
    <slot v-if="status === 'awaitingLoad'" name="awaitingLoad" />
    <slot v-else-if="status === 'loading' || !isReady" name="loading" />
    <slot v-else-if="status === 'error'" name="error" />
  </div>
</template>
