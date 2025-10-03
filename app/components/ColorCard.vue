<template>
    <div
        class="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer border-2 active:scale-95"
        :class="
            isActive
                ? 'border-primary ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-950'
                : 'border-gray-200 dark:border-gray-800'
        "
        @click="selectColor"
    >
        <div
            class="h-32 sm:h-36 w-full transition-transform group-hover:scale-105 group-active:scale-100 relative"
            :style="{ backgroundColor: color.hex }"
        >
            <div
                v-if="color.position"
                class="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg"
                :title="$t('colors.position')"
            >
                <UIcon
                    name="i-heroicons-map-pin"
                    class="w-3 h-3 text-gray-700 dark:text-gray-300"
                />
            </div>

            <div
                v-if="isActive"
                class="absolute top-2 left-2 bg-primary rounded-full p-1.5 shadow-lg animate-pulse"
                :title="$t('colors.showing')"
            >
                <UIcon name="i-heroicons-eye" class="w-3 h-3 text-white" />
            </div>
        </div>

        <div class="p-3 sm:p-4 bg-white dark:bg-gray-950">
            <div class="space-y-2">
                <div class="flex items-center justify-between gap-2">
                    <span
                        class="text-xs font-medium text-gray-500 dark:text-gray-400 flex-shrink-0"
                        >HEX</span
                    >
                    <div class="flex items-center gap-1 min-w-0">
                        <code
                            class="text-xs sm:text-sm font-mono font-semibold text-gray-900 dark:text-white truncate"
                        >
                            {{ color.hex }}
                        </code>
                        <UButton
                            icon="i-heroicons-clipboard-document"
                            size="xs"
                            color="neutral"
                            variant="ghost"
                            class="flex-shrink-0"
                            @click.stop="copyValue(color.hex, 'HEX')"
                        />
                    </div>
                </div>

                <div class="flex items-center justify-between gap-2">
                    <span
                        class="text-xs font-medium text-gray-500 dark:text-gray-400 flex-shrink-0"
                        >RGB</span
                    >
                    <div class="flex items-center gap-1 min-w-0">
                        <code
                            class="text-xs font-mono text-gray-700 dark:text-gray-300 truncate"
                        >
                            {{ color.rgb.r }}, {{ color.rgb.g }},
                            {{ color.rgb.b }}
                        </code>
                        <UButton
                            icon="i-heroicons-clipboard-document"
                            size="xs"
                            color="neutral"
                            variant="ghost"
                            class="flex-shrink-0"
                            @click.stop="copyValue(formatRgbString(color.rgb), 'RGB')"
                        />
                    </div>
                </div>

                <!-- HSL -->
                <div class="flex items-center justify-between gap-2">
                    <span
                        class="text-xs font-medium text-gray-500 dark:text-gray-400 flex-shrink-0"
                        >HSL</span
                    >
                    <div class="flex items-center gap-1 min-w-0">
                        <code
                            class="text-xs font-mono text-gray-700 dark:text-gray-300 truncate"
                        >
                            {{ color.hsl.h }}°, {{ color.hsl.s }}%,
                            {{ color.hsl.l }}%
                        </code>
                        <UButton
                            icon="i-heroicons-clipboard-document"
                            size="xs"
                            color="neutral"
                            variant="ghost"
                            class="flex-shrink-0"
                            @click.stop="copyValue(formatHslString(color.hsl), 'HSL')"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useClipboard } from "~/composables/useClipboard";
import type { ColorPalette } from "~/stores/colorStore";
import { formatRgbString, formatHslString } from "~/utils/colors";

/**
 * Props for ColorCard component
 */
interface Props {
    color: ColorPalette;
    isActive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    isActive: false,
});

/**
 * Emits
 */
const emit = defineEmits<{
    click: [color: ColorPalette];
}>();

const toast = useToast();
const { t } = useI18n();
const { copyToClipboard } = useClipboard();

/**
 * Handles color card click
 */
const selectColor = (): void => {
    emit("click", props.color);
};

/**
 * Copies color value to clipboard
 * @param value - Value to copy
 * @param format - Format name for notification
 */
const copyValue = async (value: string, format: string): Promise<void> => {
    const success = await copyToClipboard(value);
    if (success) {
        toast.add({
            title: t("actions.copy"),
            description: t("actions.copyDesc", { format }),
            color: "success",
        });
    } else {
        toast.add({
            title: t("notifications.error"),
            description: t("notifications.copyError"),
            color: "error",
        });
    }
};
</script>
