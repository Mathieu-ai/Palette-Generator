<script setup>
import { ref, onMounted, watch, onBeforeUnmount, computed } from "vue";
import { useScriptIntercom } from "../registry/intercom";
import { useScriptTriggerElement } from "../composables/useScriptTriggerElement";
const props = defineProps({
  appId: { type: String, required: true },
  apiBase: { type: String, required: false },
  name: { type: String, required: false },
  email: { type: String, required: false },
  userId: { type: String, required: false },
  alignment: { type: String, required: false },
  horizontalPadding: { type: Number, required: false },
  verticalPadding: { type: Number, required: false },
  trigger: { type: [String, Array, Boolean], required: false, default: "click" }
});
const emits = defineEmits(["ready", "error"]);
const rootEl = ref(null);
const trigger = useScriptTriggerElement({ trigger: props.trigger, el: rootEl });
const isReady = ref(false);
const intercom = useScriptIntercom({
  app_id: props.appId,
  // @ts-expect-error untyped
  app_base: props.apiBase,
  name: props.name,
  email: props.email,
  user_id: props.userId,
  alignment: props.alignment,
  horizontal_padding: props.horizontalPadding,
  vertical_padding: props.verticalPadding,
  scriptOptions: {
    trigger
  }
});
const { status, onLoaded } = intercom;
if (props.trigger === "click") {
  onLoaded((instance) => {
    instance.Intercom("show");
  });
}
defineExpose({
  intercom
});
let observer;
onMounted(() => {
  watch(status, (status2) => {
    if (status2 === "loading") {
      observer = new MutationObserver(() => {
        if (document.getElementById("intercom-frame")) {
          isReady.value = true;
          emits("ready", intercom);
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    } else if (status2 === "error")
      emits("error");
  });
});
onBeforeUnmount(() => {
  observer?.disconnect();
});
const rootAttrs = computed(() => {
  return {
    style: {
      display: isReady.value ? "none" : "block",
      bottom: `${props.verticalPadding || 20}px`,
      [props.alignment || "right"]: `${props.horizontalPadding || 20}px`
    },
    ...trigger instanceof Promise ? trigger.ssrAttrs || {} : {}
  };
});
</script>

<template>
  <div
    ref="rootEl"
    v-bind="rootAttrs"
  >
    <slot :ready="isReady" />
    <slot v-if="status === 'awaitingLoad'" name="awaitingLoad" />
    <slot v-else-if="status === 'loading' || !isReady" name="loading" />
    <slot v-else-if="status === 'error'" name="error" />
  </div>
</template>
