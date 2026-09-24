import type { StoryObj } from '@storybook/html-vite';

type Story = StoryObj;

const BASIC_ITEMS = JSON.stringify([
  { value: 'edit', label: 'Editar' },
  { value: 'duplicate', label: 'Duplicar' },
  { value: 'archive', label: 'Arquivar' },
  { value: 'delete', label: 'Excluir' },
]);

const WITH_ICONS_ITEMS = JSON.stringify([
  { value: 'edit', label: 'Editar', icon: 'pencil' },
  { value: 'duplicate', label: 'Duplicar', icon: 'copy' },
  { value: 'archive', label: 'Arquivar', icon: 'archive' },
  { value: 'delete', label: 'Excluir', icon: 'trash', separator: true },
]);

const WITH_DISABLED_ITEMS = JSON.stringify([
  { value: 'edit', label: 'Editar', icon: 'pencil' },
  { value: 'duplicate', label: 'Duplicar', icon: 'copy', disabled: true },
  { value: 'archive', label: 'Arquivar', icon: 'archive' },
  { value: 'delete', label: 'Excluir', icon: 'trash', separator: true },
]);

export default {
  title: 'Navigation/DropdownMenu',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      codePanel: true,
      description: {
        component: `
O componente \`mnt-dropdown-menu\` exibe um menu suspenso acionado por um \`mnt-button\` configurável.
Diferente do \`mnt-options-list\`, ele **não é associado a formulários** — cada item dispara uma ação via evento \`menuSelect\`.

**Props do trigger (repassadas ao \`mnt-button\`):**
- \`label\`: texto do botão
- \`icon-left\` / \`icon-right\`: ícones do botão (padrão: caret-down à direita)
- \`color\`: cor do botão (\`neutral\`, \`primary\`, \`danger\`…)
- \`variant\`: estilo do botão (\`stroke\`, \`regular\`, \`emphasis\`, \`plain\`…)
- \`size\`: tamanho (\`tiny\`, \`small\`, \`medium\`, \`large\`)
- \`disabled\`: desabilita o trigger e o menu
- \`full-width\`: trigger ocupa 100% da largura

**Props do menu:**
- \`items\`: JSON com os itens. Cada item aceita \`value\`, \`label\`, \`icon\`, \`disabled\`, \`separator\`

**Evento:**
- \`menuSelect\`: emitido ao clicar num item — payload \`{ value, label }\`

**Acessibilidade:**
- Navegação por teclado (Tab, Enter, Space, ArrowUp/Down, Escape)
- ARIA roles: \`menu\`, \`menuitem\`
        `,
      },
    },
  },
};

/**
 * Trigger padrão (variant `stroke`, color `neutral`) com label e caret.
 */
export const Default: Story = {
  render: () => `<mnt-dropdown-menu
    label="Ações"
    items='${BASIC_ITEMS}'
  ></mnt-dropdown-menu>`,
};

/**
 * Itens com ícone à esquerda do label + separador antes do item destrutivo.
 */
export const WithIcons: Story = {
  render: () => `<mnt-dropdown-menu
    label="Ações"
    items='${WITH_ICONS_ITEMS}'
  ></mnt-dropdown-menu>`,
};

/**
 * Variant `emphasis` com color `primary`.
 */
export const EmphasisPrimary: Story = {
  render: () => `<mnt-dropdown-menu
    label="Ações"
    variant="emphasis"
    color="primary"
    items='${WITH_ICONS_ITEMS}'
  ></mnt-dropdown-menu>`,
};

/**
 * Variant `plain` — sem borda, fundo transparente.
 */
export const Plain: Story = {
  render: () => `<mnt-dropdown-menu
    label="Mais opções"
    variant="plain"
    items='${WITH_ICONS_ITEMS}'
  ></mnt-dropdown-menu>`,
};

/**
 * Ícone à esquerda do label no trigger.
 */
export const WithIconLeft: Story = {
  render: () => `<mnt-dropdown-menu
    label="Configurações"
    icon-left="gear"
    items='${WITH_ICONS_ITEMS}'
  ></mnt-dropdown-menu>`,
};

/**
 * Tamanho `small`.
 */
export const Small: Story = {
  render: () => `<mnt-dropdown-menu
    label="Ações"
    size="small"
    items='${WITH_ICONS_ITEMS}'
  ></mnt-dropdown-menu>`,
};

/**
 * Trigger desabilitado — não abre o menu.
 */
export const Disabled: Story = {
  render: () => `<mnt-dropdown-menu
    label="Ações"
    disabled
    items='${WITH_ICONS_ITEMS}'
  ></mnt-dropdown-menu>`,
};

/**
 * Itens desabilitados — aparecem acinzentados e não disparam eventos.
 */
export const WithDisabledItems: Story = {
  render: () => `<mnt-dropdown-menu
    label="Ações"
    items='${WITH_DISABLED_ITEMS}'
  ></mnt-dropdown-menu>`,
};

/**
 * `selected-value` marca visualmente o item ativo com um ✓ e destaque azul.
 * O consumidor atualiza a prop após o evento `menuSelect` para persistir a seleção.
 */
export const WithSelectedValue: Story = {
  render: () => `
    <mnt-dropdown-menu
      id="menu-selection-demo"
      label="Status"
      selected-value="active"
      items='${WITH_ICONS_ITEMS}'
    ></mnt-dropdown-menu>
    <script>
      (function () {
        var menu = document.getElementById('menu-selection-demo');
        if (menu) {
          menu.addEventListener('menuSelect', function (e) {
            menu.setAttribute('selected-value', e.detail.value);
          });
        }
      })();
    </script>
  `,
};

/**
 * Full-width — trigger e menu ocupam toda a largura do container.
 */
export const FullWidth: Story = {
  parameters: { layout: 'padded' },
  render: () => `<div style="width: 280px">
    <mnt-dropdown-menu
      label="Selecione uma ação"
      full-width
      items='${WITH_ICONS_ITEMS}'
    ></mnt-dropdown-menu>
  </div>`,
};
