import type { Meta, StoryObj } from '@storybook/html-vite';

import type { TabItemGroupProps } from './tab-item-group.types';

type Story = StoryObj;

// ── Sample datasets ──────────────────────────────────────────────────────────

const BASIC_TABS = JSON.stringify([
  { id: 'pedidos', label: 'Pedidos' },
  { id: 'finalizados', label: 'Finalizados' },
  { id: 'cancelados', label: 'Cancelados' },
  { id: 'agendados', label: 'Agendados' },
]);

const WITH_DISABLED_TAB = JSON.stringify([
  { id: 'pedidos', label: 'Pedidos' },
  { id: 'finalizados', label: 'Finalizados' },
  { id: 'cancelados', label: 'Cancelados', disabled: true },
  { id: 'agendados', label: 'Agendados' },
]);

const WITH_ICONS_TABS = JSON.stringify([
  { id: 'pedidos', label: 'Pedidos', icon: 'list' },
  { id: 'finalizados', label: 'Finalizados', icon: 'check-circle' },
  { id: 'cancelados', label: 'Cancelados', icon: 'x-circle' },
]);

const VERTICAL_TABS = JSON.stringify([
  { id: 'resumo', label: 'Resumo' },
  { id: 'pedidos', label: 'Pedidos' },
  { id: 'clientes', label: 'Clientes' },
  { id: 'relatorios', label: 'Relatórios', disabled: true },
]);

// ── Template ─────────────────────────────────────────────────────────────────

const GroupTemplate = (props: Partial<TabItemGroupProps> & { tabs: string; selectedId?: string }) =>
  `<mnt-tab-item-group
    tabs='${props.tabs}'
    ${props.selectedId ? `selected-id="${props.selectedId}"` : ''}
    ${props.orientation ? `orientation="${props.orientation}"` : ''}
  ></mnt-tab-item-group>`;

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Navigation/TabItemGroup',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      codePanel: true,
      description: {
        component: `
O \`mnt-tab-item-group\` agrupa e gerencia a navegação entre abas, controlando o estado de seleção internamente.
É o componente recomendado para uso em vez de instanciar \`mnt-tab-item\` manualmente.

**Props:**
- \`tabs\` *(obrigatório)*: array de abas (JSON string ou array direto). Cada item aceita \`id\`, \`label\`, \`icon?\`, \`disabled?\`
- \`selected-id\`: aba pré-selecionada. Se omitido, seleciona a primeira aba não desabilitada
- \`orientation\`: \`horizontal\` (padrão) ou \`vertical\`

**Evento:**
- \`tabChange\`: emite o \`id\` da aba clicada sempre que a seleção muda
        `,
      },
    },
  },
  argTypes: {
    tabs: { control: 'text', description: 'JSON com as abas. Cada item: `{ id, label, icon?, disabled? }`.' },
    selectedId: { control: 'text', description: 'ID da aba pré-selecionada.' },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientação do grupo de abas.',
    },
  },
};

export default meta;

/** Grupo básico com 4 abas horizontais. A primeira aba é selecionada por padrão. */
export const Default: Story = {
  args: { tabs: BASIC_TABS },
  render: GroupTemplate,
};

/** Aba pré-selecionada via `selected-id`. */
export const WithPreselectedTab: Story = {
  args: { tabs: BASIC_TABS, selectedId: 'finalizados' },
  render: GroupTemplate,
};

/** Uma das abas está desabilitada — não pode ser selecionada. */
export const WithDisabledTab: Story = {
  args: { tabs: WITH_DISABLED_TAB },
  render: GroupTemplate,
};

/**
 * Abas com ícone — o layout interno de cada aba muda para coluna (ícone acima do label).
 */
export const WithIcons: Story = {
  args: { tabs: WITH_ICONS_TABS },
  render: GroupTemplate,
};

/**
 * Orientação vertical — ideal para menus laterais.
 * As abas são empilhadas em coluna.
 */
export const Vertical: Story = {
  args: { tabs: VERTICAL_TABS, orientation: 'vertical' },
  render: (props) => `
    <div style="display: flex; gap: 24px;">
      <mnt-tab-item-group
        tabs='${props.tabs}'
        orientation="vertical"
      ></mnt-tab-item-group>
      <div style="flex: 1; padding: 16px; border: 1px solid #E5E7E8; border-radius: 6px; font-size: 14px; color: #818A8F;">
        Conteúdo da aba selecionada
      </div>
    </div>
  `,
};

/**
 * Demonstra o evento `tabChange` via JavaScript.
 * Abra o Console do navegador e clique nas abas para ver o evento.
 */
export const WithEventListener: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <mnt-tab-item-group
        id="tab-group-demo"
        tabs='${BASIC_TABS}'
      ></mnt-tab-item-group>
      <p id="tab-output" style="font-size: 14px; color: #4B5053; margin: 0;">
        Aba ativa: <strong>pedidos</strong>
      </p>
    </div>
    <script>
      (function () {
        var group = document.getElementById('tab-group-demo');
        var output = document.getElementById('tab-output');
        if (group) {
          group.addEventListener('tabChange', function (e) {
            output.innerHTML = 'Aba ativa: <strong>' + e.detail + '</strong>';
          });
        }
      })();
    </script>
  `,
};
