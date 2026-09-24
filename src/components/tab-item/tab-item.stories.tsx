import type { Meta, StoryObj } from '@storybook/html-vite';

import type { TabItemProps } from './tab-item.types';

type Story = StoryObj;

const TabItemTemplate = (props: Partial<TabItemProps>) =>
  `<mnt-tab-item
    tab-id="${props.tabId ?? 'tab-1'}"
    label="${props.label ?? 'Tab'}"
    ${props.icon ? `icon="${props.icon}"` : ''}
    ${props.selected ? 'selected' : ''}
    ${props.disabled ? 'disabled' : ''}
    ${props.orientation ? `orientation="${props.orientation}"` : ''}
  ></mnt-tab-item>`;

const meta: Meta = {
  title: 'Navigation/TabItem',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      codePanel: true,
      description: {
        component: `
O \`mnt-tab-item\` é a unidade individual de uma aba. Normalmente utilizado dentro de \`mnt-tab-item-group\`,
mas pode ser instanciado isoladamente quando necessário.

**Props principais:**
- \`tab-id\` *(obrigatório)*: identificador único da aba
- \`label\` *(obrigatório)*: texto exibido
- \`icon\`: ícone acima do label (muda o layout para vertical interno)
- \`selected\`: marca a aba como ativa
- \`disabled\`: desabilita cliques
- \`orientation\`: \`horizontal\` (padrão) ou \`vertical\`

**Evento:**
- \`tabItemClick\`: emite o \`tab-id\` ao ser clicado
        `,
      },
    },
  },
  argTypes: {
    tabId: { control: 'text', description: 'Identificador único da aba.' },
    label: { control: 'text', description: 'Texto da aba.' },
    icon: { control: 'text', description: 'Nome do ícone exibido acima do label.' },
    selected: { control: 'boolean', description: 'Marca a aba como ativa.' },
    disabled: { control: 'boolean', description: 'Desabilita a aba.' },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientação visual da aba.',
    },
  },
};

export default meta;

/** Estado padrão — aba não selecionada. */
export const Default: Story = {
  args: { tabId: 'tab-1', label: 'Pedidos' },
  render: TabItemTemplate,
};

/** Aba marcada como selecionada. */
export const Selected: Story = {
  args: { tabId: 'tab-1', label: 'Pedidos', selected: true },
  render: TabItemTemplate,
};

/** Aba desabilitada — não dispara eventos ao clicar. */
export const Disabled: Story = {
  args: { tabId: 'tab-1', label: 'Pedidos', disabled: true },
  render: TabItemTemplate,
};

/** Com ícone — o layout interno muda para coluna (ícone acima do label). */
export const WithIcon: Story = {
  args: { tabId: 'tab-1', label: 'Pedidos', icon: 'list' },
  render: TabItemTemplate,
};

/** Com ícone e selecionado. */
export const WithIconSelected: Story = {
  args: { tabId: 'tab-1', label: 'Pedidos', icon: 'list', selected: true },
  render: TabItemTemplate,
};

/** Orientação vertical — para menus laterais ou navbars verticais. */
export const Vertical: Story = {
  args: { tabId: 'tab-1', label: 'Pedidos', orientation: 'vertical' },
  render: TabItemTemplate,
};

/** Vertical selecionado. */
export const VerticalSelected: Story = {
  args: { tabId: 'tab-1', label: 'Pedidos', orientation: 'vertical', selected: true },
  render: TabItemTemplate,
};

/** Grupo manual com três abas — demonstra a navegação por clique. */
export const ManualGroup: Story = {
  render: () => `
    <div style="display: flex; gap: 16px;">
      <mnt-tab-item tab-id="pedidos" label="Pedidos" selected></mnt-tab-item>
      <mnt-tab-item tab-id="finalizados" label="Finalizados"></mnt-tab-item>
      <mnt-tab-item tab-id="cancelados" label="Cancelados" disabled></mnt-tab-item>
    </div>
  `,
};
