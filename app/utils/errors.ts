/**
 * Error handling utilities
 */

/**
 * Custom error class for application errors
 */
export class AppError extends Error {
    constructor(
        message: string,
        public code?: string,
        public statusCode?: number,
    ) {
        super(message);
        this.name = "AppError";
    }
}

/**
 * Error codes for different error types
 */
export const ErrorCodes = {
    INVALID_FILE_TYPE: "INVALID_FILE_TYPE",
    FILE_READ_ERROR: "FILE_READ_ERROR",
    IMAGE_LOAD_ERROR: "IMAGE_LOAD_ERROR",
    COLOR_EXTRACTION_ERROR: "COLOR_EXTRACTION_ERROR",
    CANVAS_ERROR: "CANVAS_ERROR",
    CLIPBOARD_ERROR: "CLIPBOARD_ERROR",
    EXPORT_ERROR: "EXPORT_ERROR",
} as const;

/**
 * Checks if an error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
    return error instanceof AppError;
}

/**
 * Safely gets error message from unknown error
 */
export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === "string") {
        return error;
    }
    return "An unknown error occurred";
}

/**
 * Logs error with context
 */
export function logError(
    error: unknown,
    context?: string,
): void {
    const message = getErrorMessage(error);
    const prefix = context ? `[${context}]` : "";
    console.error(`${prefix} ${message}`, error);
}
