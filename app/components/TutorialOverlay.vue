<template>
  <Teleport v-if="tutorial.active && tutorial.currentStep" to="body">
    <div class="fixed inset-0 z-[9998] pointer-events-none">
      <div
        v-if="tutorial.targetRect"
        class="absolute z-[9999] rounded-lg ring-4 ring-primary/70 bg-white/5 dark:bg-black/10 transition-all pointer-events-none tutorial-highlight"
        :style="tutorial.highlightStyle"
      />
    </div>
    <div class="fixed z-[10000] max-w-sm w-[300px]" :style="tutorial.cardStyle">
      <UCard class="p-0">
        <template #header>
          <div class="flex items-start justify-between gap-2">
            <h3 class="font-semibold text-base flex-1">{{ tutorial.currentStep.title }}</h3>
            <UButton
              size="xs"
              color="neutral"
              variant="ghost"
              icon="i-heroicons-x-mark"
              class="-m-1"
              @click="tutorial.skip()"
            />
          </div>
        </template>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {{ tutorial.currentStep.description }}
        </p>
        <p
          v-if="tutorial.currentStep.target && !tutorial.targetRect"
          class="text-xs text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1"
        >
          <UIcon name="i-heroicons-clock" class="w-4 h-4" />
          {{ $t('tutorial.elementWaiting') || 'Waiting for element to render...' }}
        </p>
        <div class="flex items-center justify-between">
          <div class="text-xs text-gray-500">{{ tutorial.currentPosition }}</div>
          <div class="flex gap-2">
            <UButton
              v-if="tutorial.hasPrev"
              size="xs"
              variant="soft"
              @click="tutorial.prevStep()"
            >{{ $t('tutorial.controls.prev') }}</UButton>
            <UButton
              v-if="tutorial.showNext"
              size="xs"
              :disabled="tutorial.currentStep.requiresAction && !tutorial.isCompleted(tutorial.currentStep.id)"
              @click="tutorial.nextStep()"
            >{{ tutorial.nextLabel }}</UButton>
          </div>
        </div>
      </UCard>
    </div>
  </Teleport>
  <div v-if="tutorial.isDone && !tutorial.active" class="fixed bottom-4 right-4 z-50">
    <UButton
      size="xs"
      icon="i-heroicons-information-circle"
      variant="soft"
      @click="tutorial.replay()"
    >{{ $t('tutorial.controls.restart') }}</UButton>
  </div>
</template>

<script setup lang="ts">
const tutorial = useTutorialStore();
</script>

<style scoped>
.tutorial-highlight {
  box-shadow: 0 0 0 2000px rgba(0, 0, 0, 0.25);
}
</style>

