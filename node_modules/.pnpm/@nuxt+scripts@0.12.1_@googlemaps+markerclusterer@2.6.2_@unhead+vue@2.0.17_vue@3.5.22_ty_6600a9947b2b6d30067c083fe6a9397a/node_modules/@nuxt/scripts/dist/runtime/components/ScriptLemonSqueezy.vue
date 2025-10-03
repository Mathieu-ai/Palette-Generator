<script setup>
import { computed, onMounted, ref } from "vue";
import { useScriptTriggerElement } from "../composables/useScriptTriggerElement";
import { useScriptLemonSqueezy } from "../registry/lemon-squeezy";
const props = defineProps({
  trigger: { type: [String, Array, Boolean], required: false, default: "visible" }
});
const emits = defineEmits(["ready", "lemonSqueezyEvent"]);
const rootEl = ref(null);
const trigger = useScriptTriggerElement({ trigger: props.trigger, el: rootEl });
const instance = useScriptLemonSqueezy({
  scriptOptions: {
    trigger
  }
});
onMounted(() => {
  rootEl.value?.querySelectorAll("a[href]").forEach((a) => {
    a.classList.add("lemonsqueezy-button");
  });
  instance.onLoaded(({ Setup, Refresh }) => {
    Setup({
      eventHandler(event) {
        emits("lemonSqueezyEvent", event);
      }
    });
    Refresh();
    emits("ready", instance);
  });
});
const rootAttrs = computed(() => {
  return {
    ...trigger instanceof Promise ? trigger.ssrAttrs || {} : {}
  };
});
</script>

<template>
  <div ref="rootEl" v-bind="rootAttrs">
    <slot />
  </div>
</template>
