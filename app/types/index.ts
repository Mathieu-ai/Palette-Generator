/**
 * Global type definitions for the application
 */

/**
 * Represents an RGB color
 */
export interface RgbColor {
    r: number;
    g: number;
    b: number;
}

/**
 * Represents an HSL color
 */
export interface HslColor {
    h: number;
    s: number;
    l: number;
}

/**
 * Position coordinates as percentages
 */
export interface Position {
    x: number;
    y: number;
}

/**
 * Export format types
 */
export type ExportFormat = "json" | "css";

/**
 * Supported image MIME types
 */
export type ImageMimeType =
    | "image/jpeg"
    | "image/jpg"
    | "image/png"
    | "image/gif"
    | "image/webp"
    | "image/svg+xml";
