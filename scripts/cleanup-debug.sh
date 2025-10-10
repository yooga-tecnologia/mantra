#!/bin/bash

# 🧹 Script para limpar arquivos de debug

echo "🧹 Cleaning up debug files..."

# Remover workflow de debug
if [ -f ".github/workflows/debug-release.yaml" ]; then
    rm .github/workflows/debug-release.yaml
    echo "✅ Removed debug workflow"
fi

# Remover script de debug
if [ -f "scripts/debug-workflow.sh" ]; then
    rm scripts/debug-workflow.sh
    echo "✅ Removed debug script"
fi

# Remover backups
rm -f CHANGELOG.md.bak
rm -f temp_changelog_entry.txt

echo "✅ Debug cleanup completed!"
echo "💡 Don't forget to delete the test/workflow-debug branch after merging"