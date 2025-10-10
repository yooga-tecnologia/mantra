# 🤖 Sistema de Release Automatizado

Este projeto agora possui um sistema completamente automatizado para releases que funciona da seguinte forma:

## 🔄 Fluxo Automatizado

### 1. **Ao fazer merge na main:**
- ✅ **Executar testes** automaticamente
- 🔍 **Detectar mudança de versão** no `package.json`
- 📦 **Build do projeto** e Storybook
- 📚 **Publicar no GitHub Packages**

### 2. **Se a versão mudou:**
- 📋 **Extrair informações do PR** (título, descrição, número)
- 📝 **Criar Release Notes** com:
  - Título do PR como cabeçalho
  - Descrição completa do PR
  - Data, versão e link do PR
- 🔗 **Atualizar CHANGELOG.md** como **índice**:
  - Data de publicação
  - Título do PR
  - Link para o Release Notes correspondente
  - Link para o Pull Request
- 🚀 **Deploy automático** para GitHub Pages

## 📋 Formato do CHANGELOG (Índice)

O changelog agora funciona como um **índice conciso** ao invés de documentação extensa:

```markdown
## [2.5.0] – 2025-10-08

### 📋 feat: adicionar componente TabGroup
- **Release Notes:** [2.5.0 Release Notes](https://github.com/yooga-tecnologia/mantra/releases/tag/v2.5.0)
- **Pull Request:** [#42](https://github.com/yooga-tecnologia/mantra/pull/42)

## [2.4.2] – 2025-10-07

### 📋 fix: corrigir bug no componente Icon
- **Release Notes:** [2.4.2 Release Notes](https://github.com/yooga-tecnologia/mantra/releases/tag/v2.4.2)
- **Pull Request:** [#41](https://github.com/yooga-tecnologia/mantra/pull/41)
```

## 📝 Release Notes Detalhados

Toda a documentação detalhada fica nas **Release Notes do GitHub**, incluindo:

- 🎯 **Descrição completa** das mudanças (do corpo do PR)
- 📸 **Screenshots** ou exemplos (se incluídos no PR)
- ⚡ **Breaking changes** documentados
- 🔗 **Links** para issues relacionadas

## 🛠 Como usar

### Para desenvolvedores:

1. **Crie um PR** com título descritivo
2. **Documente bem** a descrição do PR (será usada nas release notes)
3. **Atualize a versão** no `package.json` seguindo [semantic versioning](https://semver.org/)
4. **Faça o merge** - o resto é automático! ✨

### Para releases:

1. **Use o script interativo** (opcional, para releases manuais):
   ```bash
   npm run release
   ```

2. **Ou simplesmente** atualize a versão no PR e faça merge - será detectado automaticamente!

## 🎯 Benefícios

- ✅ **Zero trabalho manual** após merge
- 📚 **Documentação rica** nas Release Notes  
- 📋 **Changelog conciso** como índice
- 🔗 **Rastreabilidade total** (PR → Release → Changelog)
- ⚡ **Deploy automático** após testes
- 🎨 **Consistência** na documentação

## 🔧 Arquivos do Sistema

- `.github/workflows/deploy.yaml` - Pipeline principal
- `scripts/update-changelog.sh` - Script de atualização do changelog
- `scripts/release.sh` - Script interativo (opcional)

---

💡 **Dica:** Escreva descrições de PR detalhadas, pois elas se tornarão suas release notes!