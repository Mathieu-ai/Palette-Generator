import type { SelectItem } from "@nuxt/ui";
import pkg from "../../package.json";
/**
 * Type for locale items with flag support
 */
type LocaleItem = SelectItem & { flag: string };

/**
 * Pinia store for UI state management (theme, locale, refs)
 */
export const useUiStore = defineStore("ui", () => {
    const colorMode = useColorMode();
    const { locale, locales, setLocale } = useI18n();

    // Refs for DOM elements
    const fileInput = ref<HTMLInputElement | null>(null);
    const imageElement = ref<HTMLImageElement | null>(null);
    const overlayCanvas = ref<HTMLCanvasElement | null>(null);
    const packageInfo = pkg;

    /**
     * Current locale with getter/setter
     */
    const currentLocale = computed({
        get: () => locale.value,
        set: (value) => {
            setLocale(value);
        },
    });

    /**
     * Formats locales for select dropdown
     */
    const languageItems = computed((): LocaleItem[] => {
        return locales.value.map((loc) => ({
            label: loc.name || loc.code,
            value: loc.code,
            flag: ((loc as Record<string, unknown>).flag as string) || "🌐",
        }));
    });

    /**
     * Gets the flag emoji for current locale
     */
    const currentLanguageFlag = computed((): string => {
        const current = locales.value.find((loc) => loc.code === locale.value);
        return (
            ((current as Record<string, unknown> | undefined)
                ?.flag as string) || "🌐"
        );
    });

    /**
     * Toggles between light and dark mode
     */
    const toggleColorMode = (): void => {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    };

    /**
     * Programmatically triggers file input click
     */
    const triggerFileInput = (): void => {
        fileInput.value?.click();
    };

    /**
     * Sets the file input ref
     */
    const setFileInputRef = (ref: HTMLInputElement | null): void => {
        fileInput.value = ref;
    };

    /**
     * Sets the image element ref
     */
    const setImageElementRef = (ref: HTMLImageElement | null): void => {
        imageElement.value = ref;
    };

    /**
     * Sets the overlay canvas ref
     */
    const setOverlayCanvasRef = (ref: HTMLCanvasElement | null): void => {
        overlayCanvas.value = ref;
    };

    /**
     * Clears the file input value
     */
    const clearFileInput = (): void => {
        if (fileInput.value) {
            fileInput.value.value = "";
        }
    };

    return {
        fileInput,
        imageElement,
        overlayCanvas,
        currentLocale,
        languageItems,
        currentLanguageFlag,
        toggleColorMode,
        triggerFileInput,
        setFileInputRef,
        setImageElementRef,
        setOverlayCanvasRef,
        clearFileInput,
        packageInfo,
    };
});
