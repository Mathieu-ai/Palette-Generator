import type { ColorPalette } from "~/stores/colorStore";

/**
 * Validates if a number is within RGB range (0-255)
 */
export function isValidRgbValue(value: number): boolean {
    return Number.isInteger(value) && value >= 0 && value <= 255;
}

/**
 * Validates if a hex color string is valid
 */
export function isValidHexColor(hex: string): boolean {
    return /^#[0-9A-F]{6}$/i.test(hex);
}

/**
 * Converts RGB color values to hexadecimal format
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Hexadecimal color string (e.g., "#FF5733")
 */
export function rgbToHex(r: number, g: number, b: number): string {
    if (!isValidRgbValue(r) || !isValidRgbValue(g) || !isValidRgbValue(b)) {
        throw new Error(
            `Invalid RGB values: r=${r}, g=${g}, b=${b}. Values must be integers between 0-255.`,
        );
    }

    return (
        "#" +
        [r, g, b]
            .map((x) => {
                const hex = x.toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            })
            .join("")
            .toUpperCase()
    );
}

/**
 * Converts RGB color values to HSL format
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns HSL object with h (0-360), s (0-100), and l (0-100)
 */
export function rgbToHsl(
    r: number,
    g: number,
    b: number,
): { h: number; s: number; l: number } {
    if (!isValidRgbValue(r) || !isValidRgbValue(g) || !isValidRgbValue(b)) {
        throw new Error(
            `Invalid RGB values: r=${r}, g=${g}, b=${b}. Values must be integers between 0-255.`,
        );
    }

    // Normalize RGB values to 0-1 range
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const delta = max - min;

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (delta !== 0) {
        // Calculate saturation
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

        // Calculate hue
        switch (max) {
        case rNorm:
            h = ((gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0)) / 6;
            break;
        case gNorm:
            h = ((bNorm - rNorm) / delta + 2) / 6;
            break;
        case bNorm:
            h = ((rNorm - gNorm) / delta + 4) / 6;
            break;
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
}

/**
 * Converts HSL color values to RGB format
 * @param h - Hue value (0-360)
 * @param s - Saturation value (0-100)
 * @param l - Lightness value (0-100)
 * @returns RGB object with r, g, and b values (0-255)
 */
export function hslToRgb(
    h: number,
    s: number,
    l: number,
): { r: number; g: number; b: number } {
    // Normalize values
    const hNorm = h / 360;
    const sNorm = s / 100;
    const lNorm = l / 100;

    let r: number, g: number, b: number;

    if (sNorm === 0) {
        // Achromatic (gray)
        r = g = b = lNorm;
    } else {
        const hue2rgb = (p: number, q: number, t: number): number => {
            let tNorm = t;
            if (tNorm < 0) tNorm += 1;
            if (tNorm > 1) tNorm -= 1;
            if (tNorm < 1 / 6) return p + (q - p) * 6 * tNorm;
            if (tNorm < 1 / 2) return q;
            if (tNorm < 2 / 3) return p + (q - p) * (2 / 3 - tNorm) * 6;
            return p;
        };

        const q =
            lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
        const p = 2 * lNorm - q;

        r = hue2rgb(p, q, hNorm + 1 / 3);
        g = hue2rgb(p, q, hNorm);
        b = hue2rgb(p, q, hNorm - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    };
}

/**
 * Calculates the complementary color (opposite on color wheel)
 * @param color - Source color palette
 * @returns Complementary color palette
 */
export function getComplementaryColor(color: ColorPalette): ColorPalette {
    const h = (color.hsl.h + 180) % 360;
    const { s, l } = color.hsl;

    const rgb = hslToRgb(h, s, l);
    return {
        hex: rgbToHex(rgb.r, rgb.g, rgb.b),
        rgb,
        hsl: { h, s, l },
    };
}

/**
 * Calculates analogous colors (adjacent on color wheel)
 * @param color - Source color palette
 * @param angle - Angle difference in degrees (default: 30)
 * @returns Array of two analogous colors
 */
export function getAnalogousColors(
    color: ColorPalette,
    angle: number = 30,
): ColorPalette[] {
    const analogous: ColorPalette[] = [];
    const angles = [-angle, angle];

    for (const offset of angles) {
        const h = (color.hsl.h + offset + 360) % 360;
        const { s, l } = color.hsl;

        const rgb = hslToRgb(h, s, l);
        analogous.push({
            hex: rgbToHex(rgb.r, rgb.g, rgb.b),
            rgb,
            hsl: { h, s, l },
        });
    }

    return analogous;
}

/**
 * Calculates the Euclidean distance between two RGB colors
 * @param rgb1 - First RGB color
 * @param rgb2 - Second RGB color
 * @returns Distance value (lower means more similar)
 */
export function calculateColorDistance(
    rgb1: { r: number; g: number; b: number },
    rgb2: { r: number; g: number; b: number },
): number {
    return Math.sqrt(
        Math.pow(rgb1.r - rgb2.r, 2) +
            Math.pow(rgb1.g - rgb2.g, 2) +
            Math.pow(rgb1.b - rgb2.b, 2),
    );
}

/**
 * Formats RGB values as a CSS rgb() string
 */
export function formatRgbString(rgb: {
    r: number;
    g: number;
    b: number;
}): string {
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

/**
 * Formats HSL values as a CSS hsl() string
 */
export function formatHslString(hsl: {
    h: number;
    s: number;
    l: number;
}): string {
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}
