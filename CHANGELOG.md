# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

Este projeto segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [2.5.0] – 2025-10-13

### 🚀 Adicionado

- **Brand**: Componente responsável por exibir logotipos e identidades visuais de marcas parceiras e do próprio sistema

## [2.4.4] – 2025-10-10

### 🚀 Adicionado

- Variantes de Icon:
  - Calculator

## [2.4.3] – 2025-10-02

### 🐛 Correções

- **Tooltip**: Correção do problema do tooltip não ajustar com o tamanho do texto

## [2.4.1] – 2025-10-02

### 🚀 Adicionado

- Variantes de Icon:
  - House simple

## [2.4.0] – 2025-09-24

### 🚀 Adicionado

- **IconLarge**: Novo componente para ícones de maior complexidade visual
  - Suporte a tamanhos específicos para ilustrações detalhadas (32px-128px)
  - ViewBox otimizado (64x64) para melhor qualidade em tamanhos maiores
  - Biblioteca de ícones complexos: `placeholder`, `gear`, `store`, `box`, `fastFood`
  - Documentação completa no Storybook com recomendações de uso

### ✨ Melhorado

- **Icon**: Aprimoramentos substanciais no componente principal
  - Suporte a tamanhos numéricos além dos pré-definidos (ex: `size="50"`)
  - Sistema de fallback robusto para tamanhos inválidos (fallback para `medium`)
  - Avisos UX no console para uso inadequado de `background` em tamanhos pequenos
  - Melhor estrutura de classes CSS com prefixos consistentes (`mnt-icon-*`)
  - Renderização condicional otimizada (sem wrapper desnecessário quando sem background)

### 🧪 Testes

- **Cobertura completa (100%)** para componentes Icon e IconLarge
- Testes abrangentes para todos os cenários:
  - Validação de tamanhos (pré-definidos, numéricos, inválidos)
  - Sistema de avisos de console
  - Comportamento de background e fallbacks
  - Propriedades de cor e transformações
  - Edge cases e tratamento de erros

### 🔧 Configuração

- **ESLint**: Configuração global para ignorar variáveis Stencil (`h`, `Fragment`)
  - Elimina warnings desnecessários em todos os componentes
  - Melhora experiência de desenvolvimento
  - Configuração centralizada em `eslint.config.js`

### 📚 Documentação

- **Storybook**: Melhorias significativas na documentação
  - Separação clara entre `Icon` e `IconLarge` com explicações de quando usar cada um
  - Exemplos práticos e recomendações de tamanhos
  - Playground interativo para ambos componentes
  - Listagem categorizada de todos os ícones disponíveis

### ♻️ Refatoração

- **Tipos TypeScript**: Estrutura melhorada e mais consistente
  - Interfaces `IconBaseProps`, `IconProps` e `IconLargeProps` bem definidas
  - Tipos de tamanho específicos para cada componente
  - Melhor inferência de tipos e autocompletar no IDE
- **Utilitários**: Funções reorganizadas para suportar ambos tipos de ícone
  - `getIconSvgByName()` com suporte a flag `isLarge`
  - Constantes organizadas por categoria de ícone

### 🐛 Correções

- **Size handling**: Correção do bug que causava "undefinedpx" para tamanhos inválidos
- **Background behavior**: Esclarecimento sobre quando spans de background são criados
- **CSS classes**: Padronização de nomenclatura com prefixos `mnt-*`
- **Documentation**: READMEs gerados automaticamente atualizados e consistentes

---

**BREAKING CHANGE**: Introdução do componente `IconLarge` com mapeamento de tamanhos diferentes do componente `Icon` padrão.

## [2.3.2] – 2025-09-18

### ✅ Corrigido

- Icon
  - documentação: listagem de ícones
  - question:
    - Ajuste de posicionamento do SVG
    - Renomeado para `questionCircle`
    - Movido para a categoria UI_ACTIONS_ICONS
  - xCircle:
    - Renomeado para `closeCircle`

## [2.3.1] – 2025-09-11

### 🚀 Adicionado

- TextField:
  - Suporte a atributos nativos do input: maxLength, minLength, max, min, value
  - Suporte à prop mask com opção de máscara de moeda (currency)
  - Emissão de dois eventos:
    - valueChange (valor formatado)
    - rawValueChange (valor numérico sem formatação, útil para integrações e validações)
  - Documentação e exemplos no Storybook atualizados para destacar:
    - Integração com formulários nativos
    - Propagação de eventos nativos (onInput, onChange, etc.)
    - Uso de atributos nativos e máscaras
    - Tipos e documentação do componente atualizados para refletir as novas props e eventos

- Icon:
  - Criação de categorias para facilitar visualização no Storybook
  - Atualização de documentação: Visualização de grid de todos os ícones disponíveis para uso
  - Novas variantes adicionadas à icon-base:
    - pix
    - pencil
    - pencilSimple
    - pencilNote (Substitui "Edit")

## [2.3.0] – 2025-09-10

### 🚀 Adicionado

- Componente TextField

## [2.2.4] – 2025-09-09

### 🚀 Adicionado

- Variantes de Icon:
  - hyperlink

## [2.2.3] – 2025-08-12

### 🚀 Adicionado

- Variantes de Icon:
  - starOutline

### ✅ Corrigido

- Button: Correção de estilização da variante `full-width`

## [2.2.2] – 2025-08-11

### ✅ Corrigido

- Adiciona propriedade de font-weight correta ao label do componente badge;

## [2.2.1] – 2025-08-11

### 🚀 Adicionado

- Variantes de Icon:
  - gift
  - lockSimpleOpen
  - printer
- Substituição de 'print' por 'printer' para reproduzir corretamente definições do Figma

## [2.2.0] – 2025-08-08

### 🚀 Adicionado

- Badge;

## [2.1.1] – 2025-08-07

### ✅ Corrigido

- A forma de importação de tipos estava quebrando a execução de aplicações Angular(v12.2.17)

## [2.1.0] – 2025-08-06

### 🚀 Adicionado

- ButtonIcon;

## [2.0.1] – 2025-07-23

### ♻️ Refatorado

- Esquema de cores utilizados em botões para refletir atualizações do Figma;

### 🚀 Adicionado

- Button: Variante "warning";

## [2.0.0] – 2025-07-18

### ♻️ Refatorado

Refatoração de todos os componentes com o objetivo de viabilizar compatibilidade em projetos com elementos homônimos.

- Revisão e padronização de classes CSS em todos os componentes para evitar conflitos e melhorar a manutenção.
- Atualização de testes unitários para cobrir cenários adicionais, como o comportamento de slots e atributos.
- Atualização da documentação no Storybook para refletir as mudanças realizadas.

## [1.5.2] – 2025-07-15

### ✅ Corrigido

- **Nome do evento click no componente YooButton**: O evento decorado com `@Event()` foi renomeado de `onClick` para `buttonClick` para evitar conflitos com o evento nativo do DOM `click`/`onClick`. Essa mudança elimina o aviso de build e garante que o evento personalizado seja emitido corretamente sem interferir nos eventos nativos.

## [1.5.1] – 2025-07-14

### 🚀 Adicionado

- **Suporte ao evento `onClick` no componente YooButton:** Agora é possível emitir eventos personalizados ao clicar no botão, permitindo maior flexibilidade para integração com diferentes fluxos de aplicação.
- **Melhorias no Storybook:** Ajustes nos controles (argTypes) para exibir corretamente os valores predefinidos (como `variant`, `color`, `size`, `iconLeft` e `iconRight`) sem simplificar os tipos para "string".

### ♻️ Refatorado

- **Estrutura de testes unitários:** Reorganização dos testes para cobrir cenários adicionais, como o comportamento do evento `onClick` e validação de atributos como `disabled` e `fullWidth`;
- **Estilos do componente YooButton:** Centralização de estilos base e variantes em arquivos separados (`__base.scss` e `_variant-*.scss`), garantindo maior modularidade e consistência.

### ✅ Corrigido

- **Comportamento do evento `onClick`:** Ajuste para garantir que funções definidas no atributo `onClick` sejam executadas corretamente, tanto no navegador quanto nos testes unitários.
- **Tamanho de ícones do botão:** Ajuste para aplicar tamanhos corretos dos ícones dos botões.

## [1.5.0] – 2025-07-08

### 🚀 Adicionado

- Novo componente `yoo-tooltip`, um tooltip customizado com suporte às posições `top`, `bottom`, `left` e `right`.
- Suporte ao slot `trigger`, permitindo customização do elemento que aciona a tooltip.
- Prop `text` para exibição do conteúdo textual da tooltip.
- Acessibilidade via foco do teclado (`focusin` e `focusout`) ativada por padrão.
- ID dinâmico aplicado ao `role="tooltip"` para associação futura com `aria-describedby`.

### ✅ Testado

- Cobertura de testes unitários para `mouseenter`, `mouseleave`, `focusin`, `focusout` e aplicação dinâmica das classes de posição (`top`, `bottom`, `left`, `right`).
- Cobertura total de 100% de statements, branches, functions e lines.

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
