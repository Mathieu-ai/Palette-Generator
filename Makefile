# Scripts for local development and deployment

# Generate static site for GitHub Pages
generate:
	@echo "🏗️  Generating static site..."
	NUXT_APP_BASE_URL=/Palette-Generator/ pnpm generate
	@echo "✅ Static site generated in .output/public/"

# Preview the generated site
preview-static:
	@echo "👀 Previewing static site..."
	@echo "Starting server at http://localhost:3000"
	npx serve .output/public -p 3000

# Test production build locally
test-production:
	@echo "🧪 Testing production build..."
	@$(MAKE) generate
	@$(MAKE) preview-static

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf .output
	rm -rf .nuxt
	rm -rf node_modules/.cache
	@echo "✅ Clean complete"

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	pnpm install
	@echo "✅ Dependencies installed"

# Development server
dev:
	@echo "🚀 Starting development server..."
	pnpm dev

# Lint and fix
lint:
	@echo "🔍 Running linter..."
	pnpm lint

# Full build and test cycle
build-test: clean install lint generate preview-static

# Help
help:
	@echo "Available commands:"
	@echo "  make generate          - Generate static site for GitHub Pages"
	@echo "  make preview-static    - Preview the generated static site"
	@echo "  make test-production   - Test production build locally"
	@echo "  make clean             - Clean build artifacts"
	@echo "  make install           - Install dependencies"
	@echo "  make dev               - Start development server"
	@echo "  make lint              - Run linter"
	@echo "  make build-test        - Full build and test cycle"

.PHONY: generate preview-static test-production clean install dev lint build-test help
