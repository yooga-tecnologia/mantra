# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

Este projeto segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.4.0] – 2025-04-23

### 🚀 Adicionado

- Suporte às props `iconLeft`, `iconRight` e `iconAnimation` no componente **YooButton**, permitindo ícones no início e no fim do botão, com animação opcional.
- Extração e unificação do tipo `ButtonProps` para reuso em componente, Storybook e testes.
- Stories atualizados (`yoo-button.stories.ts`) para oferecer dropdown de ícones (base + direções) e animações automáticas.
- Constantes de regex e mapeamentos de direção extraídas para `yoo-icon.constants.ts`.

### ♻️ Refatorado

- Lógica de renderização de classes e spacing de ícones reorganizada em **YooButton**.
- Fallback de `<slot>` implementado para quando `label` e `icon*` não são informados.
- Uso de kebab-case (`full-width`, `icon-left`, `icon-right`) consistente em atributos e testes.
- Testes unitários (`yoo-button.spec.tsx`) reescritos com `newSpecPage`, cobrindo todos os branches (incluindo size numérico, disabled, full-width e slot).

### ✅ Corrigido

- Correção de cobertura de testes para o caminho de tamanho numérico (`size` como número).
- Ajuste no teste de `button-full-width` para usar `full-width` no host.
- Atualização de snapshots obsoletos e remoção de `toMatchSnapshot()` onde não era mais necessário.

## [1.3.0] - 2024-07-22

### 🚀 Adicionado

- Suporte a sufixos de direção (`-left`, `-right`, `-up`, `-down`) para o componente `yoo-icon`, permitindo rotação dinâmica do SVG via nome.
- Novo tipo `ExtendedIconName` e mapa `directionTransformMap` para melhorar a legibilidade e reutilização.
- Estrutura `iconSizes` criada para padronizar tamanhos e eliminar valores soltos.

### ♻️ Refatorado

- Lógica de rotação movida para mapa externo reutilizável.
- `calculateSizes()` e `setBackgroundProperties()` reorganizados para maior clareza.
- Substituído `querySelector` por `ref` no `span` de background.
- Imports de tipos atualizados com `import type` para melhor tree-shaking e legibilidade.

### ✅ Corrigido

- Autocompletar de props do componente `yoo-icon` no Storybook agora funciona corretamente.
- Estrutura do `argTypes` padronizada para exibir descrições e controles corretamente.

## [1.2.0]

- **Adicionado**

  - Acompanhamento de Changelog pelo storybook.

- **Corrigido**
  - Corrigido name da prop no storybook do componente Yoo-Illustration.

## [1.1.0]

- **Adicionado**
  - Novo componente Yoo-Illustration

## [1.0.0]

- **Adicionado**

  - Arquivos de fontes que serão utilizadas no projeto [`src/shared/assets/fonts`](src/shared/assets/fonts)
  - Estilização de tipografia

- **Corrigido**
  - Atualização de nomes de arquivos de documentação para exibir corretamente no Github (Veja [issue relacionada](https://github.com/orgs/community/discussions/143176#discussioncomment-11854454))

## [0.3.2]

- **Corrigido**

  - Arquivos scss com warnings de "deprecated" para:

  | deprecated | recommended |
  | ---------- | ----------- |
  | str-index  | str.index   |
  | str-slice  | str.slice   |
  | map-get    | map.get     |
  | @import    | @forward    |

## [0.3.1]

- **Corrigido**
  - Atualização do script `npm run dev`: remoção de flag ".watch" de `npm:build` que estava causando warning ao executar

## [0.3.0]

- **Adicionado**

  - Novo ícone (signIn)

- **Corrigido**
  - Cor do ícone(currencyDollarCircle) de black para inherit

## [0.2.1]

- **Corrigido**
  - Texto da label no storybook do componente YooButton

## [0.2.0]

- **Adicionado**
  - Ícones clockCounter, currencyDollarCircle, userCircle
