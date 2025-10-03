<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { callOnce } from "nuxt/app";
import { useScriptTriggerElement } from "../composables/useScriptTriggerElement";
import { useScriptGoogleAdsense } from "../registry/google-adsense";
import { scriptRuntimeConfig } from "../utils";
const props = defineProps({
  dataAdClient: { type: String, required: true },
  dataAdSlot: { type: String, required: true },
  dataAdFormat: { type: String, required: false, default: void 0 },
  dataAdLayout: { type: String, required: false },
  dataFullWidthResponsive: { type: Boolean, required: false, default: true },
  trigger: { type: [String, Array, Boolean], required: false }
});
const emits = defineEmits(["ready", "error"]);
const rootEl = ref(null);
const trigger = useScriptTriggerElement({ trigger: props.trigger, el: rootEl });
const scriptConfig = scriptRuntimeConfig("googleAdsense");
const addClient = computed(() => {
  return props.dataAdClient || scriptConfig?.client;
});
const instance = useScriptGoogleAdsense({
  client: addClient.value,
  scriptOptions: {
    trigger
  }
});
const { status } = instance;
function pushAdSlot() {
  (window.adsbygoogle = window.adsbygoogle || []).push({});
}
onMounted(() => {
  if (import.meta.dev) {
    callOnce(() => pushAdSlot());
  } else {
    pushAdSlot();
  }
  watch(status, (val) => {
    if (val === "loaded") {
      emits("ready", instance);
    } else if (val === "error") {
      emits("error");
    }
  });
});
const rootAttrs = computed(() => {
  return {
    ...trigger instanceof Promise ? trigger.ssrAttrs || {} : {}
  };
});
</script>

<template>
  <div>
    <ins
      ref="rootEl"
      class="adsbygoogle"
      style="display: block;"
      :data-ad-client="addClient"
      :data-ad-slot="dataAdSlot"
      :data-ad-format="dataAdFormat"
      :data-ad-layout="dataAdLayout"
      :data-full-width-responsive="dataFullWidthResponsive"
      v-bind="rootAttrs"
    />
    <slot v-if="status === 'awaitingLoad'" name="awaitingLoad" />
    <slot v-else-if="status === 'loading'" name="loading" />
    <slot v-else-if="status === 'error'" name="error" />
  </div>
</template>
