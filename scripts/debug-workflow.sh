#!/bin/bash

# 🔍 Script de debug local para testar lógica do workflow
# Execute com: ./scripts/debug-workflow.sh

echo "🐛 DEBUG: Testing workflow logic locally"
echo "========================================"

# Simular variáveis do workflow
VERSION=$(node -p "require('./package.json').version")
DATE=$(date +'%Y-%m-%d')

echo "📋 Current version: $VERSION"
echo "📅 Date: $DATE"

# Testar detecção de merge commits
echo ""
echo "🔍 Testing merge commit detection..."
MERGE_COMMIT=$(git log --merges -1 --pretty=format:"%H" 2>/dev/null || echo "")

if [ -n "$MERGE_COMMIT" ]; then
    echo "✅ Found merge commit: $MERGE_COMMIT"
    
    FULL_SUBJECT=$(git log -1 --pretty=format:"%s" $MERGE_COMMIT)
    echo "📝 Full subject: $FULL_SUBJECT"
    
    PR_NUMBER=$(echo "$FULL_SUBJECT" | grep -oE '#[0-9]+' | sed 's/#//' || echo "")
    echo "🔗 PR number: $PR_NUMBER"
    
    # Tentar buscar título original do PR
    if [ -n "$PR_NUMBER" ] && command -v gh >/dev/null 2>&1; then
        echo "🔍 Trying to fetch PR title from GitHub API..."
        PR_TITLE=$(gh pr view $PR_NUMBER --json title --jq '.title' 2>/dev/null || echo "")
        if [ -n "$PR_TITLE" ]; then
            echo "✅ PR Title from API: $PR_TITLE"
            MERGE_TITLE="$PR_TITLE"
        else
            echo "⚠️ API failed, using merge title fallback"
            MERGE_TITLE=$(echo "$FULL_SUBJECT" | sed 's/ (#[0-9]*)$//')
            echo "📌 Fallback title: $MERGE_TITLE"
        fi
    else
        echo "⚠️ GitHub CLI not available or no PR number, using merge title"
        MERGE_TITLE=$(echo "$FULL_SUBJECT" | sed 's/ (#[0-9]*)$//')
        echo "📌 Title: $MERGE_TITLE"
    fi
else
    echo "⚠️  No merge commit found - will use fallback"
    PR_NUMBER="debug-123"
    MERGE_TITLE="feat(Icon): add house simple"
fi

# Testar script de changelog
echo ""
echo "🔍 Testing changelog script..."
if [ -f "./scripts/update-changelog.sh" ]; then
    echo "✅ Changelog script exists"
    
    # Criar backup para teste
    cp CHANGELOG.md CHANGELOG.md.debug-backup
    
    # Testar com dados simulados
    FAKE_RELEASE_URL="https://github.com/yooga-tecnologia/mantra/releases/tag/v$VERSION"
    
    echo "📝 Running changelog update test..."
    ./scripts/update-changelog.sh "$VERSION" "$DATE" "$FAKE_RELEASE_URL" "$MERGE_TITLE" "$PR_NUMBER"
    
    echo ""
    echo "📋 Changelog diff:"
    diff CHANGELOG.md.debug-backup CHANGELOG.md || echo "Files are identical"
    
    # Restaurar backup
    mv CHANGELOG.md.debug-backup CHANGELOG.md
    echo "✅ Changelog restored"
else
    echo "❌ Changelog script not found"
fi

# Resumo
echo ""
echo "🎯 DEBUG SUMMARY"
echo "================"
echo "Version: $VERSION"
echo "Date: $DATE"
echo "Merge commit: ${MERGE_COMMIT:-'None found'}"
echo "PR number: ${PR_NUMBER:-'None'}"
echo "Merge title: ${MERGE_TITLE:-'None'}"
echo ""
echo "✅ Local debug completed!"
echo "💡 Run the GitHub workflow debug next: push to test/workflow-debug branch"