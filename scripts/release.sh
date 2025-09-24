#!/bin/bash

# 🚀 Mantra Release Script
# Otimizado para workflow branch-based (sem tags Git)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }

print_header() {
	echo -e "${BLUE}===============================================${NC}"
	echo -e "${BLUE}🚀 MANTRA LIBRARY RELEASE${NC}"
	echo -e "${BLUE}===============================================${NC}"
	echo ""
}

main() {
	print_header

	# Check if we're in the right directory
	if [ ! -f "package.json" ]; then
			print_error "package.json not found! Run from project root."
			exit 1
	fi

	# Check if we're not on main branch
	CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
	if [ "$CURRENT_BRANCH" = "main" ]; then
			print_error "Don't run releases directly on main branch!"
			print_info "Create a feature branch first: git checkout -b feat/release-v2.x.x"
			exit 1
	fi

	print_info "Current branch: ${CURRENT_BRANCH}"

	# Get current version and calculate next versions
	CURRENT_VERSION=$(node -p "require('./package.json').version")

	# Extract version parts
	IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

	# Calculate next versions
	NEXT_PATCH="$MAJOR.$MINOR.$((PATCH + 1))"
	NEXT_MINOR="$MAJOR.$((MINOR + 1)).0"
	NEXT_MAJOR="$((MAJOR + 1)).0.0"

	print_info "Current version: ${CURRENT_VERSION}"

	# Ask for release type with clear version examples
	echo ""
	print_info "Select release type:"
	echo -e "1) ${YELLOW}Patch${NC} (x.x.${YELLOW}Z${NC}) → ${CURRENT_VERSION} → ${NEXT_PATCH}"
	echo -e "   ${BLUE}ℹ️  Bug fixes, small improvements${NC}"
	echo ""
	echo -e "2) ${YELLOW}Minor${NC} (x.${YELLOW}Y${NC}.0) → ${CURRENT_VERSION} → ${NEXT_MINOR}"
	echo -e "   ${BLUE}ℹ️  New features, backward compatible${NC}"
	echo ""
	echo -e "3) ${YELLOW}Major${NC} (${YELLOW}X${NC}.0.0) → ${CURRENT_VERSION} → ${NEXT_MAJOR}"
	echo -e "   ${BLUE}ℹ️  Breaking changes, API changes${NC}"
	echo ""
	echo "4) Exit"
	echo ""    read -p "Enter your choice (1-4): " choice

	case $choice in
			1)
					RELEASE_TYPE="patch"
					EXPECTED_VERSION="$NEXT_PATCH"
					;;
			2)
					RELEASE_TYPE="minor"
					EXPECTED_VERSION="$NEXT_MINOR"
					;;
			3)
					RELEASE_TYPE="major"
					EXPECTED_VERSION="$NEXT_MAJOR"
					;;
			4) print_info "Release cancelled"; exit 0 ;;
			*) print_error "Invalid choice"; exit 1 ;;
	esac

	echo ""
	print_success "Selected: ${RELEASE_TYPE} release"
	print_info "Will create version: ${CURRENT_VERSION} → ${EXPECTED_VERSION}"
	echo ""

	# Final confirmation
	print_info "This will:"
	echo "  • Create a new commit with version bump"
	echo "  • Push to the current branch"
	echo "  • Trigger GitHub Actions for publishing"
	echo ""
	read -p "Continue? (y/N): " confirm
	if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
			print_info "Release cancelled"
			exit 0
	fi    # Pre-flight checks
	echo ""
	print_info "Running pre-flight checks..."

	# Run tests
	print_info "Running tests..."
	if ! npm test; then
			print_error "Tests failed! Fix them before releasing."
			exit 1
	fi
	print_success "Tests passed"

	# Build project
	print_info "Building project..."
	if ! npm run build; then
			print_error "Build failed! Fix errors before releasing."
			exit 1
	fi
	print_success "Build successful"

	# Update version
	print_info "Updating version..."
	npm run "version:${RELEASE_TYPE}"
	NEW_VERSION=$(node -p "require('./package.json').version")
	print_success "Version updated: ${CURRENT_VERSION} → ${NEW_VERSION}"

	# CHANGELOG reminder
	echo ""
	print_warning "IMPORTANT: Update CHANGELOG.md for version ${NEW_VERSION}!"
	print_info "Document all changes, new features, and fixes"
	echo ""
	read -p "Have you updated CHANGELOG.md? (y/N): " changelog_updated

	if [ "$changelog_updated" != "y" ] && [ "$changelog_updated" != "Y" ]; then
			print_warning "Update CHANGELOG.md first, then run again"
			git checkout -- package.json
			exit 0
	fi

	# Final confirmation
	echo ""
	print_info "Ready to commit release ${NEW_VERSION}"
	read -p "Commit and prepare for PR? (y/N): " final_confirm

	if [ "$final_confirm" != "y" ] && [ "$final_confirm" != "Y" ]; then
			print_info "Release cancelled"
			git checkout -- package.json
			exit 0
	fi

	# Commit changes
	print_info "Committing release changes..."
	git add .
	git commit -m "chore: release v${NEW_VERSION}"
	print_success "Release committed"

	# Success and next steps
	echo ""
	print_success "Release v${NEW_VERSION} prepared successfully! 🎉"
	echo ""
	print_info "Next steps:"
	echo "1. Push branch: git push origin ${CURRENT_BRANCH}"
	echo "2. Create Pull Request to main"
	echo "3. After PR approval and merge:"
	echo "   → GitHub Actions will automatically publish to GitHub Packages"
	echo "   → Storybook will be deployed to GitHub Pages"
	echo ""
	print_warning "The release will be live only after merge to main!"
}

# Execute if script is run directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
	main "$@"
fi