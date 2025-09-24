# 🔄 Workflow de Release Atual - Mantra

## 📋 Processo Simplificado (Sem Tags)

### 1. **Preparação do Release**

```bash
# Em uma branch de feature (não na main)
npm run release
```

### 2. **O script automaticamente:**

- ✅ Verifica se não está na branch main
- ✅ Executa testes (`npm test`)
- ✅ Faz build (`npm run build`)
- ✅ Atualiza versão no `package.json`
- ✅ Lembra de atualizar `CHANGELOG.md`
- ✅ Commita as mudanças

### 3. **Após o script:**

```bash
# Push da branch
git push origin feat/sua-branch

# Criar Pull Request para main
```

### 4. **Após merge na main:**

**GitHub Actions automaticamente:**

- 🔄 Faz build do projeto
- 📦 Publica no GitHub Packages
- 🌐 Deploy do Storybook no GitHub Pages
- 📚 Atualiza documentação Jekyll

## ⚡ Vantagens do Workflow Atual

- ✅ **Sem tags Git** - processo mais simples
- ✅ **Release automático** via GitHub Actions
- ✅ **Menos passos manuais** - reduz erros
- ✅ **Deploy contínuo** integrado
- ✅ **Revisão por PR** antes do release

## 🚨 Importantes

- ❌ **Nunca** rode release na branch `main`
- ✅ **Sempre** use branches de feature
- ✅ **Sempre** atualize `CHANGELOG.md`
- ✅ **Aguarde** GitHub Actions após merge
- ✅ **Use PR** para revisão antes do release

---

**Este workflow é otimizado para o repositório atual e não requer uso de tags Git.**
