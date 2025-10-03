<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { defu } from "defu";
import { useAsyncData, useHead } from "nuxt/app";
import { useScriptTriggerElement } from "../composables/useScriptTriggerElement";
import { useScriptVimeoPlayer } from "../registry/vimeo-player";
import ScriptAriaLoadingIndicator from "./ScriptAriaLoadingIndicator.vue";
const props = defineProps({
  trigger: { type: [String, Array, Boolean], required: false, default: "mousedown" },
  placeholderAttrs: { type: Object, required: false },
  rootAttrs: { type: Object, required: false },
  aboveTheFold: { type: Boolean, required: false },
  vimeoOptions: { type: Object, required: false },
  id: { type: null, required: false },
  url: { type: null, required: false }
});
const emits = defineEmits(["play", "playing", "pause", "ended", "timeupdate", "progress", "seeking", "seeked", "texttrackchange", "chapterchange", "cuechange", "cuepoint", "volumechange", "playbackratechange", "bufferstart", "bufferend", "error", "loaded", "durationchange", "fullscreenchange", "qualitychange", "camerachange", "resize", "enterpictureinpicture", "leavepictureinpicture"]);
const events = [
  "play",
  "playing",
  "pause",
  "ended",
  "timeupdate",
  "progress",
  "seeking",
  "seeked",
  "texttrackchange",
  "chapterchange",
  "cuechange",
  "cuepoint",
  "volumechange",
  "playbackratechange",
  "bufferstart",
  "bufferend",
  "error",
  "loaded",
  "durationchange",
  "fullscreenchange",
  "qualitychange",
  "camerachange",
  "resize",
  "enterpictureinpicture",
  "leavepictureinpicture"
];
const elVimeo = ref();
const rootEl = ref();
const trigger = useScriptTriggerElement({ trigger: props.trigger, el: rootEl });
let clickTriggered = false;
if (props.trigger === "mousedown" && trigger instanceof Promise) {
  trigger.then((val) => {
    if (val) {
      clickTriggered = true;
    }
  });
}
const ready = ref(false);
const { onLoaded, status } = useScriptVimeoPlayer({
  scriptOptions: {
    trigger
  }
});
if (import.meta.server) {
  useHead({
    link: [
      {
        rel: props.aboveTheFold ? "preconnect" : "dns-prefetch",
        href: "https://i.vimeocdn.com"
      }
    ]
  });
}
const id = computed(() => {
  return props.vimeoOptions?.id || props.id;
});
const videoId = computed(() => `vimeo-embed:${id.value}`);
const { data: payload } = useAsyncData(
  videoId,
  // TODO ideally we cache this
  () => $fetch(`https://vimeo.com/api/oembed.json`, {
    params: {
      url: `https://vimeo.com/${id.value}`,
      format: "json"
    }
  }),
  {
    lazy: true
  }
);
const placeholder = computed(() => {
  return payload.value?.thumbnail_url;
});
let player;
defineExpose({
  play: () => player?.play(),
  pause: () => player?.pause(),
  getDuration: () => player?.getDuration(),
  getCurrentTime: () => player?.getCurrentTime(),
  setCurrentTime: (time) => player?.setCurrentTime(time),
  getVolume: () => player?.getVolume(),
  setVolume: (volume) => player?.setVolume(volume),
  getPaused: () => player?.getPaused(),
  getEnded: () => player?.getEnded(),
  getLoop: () => player?.getLoop(),
  setLoop: (loop) => player?.setLoop(loop),
  getPlaybackRate: () => player?.getPlaybackRate(),
  setPlaybackRate: (rate) => player?.setPlaybackRate(rate)
});
const width = computed(() => {
  return props.vimeoOptions?.width || elVimeo.value?.parentNode?.offsetWidth || 640;
});
const height = computed(() => {
  return props.vimeoOptions?.height || elVimeo.value?.parentNode?.offsetHeight || 480;
});
onMounted(() => {
  onLoaded(async ({ Vimeo }) => {
    const vimeoOptions = props.vimeoOptions || {};
    if (!vimeoOptions.id && props.id) {
      vimeoOptions.id = props.id;
    }
    if (!vimeoOptions.url && props.url) {
      vimeoOptions.url = props.url;
    }
    vimeoOptions.width = width.value;
    vimeoOptions.height = height.value;
    player = new Vimeo.Player(elVimeo.value, vimeoOptions);
    if (clickTriggered) {
      player.play();
      clickTriggered = false;
    }
    for (const event of events) {
      player.on(event, (e) => {
        emits(event, e, player);
        if (event === "loaded")
          ready.value = true;
      });
    }
  });
});
watch(() => props.id, (v) => {
  if (v) {
    player?.loadVideo(Number(v));
  }
});
watch(status, (status2) => {
  if (status2 === "error") {
    emits("error");
  }
});
const rootAttrs = computed(() => {
  return defu(props.rootAttrs, {
    "aria-busy": status.value === "loading",
    "aria-label": status.value === "awaitingLoad" ? "Vimeo Player - Placeholder" : status.value === "loading" ? "Vimeo Player - Loading" : "Vimeo Player - Loaded",
    "aria-live": "polite",
    "role": "application",
    "style": {
      maxWidth: "100%",
      width: `auto`,
      height: "auto",
      aspectRatio: `16/9`,
      position: "relative",
      backgroundColor: "black"
    },
    ...trigger instanceof Promise ? trigger.ssrAttrs || {} : {}
  });
});
const placeholderAttrs = computed(() => {
  return defu(props.placeholderAttrs, {
    src: placeholder.value,
    alt: "",
    loading: props.aboveTheFold ? "eager" : "lazy",
    // @ts-expect-error untyped
    fetchpriority: props.aboveTheFold ? "high" : void 0,
    style: {
      cursor: "pointer",
      width: "100%",
      objectFit: "contain",
      height: "100%"
    }
  });
});
onBeforeUnmount(() => player?.unload());
</script>

<template>
  <div ref="rootEl" v-bind="rootAttrs">
    <div v-show="ready" ref="elVimeo" class="vimeo-player" />
    <slot v-if="!ready" v-bind="payload" :placeholder="placeholder" name="placeholder">
      <img v-if="placeholder" v-bind="placeholderAttrs">
    </slot>
    <slot v-if="status === 'loading'" name="loading">
      <ScriptAriaLoadingIndicator color="white" />
    </slot>
    <slot v-if="status === 'awaitingLoad'" name="awaitingLoad" />
    <slot v-else-if="status === 'error'" name="error" />
    <slot />
  </div>
</template>

<style>
.vimeo-player iframe{aspect-ratio:16/9;height:auto;max-width:100%!important;width:100%}
</style>
