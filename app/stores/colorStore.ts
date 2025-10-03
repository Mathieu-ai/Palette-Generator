import ColorThief from "colorthief";
import { useClipboard } from "~/composables/useClipboard";
import { useFileExport } from "~/composables/useFileExport";
import {
    rgbToHex,
    rgbToHsl,
    getComplementaryColor as getComplementary,
    getAnalogousColors as getAnalogous,
    calculateColorDistance,
} from "~/utils/colors";
import { COLOR_CONFIG } from "~/utils/constants";
import { isImageLoaded } from "~/utils/validation";

/**
 * Represents a color in multiple formats
 */
export interface ColorPalette {
    hex: string;
    rgb: { r: number; g: number; b: number };
    hsl: { h: number; s: number; l: number };
    position?: { x: number; y: number };
}

/**
 * Position in image where color was found (as percentages)
 */
export interface ColorPosition {
    x: number;
    y: number;
}

/**
 * Pinia store for color extraction and management
 */
export const useColorStore = defineStore("color", () => {
    const colorThief = new ColorThief();
    const { t } = useI18n();
    const toast = useToast();
    const { copyToClipboard } = useClipboard();
    const { exportToJson, exportToCss, downloadFile } = useFileExport();

    // State
    const palette = ref<ColorPalette[]>([]);
    const selectedColor = ref<ColorPalette | null>(null);
    const complementaryColor = ref<ColorPalette | null>(null);
    const analogousColors = ref<ColorPalette[]>([]);
    const clickedColor = ref<ColorPalette | null>(null);
    const colorCount = ref<number>(COLOR_CONFIG.DEFAULT_COLOR_COUNT);
    const isLoading = ref(false);

    /**
     * Finds the position of a color in an image
     * Uses sampling to improve performance on large images
     * @param imageElement - The image element to search
     * @param color - The color to find
     * @returns Position as percentage coordinates, or null if not found
     */
    const findColorPosition = async (
        imageElement: HTMLImageElement,
        color: ColorPalette,
    ): Promise<ColorPosition | null> => {
        return new Promise((resolve) => {
            try {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                if (!ctx || !isImageLoaded(imageElement)) {
                    resolve(null);
                    return;
                }

                canvas.width = imageElement.naturalWidth;
                canvas.height = imageElement.naturalHeight;
                ctx.drawImage(imageElement, 0, 0);

                const imageData = ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height,
                );
                const data = imageData.data;

                let minDistance = Infinity;
                let bestX = 0;
                let bestY = 0;

                // Sample pixels with step to improve performance
                const step = COLOR_CONFIG.POSITION_SAMPLE_STEP;
                for (let y = 0; y < canvas.height; y += step) {
                    for (let x = 0; x < canvas.width; x += step) {
                        const i = (y * canvas.width + x) * 4;
                        const pixelRgb = {
                            r: data[i] ?? 0,
                            g: data[i + 1] ?? 0,
                            b: data[i + 2] ?? 0,
                        };

                        const distance = calculateColorDistance(
                            pixelRgb,
                            color.rgb,
                        );

                        if (distance < minDistance) {
                            minDistance = distance;
                            bestX = x;
                            bestY = y;
                        }
                    }
                }

                resolve({
                    x: (bestX / canvas.width) * 100,
                    y: (bestY / canvas.height) * 100,
                });
            } catch (error) {
                console.error("Error finding color position:", error);
                resolve(null);
            }
        });
    };

    /**
     * Extracts color palette from an image
     * @param imageElement - Image element to extract colors from
     */
    const extractPalette = async (
        imageElement: HTMLImageElement,
    ): Promise<void> => {
        if (!isImageLoaded(imageElement)) {
            console.warn("Image not loaded yet");
            return;
        }

        isLoading.value = true;

        try {
            const paletteData = await colorThief.getPalette(
                imageElement,
                colorCount.value,
            );

            if (!Array.isArray(paletteData) || paletteData.length === 0) {
                throw new Error("No colors extracted from image");
            }

            const colors: ColorPalette[] = paletteData.map((rgb: number[]) => {
                const [r = 0, g = 0, b = 0] = rgb;

                return {
                    hex: rgbToHex(r, g, b),
                    rgb: { r, g, b },
                    hsl: rgbToHsl(r, g, b),
                };
            });

            // Find positions for all colors in parallel
            await Promise.all(
                colors.map(async (color) => {
                    const position = await findColorPosition(
                        imageElement,
                        color,
                    );
                    if (position) {
                        color.position = position;
                    }
                }),
            );

            palette.value = colors;

            if (colors.length > 0) {
                selectedColor.value = colors[0] || null;
                updateSuggestedColors();

                toast.add({
                    title: t("notifications.success"),
                    description: t("notifications.extractSuccess", {
                        count: colors.length,
                    }),
                    color: "success",
                });
            }
        } catch (error) {
            console.error("Error extracting palette:", error);
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred";
            toast.add({
                title: t("notifications.error"),
                description: t("notifications.extractError") || errorMessage,
                color: "error",
            });
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Updates complementary and analogous colors based on selected color
     */
    const updateSuggestedColors = () => {
        if (selectedColor.value) {
            complementaryColor.value = getComplementary(selectedColor.value);
            analogousColors.value = getAnalogous(selectedColor.value);
        }
    };

    /**
     * Sets the clicked color and updates selection
     * @param color - Color to select, or null to deselect
     */
    const setClickedColor = (color: ColorPalette | null) => {
        clickedColor.value = color;
        if (color) {
            selectedColor.value = color;
        } else if (palette.value.length > 0) {
            selectedColor.value = palette.value[0] || null;
            updateSuggestedColors();
        }
    };

    /**
     * Copies a color value to clipboard
     * @param color - Color to copy
     */
    const copyColor = async (color: ColorPalette): Promise<void> => {
        const success = await copyToClipboard(color.hex);
        if (success) {
            toast.add({
                title: t("actions.copy"),
                description: t("actions.copyDesc", { format: color.hex }),
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

    /**
     * Copies all palette colors to clipboard as comma-separated values
     */
    const copyAllColors = async (): Promise<void> => {
        const colors = palette.value.map((c) => c.hex).join(", ");
        const success = await copyToClipboard(colors);
        if (success) {
            toast.add({
                title: t("actions.copy"),
                description: t("actions.copyAllDesc"),
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

    /**
     * Exports the current palette to a file
     * @param format - Export format (json or css)
     */
    const exportPalette = (format: "json" | "css"): void => {
        try {
            let content: string;
            let filename: string;

            if (format === "json") {
                content = exportToJson(palette.value);
                filename = "palette.json";
            } else {
                content = exportToCss(palette.value);
                filename = "palette.css";
            }

            downloadFile(content, filename);

            toast.add({
                title: t("actions.exportSuccess"),
                description: t("actions.exportDesc", { filename }),
                color: "success",
            });
        } catch (error) {
            console.error("Export error:", error);
            toast.add({
                title: t("notifications.error"),
                description: t("notifications.exportError"),
                color: "error",
            });
        }
    };

    /**
     * Updates the number of colors to extract
     * @param count - New color count
     */
    const updateColorCount = (count: number): void => {
        if (
            count >= COLOR_CONFIG.MIN_COLOR_COUNT &&
            count <= COLOR_CONFIG.MAX_COLOR_COUNT
        ) {
            colorCount.value = count;
        }
    };

    /**
     * Handles color count change and re-extracts palette
     * @param count - New color count
     */
    const handleColorCountChange = async (
        count: number | undefined,
    ): Promise<void> => {
        if (!count) return;
        updateColorCount(count);
        const imageStore = useImageStore();
        if (imageStore.imageElement && isImageLoaded(imageStore.imageElement)) {
            await extractPalette(imageStore.imageElement);
        }
    };

    /**
     * Handles color card click and highlights color in image
     * @param color - Color that was clicked
     */
    const handleColorClick = async (color: ColorPalette): Promise<void> => {
        const imageStore = useImageStore();

        // Toggle off if same color clicked
        if (clickedColor.value?.hex === color.hex) {
            setClickedColor(null);
            imageStore.clearOverlay();
            return;
        }

        setClickedColor(color);

        // Find position if not already found
        if (!color.position && imageStore.imageElement) {
            const position = await findColorPosition(
                imageStore.imageElement,
                color,
            );
            if (position) {
                color.position = position;
            }
        }

        // Create overlay to highlight color location
        if (color.position) {
            nextTick(() => {
                imageStore.createColorOverlay(color.position!);
            });
        }
    };

    /**
     * Clears all data including image and palette
     */
    const clearAll = (): void => {
        const imageStore = useImageStore();
        const uiStore = useUiStore();

        imageStore.clearImage();
        reset();
        uiStore.clearFileInput();
    };

    /**
     * Resets all color-related state
     */
    const reset = (): void => {
        palette.value = [];
        selectedColor.value = null;
        complementaryColor.value = null;
        analogousColors.value = [];
        clickedColor.value = null;
        isLoading.value = false;
    };

    watch(selectedColor, updateSuggestedColors);

    return {
        palette,
        selectedColor,
        complementaryColor,
        analogousColors,
        clickedColor,
        colorCount,
        isLoading,
        extractPalette,
        setClickedColor,
        copyColor,
        copyAllColors,
        exportPalette,
        updateColorCount,
        handleColorCountChange,
        handleColorClick,
        findColorPosition,
        clearAll,
        reset,
    };
});
