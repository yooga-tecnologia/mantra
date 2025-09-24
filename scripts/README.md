# 📁 Scripts Directory

This directory contains automation scripts for the Mantra library development workflow.

## Available Scripts

### 🚀 `release.sh`

Interactive release script otimizado para o workflow atual (branch-based, sem tags).

**Usage:**

```bash
npm run release
# or directly
./scripts/release.sh
```

**Features:**

- ✅ Otimizado para workflow sem tags
- ✅ Prevents releases on main branch
- ✅ Pre-flight checks (tests, build)
- ✅ Interactive version selection
- ✅ CHANGELOG reminder
- ✅ Prepares branch for PR to main
- ✅ GitHub Actions integration ready

**Usage:**

```bash
npm run release
# or directly
./scripts/release.sh
```

**Features:**

- ✅ Pre-flight checks (git status, tests, build)
- ✅ Interactive version type selection (patch/minor/major)
- ✅ Automatic version bumping
- ✅ CHANGELOG reminder
- ✅ Git commit and tagging
- ✅ Clear next steps instructions

**What it does:**

1. Checks current git status
2. Runs tests (`npm test`)
3. Builds project (`npm run build`)
4. Prompts for release type (patch/minor/major)
5. Updates `package.json` version
6. Reminds to update `CHANGELOG.md`
7. Commits changes with conventional message
8. Creates git tag
9. Shows push instructions

**Requirements:**

- Clean git working directory (or user confirmation)
- All tests must pass
- Build must succeed
- User must update CHANGELOG.md

## Adding New Scripts

When adding new scripts to this directory:

1. **Make them executable:**

   ```bash
   chmod +x scripts/your-script.sh
   ```

2. **Add npm script shortcut:**

   ```json
   "your-command": "bash scripts/your-script.sh"
   ```

3. **Document them here** in this README

4. **Follow conventions:**
   - Use bash shebang: `#!/bin/bash`
   - Add error handling: `set -e`
   - Use colored output for better UX
   - Provide clear success/error messages

## Script Development Guidelines

### Colors

```bash
RED='\033[0;31m'
GREEN='\033[0;32m'  
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color
```

### Helper Functions

```bash
print_success() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
```

### Error Handling

```bash
set -e  # Exit on any error

# Check prerequisites
if [ ! -f "package.json" ]; then
    print_error "Not in project root!"
    exit 1
fi
```
