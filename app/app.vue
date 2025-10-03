<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NuxtRouteAnnouncer />
        <ClientOnly>
            <header
                class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
            >
                <div class="container mx-auto px-4 py-4 sm:py-6">
                    <div
                        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    >
                        <div
                            class="flex items-center gap-3 justify-center sm:justify-start"
                        >
                            <UIcon
                                name="i-heroicons-swatch"
                                class="w-8 h-8 text-primary"
                            />
                            <h1
                                class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white"
                            >
                                {{ $t("app.title") }}
                            </h1>
                        </div>

                        <div
                            class="flex items-center gap-2 justify-center sm:justify-end mt-2 sm:mt-0"
                        >
                            <USelect
                                v-model="uiStore.currentLocale"
                                :items="uiStore.languageItems"
                                value-key="value"
                                class="w-36 sm:w-40"
                            >
                                <template #leading>
                                    <span class="text-xl">{{
                                        uiStore.currentLanguageFlag
                                    }}</span>
                                </template>
                            </USelect>
                            <UButton
                                color="neutral"
                                variant="ghost"
                                icon="i-heroicons-moon"
                                @click="uiStore.toggleColorMode"
                            />
                        </div>
                    </div>
                    <p
                        class="mt-2 text-gray-600 dark:text-gray-400 text-center sm:text-left"
                    >
                        {{ $t("app.description") }}
                    </p>
                </div>
            </header>

            <main class="container mx-auto px-4 py-8">
            <UCard v-if="!imageStore.imagePreview" class="mb-8">
                <template #header>
                    <h2 class="text-xl font-semibold">
                        {{ $t("upload.title") }}
                    </h2>
                </template>

                <div
                    class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                    :class="{
                        'border-primary bg-primary/5': imageStore.isDragging,
                    }"
                    @click="uiStore.triggerFileInput"
                    @dragover.prevent="imageStore.setDragging(true)"
                    @dragleave.prevent="imageStore.setDragging(false)"
                    @drop.prevent="imageStore.handleDrop"
                >
                    <input
                        :ref="
                            (el) =>
                                uiStore.setFileInputRef(el as HTMLInputElement)
                        "
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="imageStore.handleFileSelect"
                    >

                    <UIcon
                        name="i-heroicons-photo"
                        class="w-12 h-12 mx-auto text-gray-400 mb-4"
                    />

                    <p
                        class="text-lg font-medium text-gray-900 dark:text-white mb-2"
                    >
                        {{ $t("upload.dropzone") }}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        {{ $t("upload.supports") }}
                    </p>
                </div>
            </UCard>

            <div
                v-if="imageStore.imagePreview"
                class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
            >
                <div class="space-y-4">
                    <UCard>
                        <template #header>
                            <div class="flex items-center justify-between">
                                <h2 class="text-xl font-semibold">
                                    {{ $t("image.title") }}
                                </h2>
                                <UButton
                                    color="error"
                                    variant="soft"
                                    size="sm"
                                    @click="colorStore.clearAll"
                                >
                                    {{ $t("upload.remove") }}
                                </UButton>
                            </div>
                        </template>

                        <div class="relative">
                            <img
                                :ref="
                                    (el) =>
                                        uiStore.setImageElementRef(
                                            el as HTMLImageElement,
                                        )
                                "
                                :src="imageStore.imagePreview"
                                alt="Preview"
                                class="w-full h-auto rounded-lg shadow-lg"
                                crossorigin="anonymous"
                                @load="imageStore.handleImageLoad"
                            >

                            <canvas
                                v-if="colorStore.clickedColor"
                                :ref="
                                    (el) =>
                                        uiStore.setOverlayCanvasRef(
                                            el as HTMLCanvasElement,
                                        )
                                "
                                class="absolute top-0 left-0 w-full h-full pointer-events-none rounded-lg"
                            />

                            <div
                                v-if="colorStore.clickedColor?.position"
                                class="absolute pointer-events-none"
                                :style="{
                                    left: `${colorStore.clickedColor.position.x}%`,
                                    top: `${colorStore.clickedColor.position.y}%`,
                                    transform: 'translate(-50%, -50%)',
                                }"
                            >
                                <div
                                    class="absolute w-20 h-20 rounded-full opacity-30 animate-pulse"
                                    :style="{
                                        backgroundColor:
                                            colorStore.clickedColor.hex,
                                    }"
                                />
                                <div
                                    class="relative w-12 h-12 rounded-full border-4 border-white shadow-2xl"
                                    :style="{
                                        backgroundColor:
                                            colorStore.clickedColor.hex,
                                    }"
                                />
                                <div
                                    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-lg"
                                    :style="{
                                        backgroundColor:
                                            colorStore.clickedColor.hex,
                                    }"
                                />
                            </div>
                        </div>

                        <div class="mt-4 space-y-3">
                            <div class="flex items-center justify-between">
                                <label
                                    class="text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    {{ $t("image.colorCount") }}
                                </label>
                                <span
                                    class="text-sm font-semibold text-primary"
                                    >{{ colorStore.colorCount }}</span
                                >
                            </div>
                            <USlider
                                :model-value="colorStore.colorCount"
                                :min="3"
                                :max="12"
                                :step="1"
                                @update:model-value="
                                    colorStore.handleColorCountChange
                                "
                            />
                        </div>
                    </UCard>
                </div>

                <div class="space-y-6">
                    <UCard>
                        <template #header>
                            <div
                                class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                            >
                                <h2 class="text-xl font-semibold">
                                    {{ $t("colors.dominant") }}
                                </h2>
                                <div class="flex flex-wrap gap-2">
                                    <UButton
                                        color="primary"
                                        variant="soft"
                                        icon="i-heroicons-arrow-down-tray"
                                        size="sm"
                                        @click="
                                            colorStore.exportPalette('json')
                                        "
                                    >
                                        {{ $t("actions.export.json") }}
                                    </UButton>
                                    <UButton
                                        color="primary"
                                        variant="soft"
                                        icon="i-heroicons-arrow-down-tray"
                                        size="sm"
                                        @click="colorStore.exportPalette('css')"
                                    >
                                        {{ $t("actions.export.css") }}
                                    </UButton>
                                    <UButton
                                        color="primary"
                                        variant="soft"
                                        icon="i-heroicons-clipboard-document"
                                        size="sm"
                                        @click="colorStore.copyAllColors()"
                                    >
                                        {{ $t("actions.copyAll") }}
                                    </UButton>
                                </div>
                            </div>
                        </template>

                        <div
                            v-if="colorStore.isLoading"
                            class="text-center py-12"
                        >
                            <UIcon
                                name="i-heroicons-arrow-path"
                                class="w-8 h-8 animate-spin mx-auto text-primary"
                            />
                            <p class="mt-4 text-gray-600 dark:text-gray-400">
                                {{ $t("image.extracting") }}
                            </p>
                        </div>

                        <div
                            v-else
                            class="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                            <ColorCard
                                v-for="(color, index) in colorStore.palette"
                                :key="index"
                                :color="color"
                                :is-active="
                                    colorStore.clickedColor?.hex === color.hex
                                "
                                @click="colorStore.handleColorClick"
                            />
                        </div>
                    </UCard>
                </div>
            </div>
        </main>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
const colorStore = useColorStore();
const imageStore = useImageStore();
const uiStore = useUiStore();

watch(
    () => uiStore.imageElement,
    (el) => {
        if (el) imageStore.setImageElement(el);
    },
);

watch(
    () => uiStore.overlayCanvas,
    (canvas) => {
        if (canvas) imageStore.setOverlayCanvas(canvas);
    },
);
</script>
