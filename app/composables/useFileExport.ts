import type { ColorPalette } from "~/stores/colorStore";

/**
 * Provides file export
 */
export function useFileExport() {
    /**
     * Exports palette to JSON format
     * @param palette - Array of colors to export
     * @returns JSON string
     */
    const exportToJson = (palette: ColorPalette[]): string => {
        return JSON.stringify(palette, null, 2);
    };

    /**
     * Exports palette to CSS custom properties format
     * @param palette - Array of colors to export
     * @returns CSS string with custom properties
     */
    const exportToCss = (palette: ColorPalette[]): string => {
        let css = ":root {\n";

        palette.forEach((color, index) => {
            const num = index + 1;
            css += `  --color-${num}: ${color.hex};\n`;
            css += `  --color-${num}-rgb: ${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b};\n`;
            css += `  --color-${num}-hsl: ${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%;\n`;
        });

        css += "}";
        return css;
    };

    /**
     * Downloads content as a file
     * @param content - File content
     * @param filename - Name of file to download
     * @param mimeType - MIME type of file
     */
    const downloadFile = (
        content: string,
        filename: string,
        mimeType: string = "text/plain",
    ): void => {
        try {
            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            link.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download file:", error);
            throw new Error("File download failed");
        }
    };

    return {
        exportToJson,
        exportToCss,
        downloadFile,
    };
}
