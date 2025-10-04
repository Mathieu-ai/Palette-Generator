import { isImageFile, hasCanvasContext } from "~/utils/validation";
import { CANVAS_CONFIG, COLOR_CONFIG } from "~/utils/constants";

/**
 * Pinia store for image handling and canvas operations
 */
export const useImageStore = defineStore("image", () => {
    // State
    const imagePreview = ref<string>("");
    const imageElement = ref<HTMLImageElement | null>(null);
    const overlayCanvas = ref<HTMLCanvasElement | null>(null);
    const isDragging = ref(false);
    const isDrawingCanvas = ref(false);

    /**
     * Loads an image file and creates a preview
     * @param file - Image file to load
     * @returns Promise that resolves when image is loaded
     */
    const loadImage = (file: File): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (!isImageFile(file)) {
                reject(new Error("Invalid file type. Please upload an image."));
                return;
            }

            const reader = new FileReader();

            reader.onload = (e) => {
                const result = e.target?.result;
                if (typeof result === "string") {
                    imagePreview.value = result;
                    resolve();
                } else {
                    reject(new Error("Failed to read file as data URL"));
                }
            };

            reader.onerror = () => {
                reject(
                    new Error("Failed to read file. Please try another image."),
                );
            };

            reader.readAsDataURL(file);
        });
    };

    /**
     * Sets the image element reference
     */
    const setImageElement = (element: HTMLImageElement | null): void => {
        imageElement.value = element;
    };

    /**
     * Sets the overlay canvas reference
     */
    const setOverlayCanvas = (canvas: HTMLCanvasElement | null): void => {
        overlayCanvas.value = canvas;
    };

    /**
     * Sets the dragging state
     */
    const setDragging = (dragging: boolean): void => {
        isDragging.value = dragging;
    };

    /**
     * Creates a grayscale overlay with spotlight effect on the specified position
     * @param position - Position to highlight (x and y as percentages)
     */
    const createColorOverlay = (position: { x: number; y: number }): void => {
        if (
            !overlayCanvas.value ||
            !imageElement.value ||
            isDrawingCanvas.value
        ) {
            return;
        }

        isDrawingCanvas.value = true;

        try {
            const canvas = overlayCanvas.value;
            const img = imageElement.value;
            const ctx = canvas.getContext("2d");

            if (!hasCanvasContext(ctx)) {
                console.error("Canvas context not available");
                return;
            }

            // Set canvas dimensions to match image
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            // Draw grayscale image
            ctx.filter = CANVAS_CONFIG.GRAYSCALE_FILTER;
            ctx.drawImage(img, 0, 0);
            ctx.filter = "none";

            // Calculate spotlight position and size
            const spotlightX = (position.x / 100) * canvas.width;
            const spotlightY = (position.y / 100) * canvas.height;
            const spotlightRadius =
                Math.min(canvas.width, canvas.height) *
                COLOR_CONFIG.SPOTLIGHT_RADIUS_MULTIPLIER;

            // Create radial gradient for spotlight effect
            const gradient = ctx.createRadialGradient(
                spotlightX,
                spotlightY,
                0,
                spotlightX,
                spotlightY,
                spotlightRadius,
            );
            gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
            gradient.addColorStop(
                1,
                `rgba(0, 0, 0, ${CANVAS_CONFIG.SPOTLIGHT_EDGE_OPACITY})`,
            );

            // Apply spotlight effect
            ctx.globalCompositeOperation = "destination-in";
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = "source-over";
        } catch (error) {
            console.error("Error creating color overlay:", error);
        } finally {
            isDrawingCanvas.value = false;
        }
    };

    /**
     * Clears the overlay canvas
     */
    const clearOverlay = (): void => {
        if (overlayCanvas.value) {
            const ctx = overlayCanvas.value.getContext("2d");
            if (hasCanvasContext(ctx)) {
                ctx.clearRect(
                    0,
                    0,
                    overlayCanvas.value.width,
                    overlayCanvas.value.height,
                );
            }
        }
    };

    /**
     * Clears the image and all related state
     */
    const clearImage = (): void => {
        imagePreview.value = "";
        imageElement.value = null;
        clearOverlay();
    };

    /**
     * Handles file input change event
     */
    const handleFileSelect = async (event: Event): Promise<void> => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            try {
                await loadImage(file);
            } catch (error) {
                console.error("Error loading image:", error);
            }
        }
    };

    /**
     * Handles file drop event
     */
    const handleDrop = async (event: DragEvent): Promise<void> => {
        setDragging(false);
        const file = event.dataTransfer?.files[0];
        if (file && isImageFile(file)) {
            try {
                await loadImage(file);
            } catch (error) {
                console.error("Error loading dropped image:", error);
            }
        }
    };

    /**
     * Handles image load event and triggers palette extraction
     */
    const handleImageLoad = async (): Promise<void> => {
        if (imageElement.value) {
            const colorStore = useColorStore();
            await colorStore.extractPalette(imageElement.value);
        }
    };

    return {
        imagePreview,
        imageElement,
        overlayCanvas,
        isDragging,
        isDrawingCanvas,
        loadImage,
        setImageElement,
        setOverlayCanvas,
        setDragging,
        createColorOverlay,
        clearOverlay,
        clearImage,
        handleFileSelect,
        handleDrop,
        handleImageLoad,
    };
});
