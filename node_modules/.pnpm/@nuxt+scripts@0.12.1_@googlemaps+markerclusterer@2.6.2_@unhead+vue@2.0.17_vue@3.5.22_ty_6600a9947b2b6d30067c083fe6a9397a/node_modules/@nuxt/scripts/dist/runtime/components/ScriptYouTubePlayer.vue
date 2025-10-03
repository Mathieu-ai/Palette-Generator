<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { defu } from "defu";
import { useHead } from "nuxt/app";
import { useScriptTriggerElement } from "../composables/useScriptTriggerElement";
import { useScriptYouTubePlayer } from "../registry/youtube-player";
import ScriptAriaLoadingIndicator from "./ScriptAriaLoadingIndicator.vue";
const props = defineProps({
  placeholderAttrs: { type: Object, required: false },
  rootAttrs: { type: Object, required: false },
  aboveTheFold: { type: Boolean, required: false },
  trigger: { type: [String, Array, Boolean], required: false, default: "mousedown" },
  videoId: { type: String, required: true },
  playerVars: { type: null, required: false, default: { autoplay: 0, playsinline: 1 } },
  width: { type: Number, required: false, default: 640 },
  height: { type: Number, required: false, default: 360 },
  cookies: { type: Boolean, required: false, default: false },
  playerOptions: { type: null, required: false },
  thumbnailSize: { type: String, required: false, default: "hq720" },
  webp: { type: Boolean, required: false, default: true }
});
const emits = defineEmits(["ready", "state-change", "playback-quality-change", "playback-rate-change", "error"]);
const events = [
  "onReady",
  "onStateChange",
  "onPlaybackQualityChange",
  "onPlaybackRateChange",
  "onError",
  "onApiChange"
];
const rootEl = ref();
const youtubeEl = ref();
const ready = ref(false);
const trigger = useScriptTriggerElement({ trigger: props.trigger, el: rootEl });
const script = useScriptYouTubePlayer({
  scriptOptions: {
    trigger
  }
});
const { onLoaded, status } = script;
const player = ref();
let clickTriggered = false;
if (props.trigger === "mousedown" && trigger instanceof Promise) {
  trigger.then((triggered) => {
    if (triggered) {
      clickTriggered = true;
    }
  });
}
onMounted(() => {
  onLoaded(async (instance) => {
    const YouTube = instance.YT instanceof Promise ? await instance.YT : instance.YT;
    await new Promise((resolve) => {
      if (typeof YT.Player === "undefined")
        YouTube.ready(resolve);
      else
        resolve();
    });
    player.value = new YT.Player(youtubeEl.value, {
      host: !props.cookies ? "https://www.youtube-nocookie.com" : "https://www.youtube.com",
      ...props,
      ...props.playerOptions,
      events: Object.fromEntries(events.map((event) => [event, (e) => {
        const emitEventName = event.replace(/([A-Z])/g, "-$1").replace("on-", "").toLowerCase();
        emits(emitEventName, e);
        if (event === "onReady") {
          ready.value = true;
          if (clickTriggered) {
            player.value?.playVideo();
            clickTriggered = false;
          }
          watch(() => props.videoId, () => {
            player.value?.loadVideoById(props.videoId);
          });
        }
      }]))
    });
  });
  watch(status, (status2) => {
    if (status2 === "error") {
      emits("error");
    }
  });
});
defineExpose({
  player
});
const rootAttrs = computed(() => {
  return defu(props.rootAttrs, {
    "aria-busy": status.value === "loading",
    "aria-label": status.value === "awaitingLoad" ? "YouTube Player - Placeholder" : status.value === "loading" ? "YouTube Player - Loading" : "YouTube Player - Loaded",
    "aria-live": "polite",
    "role": "application",
    "style": {
      cursor: "pointer",
      position: "relative",
      backgroundColor: "black",
      width: "100%",
      aspectRatio: `${props.width}/${props.height}`
    },
    ...trigger instanceof Promise ? trigger.ssrAttrs || {} : {}
  });
});
const fallbackPlaceHolder = computed(() => `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`);
const placeholder = computed(() => `https://i.ytimg.com/${props.webp ? "vi_webp" : "vi"}/${props.videoId}/${props.thumbnailSize}.${props.webp ? "webp" : "jpg"}`);
const isFallbackPlaceHolder = ref(false);
if (import.meta.server) {
  useHead({
    link: [
      {
        key: `nuxt-script-youtube-img`,
        rel: props.aboveTheFold ? "preconnect" : "dns-prefetch",
        href: "https://i.ytimg.com"
      },
      props.aboveTheFold ? {
        key: `nuxt-script-youtube-img`,
        rel: "preload",
        as: "image",
        href: placeholder.value
      } : {}
    ]
  });
}
const placeholderAttrs = computed(() => {
  return defu(props.placeholderAttrs, {
    src: isFallbackPlaceHolder.value ? fallbackPlaceHolder.value : placeholder.value,
    alt: "",
    loading: props.aboveTheFold ? "eager" : "lazy",
    style: {
      width: "100%",
      objectFit: "contain",
      height: "100%"
    },
    onLoad(payload) {
      const img = payload.target;
      if (img.naturalWidth === 120 && img.naturalHeight === 90) {
        isFallbackPlaceHolder.value = true;
      }
    }
  });
});
</script>

<template>
  <div ref="rootEl" v-bind="rootAttrs">
    <div ref="youtubeEl" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;" />
    <slot v-if="!ready" :placeholder="placeholder" name="placeholder">
      <img v-bind="placeholderAttrs">
    </slot>
    <slot v-if="status === 'loading'" name="loading">
      <ScriptAriaLoadingIndicator />
    </slot>
    <slot v-if="status === 'awaitingLoad'" name="awaitingLoad" />
    <slot v-else-if="status === 'error'" name="error" />
    <slot />
  </div>
</template>
