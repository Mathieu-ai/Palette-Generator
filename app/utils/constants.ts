/** Color extraction configuration */
export const COLOR_CONFIG = {
    /** Default number of colors to extract from image */
    DEFAULT_COLOR_COUNT: 6,
    /** Minimum number of colors to extract */
    MIN_COLOR_COUNT: 3,
    /** Maximum number of colors to extract */
    MAX_COLOR_COUNT: 12,
    /** Sampling step for finding color position (pixels) */
    POSITION_SAMPLE_STEP: 10,
    /** Spotlight radius as percentage of image dimensions */
    SPOTLIGHT_RADIUS_MULTIPLIER: 0.15,
} as const;

/** Canvas overlay configuration */
export const CANVAS_CONFIG = {
    /** Grayscale filter for non-highlighted areas */
    GRAYSCALE_FILTER: "grayscale(100%)",
    /** Spotlight gradient opacity at edge */
    SPOTLIGHT_EDGE_OPACITY: 0.7,
} as const;

/** Color harmony angles */
export const COLOR_HARMONY = {
    /** Angle for complementary color (opposite on color wheel) */
    COMPLEMENTARY_ANGLE: 180,
    /** Angle for analogous colors (adjacent on color wheel) */
    ANALOGOUS_ANGLE: 30,
} as const;

/** Export file formats */
export const EXPORT_FORMATS = {
    JSON: "json",
    CSS: "css",
} as const;

/** Supported image mime types */
export const SUPPORTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
] as const;

/** Toast notification durations (ms) */
export const TOAST_DURATION = {
    SHORT: 2000,
    MEDIUM: 3000,
    LONG: 5000,
} as const;
