// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
    // Your custom configs here
    {
        rules: {
            // Enforce 4-space indentation
            indent: ["error", 4],
            // Enforce semicolons
            semi: ["error", "always"],
            // Enforce double quotes
            quotes: ["error", "double"],
            // Enforce trailing commas
            "comma-dangle": ["error", "always-multiline"],
            // Disallow console statements in production
            "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
            // Enforce explicit function return types
            "@typescript-eslint/explicit-function-return-type": "off",
            // Require const for variables that are never reassigned
            "prefer-const": "error",
            // Enforce arrow function syntax
            "prefer-arrow-callback": "error",
            // Vue specific rules
            "vue/multi-word-component-names": "off",
            "vue/no-v-html": "warn",
        },
    },
);
