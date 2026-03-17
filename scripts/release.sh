#!/bin/bash

# 🚀 Mantra Release Script
# Suporta branches v2 (legacy) e main (v3+)

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

get_base_branch() {
	local major=$1
	if [ "$major" = "2" ]; then
		echo "v2"
	else
		echo "main"
	fi
}

main() {
	print_header

	# Check if we're in the right directory
	if [ ! -f "package.json" ]; then
		print_error "package.json not found! Run from project root."
		exit 1
	fi

	# Check if we're not on a protected branch
	CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
	if [ "$CURRENT_BRANCH" = "main" ] || [ "$CURRENT_BRANCH" = "v2" ]; then
		print_error "Don't run releases directly on ${CURRENT_BRANCH} branch!"
		if [ "$CURRENT_BRANCH" = "v2" ]; then
			print_info "Create a feature branch first: git checkout -b feat/my-component"
		else
			print_info "Create a feature branch first: git checkout -b feat/my-component"
		fi
		exit 1
	fi

	print_info "Current branch: ${CURRENT_BRANCH}"

	# Get current version and calculate next versions
	CURRENT_VERSION=$(node -p "require('./package.json').version")

	# Extract version parts
	IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

	BASE_BRANCH=$(get_base_branch "$MAJOR")

	# Calculate next versions
	NEXT_PATCH="$MAJOR.$MINOR.$((PATCH + 1))"
	NEXT_MINOR="$MAJOR.$((MINOR + 1)).0"
	NEXT_MAJOR="$((MAJOR + 1)).0.0"

	print_info "Current version: ${CURRENT_VERSION}"
	print_info "Base branch (PR target): ${BASE_BRANCH}"
	echo ""

	# Show release options based on base branch
	print_info "Select release type:"
	echo -e "1) ${YELLOW}Patch${NC} (x.x.${YELLOW}Z${NC}) → ${CURRENT_VERSION} → ${NEXT_PATCH}"
	echo -e "   ${BLUE}ℹ️  Bug fixes, small improvements${NC}"
	echo ""
	echo -e "2) ${YELLOW}Minor${NC} (x.${YELLOW}Y${NC}.0) → ${CURRENT_VERSION} → ${NEXT_MINOR}"
	echo -e "   ${BLUE}ℹ️  New features, backward compatible${NC}"
	echo ""

	if [ "$BASE_BRANCH" = "v2" ]; then
		echo "3) Exit"
		print_warning "Major releases are not allowed on the v2 branch."
		echo ""
		read -p "Enter your choice (1-3): " choice
	else
		echo -e "3) ${YELLOW}Major${NC} (${YELLOW}X${NC}.0.0) → ${CURRENT_VERSION} → ${NEXT_MAJOR}"
		echo -e "   ${BLUE}ℹ️  Breaking changes, API changes${NC}"
		echo ""
		echo "4) Exit"
		echo ""
		read -p "Enter your choice (1-4): " choice
	fi

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
			if [ "$BASE_BRANCH" = "v2" ]; then
				print_info "Release cancelled"
				exit 0
			fi
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
	fi

	# Pre-flight checks
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
	echo "2. Create Pull Request to ${BASE_BRANCH}"
	echo "3. After PR approval and merge:"

	if [ "$BASE_BRANCH" = "v2" ]; then
		echo "   → GitHub Actions will publish ${NEW_VERSION} to GitHub Packages (tag: legacy)"
		echo "   → ionic-yooga-app pode atualizar com: npm update @yooga-tecnologia/mantra"
	else
		echo "   → GitHub Actions will publish ${NEW_VERSION} to GitHub Packages (tag: latest)"
		echo "   → Storybook will be deployed to GitHub Pages"
	fi
	echo ""
	print_warning "The release will be live only after merge to ${BASE_BRANCH}!"
}

# Execute if script is run directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
	main "$@"
fi
