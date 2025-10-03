import { SUPPORTED_IMAGE_TYPES } from "./constants";

/**
 * Validates if a file is a supported image type
 * @param file - File to validate
 * @returns True if file is a supported image type
 */
export function isValidImageFile(file: File): boolean {
    return SUPPORTED_IMAGE_TYPES.some((type) => file.type === type);
}

/**
 * Validates if a file is an image (general check)
 * @param file - File to validate
 * @returns True if file type starts with 'image/'
 */
export function isImageFile(file: File): boolean {
    return file.type.startsWith("image/");
}

/**
 * Validates color count is within acceptable range
 * @param count - Number of colors
 * @param min - Minimum allowed
 * @param max - Maximum allowed
 * @returns True if count is valid
 */
export function isValidColorCount(
    count: number,
    min: number,
    max: number,
): boolean {
    return Number.isInteger(count) && count >= min && count <= max;
}

/**
 * Validates if an HTMLImageElement is loaded and ready
 * @param img - Image element to validate
 * @returns True if image is complete and has natural dimensions
 */
export function isImageLoaded(img: HTMLImageElement): boolean {
    return img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;
}

/**
 * Validates canvas context is available
 * @param ctx - Canvas context to validate
 * @returns True if context exists
 */
export function hasCanvasContext(
    ctx: CanvasRenderingContext2D | null,
): ctx is CanvasRenderingContext2D {
    return ctx !== null;
}
