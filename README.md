# 🎨 Palette Generator

A professional color palette extraction tool built with Nuxt 3 and Vue 3. Extract dominant colors from images, explore color harmonies, and export palettes for your projects.

## ✨ Features

- 🖼️ **Image Color Extraction**: Upload images and extract dominant colors using advanced algorithms
- 🎯 **Color Location Detection**: See exactly where colors appear in your image
- 🌈 **Color Harmonies**: Automatically generate complementary and analogous colors
- 📋 **Multiple Color Formats**: View colors in HEX, RGB, and HSL formats
- 📤 **Export Options**: Export palettes as JSON or CSS custom properties
- 🌍 **Multi-language Support**: Available in 50+ languages
- 🌓 **Dark Mode**: Built-in dark mode support
- 📱 **Responsive Design**: Works seamlessly on all device sizes

## 🚀 Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/)
- **UI Library**: [Nuxt UI](https://ui.nuxt.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Color Extraction**: [ColorThief](https://github.com/lokesh/color-thief)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **TypeScript**: Full type safety
- **i18n**: [Nuxt I18n](https://i18n.nuxtjs.org/)

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Generate static site (for GitHub Pages)
pnpm generate

# Preview production build
pnpm preview

# Lint code
pnpm lint
```

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages.

### Automatic Deployment

Every push to the `main` branch automatically:
1. Builds the static site
2. Deploys to the `docs` branch
3. Updates GitHub Pages

### Manual Deployment

You can also trigger deployment from the Actions tab in GitHub.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🏗️ Project Structure

```text
app/
├── assets/          # Static assets (CSS, images)
├── components/      # Vue components
├── composables/     # Reusable composables
├── stores/          # Pinia stores
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
    ├── colors.ts    # Color conversion utilities
    ├── constants.ts # Application constants
    └── validation.ts # Validation functions
i18n/
└── locales/         # Translation files
public/              # Public static files
```

## 🎨 Architecture & Best Practices

### Code Organization

- **Separation of Concerns**: Business logic is separated into stores, utilities, and composables
- **Type Safety**: Full TypeScript support with strict type checking
- **Reusability**: Common functionality extracted into composables and utilities
- **Documentation**: JSDoc comments on all functions and complex logic

### Utilities

- **`colors.ts`**: Pure functions for color conversions (RGB ↔ HEX ↔ HSL)
- **`validation.ts`**: Input validation and type guards
- **`constants.ts`**: Application-wide constants (magic numbers removed)

### Composables

- **`useClipboard.ts`**: Clipboard operations with fallback support
- **`useFileExport.ts`**: File export functionality

### Stores

- **`colorStore.ts`**: Color extraction and palette management
- **`imageStore.ts`**: Image handling and canvas operations
- **`uiStore.ts`**: UI state (theme, locale, refs)

## 🧪 Code Quality

- **ESLint**: Enforces code style and best practices
- **Prettier**: Consistent code formatting
- **TypeScript**: Static type checking
- **EditorConfig**: Consistent editor settings

## 🌍 Internationalization

The application supports 50+ languages including:

- English, French, Spanish, German
- Japanese, Chinese (Simplified & Traditional), Korean
- Arabic, Hindi, Bengali
- And many more...

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---
