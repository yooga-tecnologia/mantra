# 🚀 Processo de Release - Mantra

Este documento descreve o processo semi-automatizado para criar releases da biblioteca Mantra.

## 📋 Scripts Disponíveis

### Versionamento Simples

```bash
npm run version:patch   # 2.4.0 → 2.4.1 (correções de bugs)
npm run version:minor   # 2.4.0 → 2.5.0 (novas funcionalidades)
npm run version:major   # 2.4.0 → 3.0.0 (breaking changes)
```

### Release Completo (Recomendado)

```bash
npm run release:patch   # Atualiza versão + commita automaticamente
npm run release:minor   # Atualiza versão + commita automaticamente
npm run release:major   # Atualiza versão + commita automaticamente
```

## 🔄 Fluxo de Trabalho Recomendado

> **⚠️ Importante:** Este repositório não usa tags Git. O processo de release é baseado em **merge para main** + **GitHub Actions automático**.

### 1. **Antes de Fazer Release**

```bash
# Certifique-se de que todos os testes passam
npm test

# Verifique se o build funciona
npm run build

# Execute o pre-commit check
npm run pre-commit
```

### 2. **Atualize o CHANGELOG.md**

Antes de executar o release, **sempre** atualize manualmente o `CHANGELOG.md`:

```markdown
## [X.X.X] – YYYY-MM-DD

### 🚀 Adicionado
- Novas funcionalidades...

### ✨ Melhorado
- Melhorias em funcionalidades existentes...

### 🐛 Correções
- Bugs corrigidos...

### ♻️ Refatoração
- Mudanças internas...

### 📚 Documentação
- Melhorias na documentação...
```

### 3. **Execute o Release**

```bash
# Para correções de bug
npm run release:patch

# Para novas funcionalidades (sem quebrar compatibilidade)
npm run release:minor

# Para mudanças que quebram compatibilidade
npm run release:major
```

### 4. **Push e Tag**

```bash
# Faça push das mudanças
git push origin feat/sua-branch

# Após merge na main, crie uma tag
git tag v2.4.0
git push origin v2.4.0
```

## 📊 Critérios de Versionamento (SemVer)

### PATCH (2.4.0 → 2.4.1)

- ✅ Correções de bugs
- ✅ Melhorias de performance sem impacto na API
- ✅ Atualizações de documentação
- ✅ Correções de testes

### MINOR (2.4.0 → 2.5.0)

- ✅ Novas funcionalidades (backward compatible)
- ✅ Novos componentes
- ✅ Novas props opcionais
- ✅ Depreciação de funcionalidades (com aviso)

### MAJOR (2.4.0 → 3.0.0)

- ⚠️ Breaking changes na API
- ⚠️ Remoção de funcionalidades depreciadas
- ⚠️ Mudanças nos tipos TypeScript que quebram compatibilidade
- ⚠️ Alterações na estrutura de componentes

## 🛠️ Automatizações Futuras (Roadmap)

Para tornar o processo ainda mais automático, considere implementar:

### 1. **Conventional Commits + Standard Version**

```bash
npm install -D standard-version
# Gera CHANGELOG automaticamente baseado nos commits
```

### 2. **Husky + Lint-Staged**

```bash
npm install -D husky lint-staged
# Executa testes automaticamente antes de commits
```

### 3. **GitHub Actions para Release**

```yaml
# .github/workflows/release.yml
# Automatiza todo o processo após merge na main
```

### 4. **Commitizen para Commit Messages**

```bash
npm install -D commitizen cz-conventional-changelog
# Padroniza mensagens de commit
```

## 📝 Exemplo Prático

```bash
# 1. Desenvolva sua funcionalidade
git checkout -b feat/novo-componente

# 2. Faça os commits
git commit -m "feat(badge): add new badge component"
git commit -m "test(badge): add comprehensive test coverage"
git commit -m "docs(badge): add storybook documentation"

# 3. Antes do release, teste tudo
npm run pre-commit

# 4. Atualize o CHANGELOG.md manualmente
# (adicione detalhes sobre o novo componente)

# 5. Execute o release
npm run release:minor

```bash
# 6. Faça push e crie PR
git push origin feat/novo-componente

# 7. Crie Pull Request para main
# 8. Após merge, o release será automático via GitHub Actions
```
```

## 🚨 Importante

- **Sempre** teste antes de fazer release
- **Sempre** atualize o CHANGELOG.md manualmente  
- **Nunca** faça release diretamente na branch main
- **Sempre** use Pull Requests para merge na main
- **Aguarde** o GitHub Actions completar após merge
- **Considere** o impacto nos consumidores da biblioteca## 🤖 Workflow Automatizado (GitHub Actions)

O repositório está configurado com GitHub Actions que são **automaticamente executadas** após merge na branch `main`:

### 📋 O que acontece automaticamente:
1. **Build do projeto** (`npm run build`)
2. **Build do Storybook** (`npm run build-storybook`) 
3. **Publicação no GitHub Packages** (`npm publish`)
4. **Deploy do Storybook** no GitHub Pages
5. **Build do Jekyll** para documentação

### 🔧 Configuração atual:
```yaml
# Triggers: push para main ou workflow manual
on:
  push:
    branches: [main]
  workflow_dispatch:

# Publica automaticamente no GitHub Packages
- name: Publicar no GitHub Packages
  run: npm publish
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### ✅ Vantagens do workflow atual:
- ✅ **Sem necessidade de tags** - mais simples
- ✅ **Release automático** após merge
- ✅ **Sem intervenção manual** no processo de publicação
- ✅ **Deploy contínuo** do Storybook
- ✅ **Menos chance de erros** humanos

---

**Dúvidas?** Consulte a documentação do [Semantic Versioning](https://semver.org/) e [Keep a Changelog](https://keepachangelog.com/).
