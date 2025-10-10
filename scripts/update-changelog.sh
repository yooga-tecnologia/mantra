#!/bin/bash

# Script para atualizar changelog automaticamente
# Recebe parâmetros: VERSION, DATE, RELEASE_URL, MERGE_TITLE, PR_NUMBER

VERSION="$1"
DATE="$2"
RELEASE_URL="$3"
MERGE_TITLE="$4"
PR_NUMBER="$5"

# Preparar entrada do changelog
if [ -n "$MERGE_TITLE" ] && [ -n "$PR_NUMBER" ]; then
  cat > temp_changelog_entry.txt << EOF
## [$VERSION] – $DATE

### 📋 $MERGE_TITLE
- **Release Notes:** [$VERSION Release Notes]($RELEASE_URL)
- **Pull Request:** [#$PR_NUMBER](https://github.com/yooga-tecnologia/mantra/pull/$PR_NUMBER)

EOF
else
  cat > temp_changelog_entry.txt << EOF
## [$VERSION] – $DATE

### 📋 Release $VERSION
- **Release Notes:** [$VERSION Release Notes]($RELEASE_URL)

EOF
fi

# Backup do changelog atual
cp CHANGELOG.md CHANGELOG.md.bak

# Inserir nova entrada após o cabeçalho
awk '
BEGIN { inserted = 0 }
/^## \[/ && inserted == 0 { 
  while ((getline line < "temp_changelog_entry.txt") > 0) {
    print line
  }
  close("temp_changelog_entry.txt")
  inserted = 1 
}
{ print }
' CHANGELOG.md.bak > CHANGELOG.md

# Se não encontrou nenhuma entrada existente, adicionar no final do cabeçalho
if ! grep -q "## \[$VERSION\]" CHANGELOG.md; then
  awk '
  /^Este projeto segue/ { 
    print; 
    print ""; 
    while ((getline line < "temp_changelog_entry.txt") > 0) {
      print line
    }
    close("temp_changelog_entry.txt")
    next 
  }
  { print }
  ' CHANGELOG.md.bak > CHANGELOG.md
fi

# Limpar arquivo temporário
rm -f temp_changelog_entry.txt

echo "📝 Changelog updated with version $VERSION"