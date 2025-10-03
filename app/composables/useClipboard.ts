/**
 * Provides clipboard functionality
 */
export function useClipboard() {
    /**
     * Copies text to clipboard
     * @param text - Text to copy
     * @returns Promise that resolves to true if successful, false otherwise
     */
    const copyToClipboard = async (text: string): Promise<boolean> => {
        try {
            if (!navigator.clipboard) {
                // for older browsers
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                document.body.appendChild(textArea);
                textArea.select();
                const success = document.execCommand("copy");
                document.body.removeChild(textArea);
                return success;
            }

            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            console.error("Failed to copy to clipboard:", error);
            return false;
        }
    };

    return {
        copyToClipboard,
    };
}
