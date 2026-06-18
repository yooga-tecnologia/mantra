import type { StoryObj } from '@storybook/html-vite';

import { OptionsListProps } from './options-list.types';

type Story = StoryObj;

const STRING_ITEMS = JSON.stringify(['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4']);

const KEY_VALUE_ITEMS = JSON.stringify([
  { es: 'Espírito Santo' },
  { sp: 'São Paulo' },
  { rj: 'Rio de Janeiro' },
  { mg: 'Minas Gerais' },
]);

const EXPLICIT_ITEMS = JSON.stringify([
  { value: '1', label: 'Opção Um' },
  { value: '2', label: 'Opção Dois' },
  { value: '3', label: 'Opção Três' },
]);

const LONG_ITEMS = JSON.stringify([
  { ac: 'Acre' },
  { al: 'Alagoas' },
  { ap: 'Amapá' },
  { am: 'Amazonas' },
  { ba: 'Bahia' },
  { ce: 'Ceará' },
  { df: 'Distrito Federal' },
  { es: 'Espírito Santo' },
  { go: 'Goiás' },
]);

const OptionsListTemplate = (props: Partial<OptionsListProps> & { items?: string }) =>
  `<mnt-options-list
    ${props.name ? `name="${props.name}"` : ''}
    ${props.placeholder ? `placeholder="${props.placeholder}"` : ''}
    ${props.items ? `items='${props.items}'` : ''}
    ${props.value ? `value="${props.value}"` : ''}
    ${props.fullWidth ? 'full-width' : ''}
  ></mnt-options-list>`;

export default {
  title: 'Forms/OptionsList',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      codePanel: true,
      description: {
        component: `
O componente \`mnt-options-list\` exibe uma lista de opções selecionáveis, funcionando como um \`<select>\` nativo. Permite seleção única e deseleção clicando no item selecionado.

**Formatos aceitos para \`items\`:**
- Array de strings: \`'["item1","item2"]'\`
- Array de objetos key-value: \`'[{"es":"Espírito Santo"},{"sp":"São Paulo"}]'\`
- Array de objetos explícitos: \`'[{"value":"1","label":"Opção 1"}]'\`

**Acessibilidade:**
- Navegação por teclado completa (Tab, Enter, Space, ArrowUp/Down, Escape)
- ARIA roles: \`combobox\`, \`listbox\`, \`option\`

**Comportamento do menu:**
- O menu se posiciona automaticamente para cima ou para baixo conforme o espaço disponível na viewport
- Listas com mais de 5 itens exibem scroll interno
        `,
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Texto exibido quando nenhum item está selecionado.',
      table: { type: { summary: 'string' } },
    },
    name: {
      control: 'text',
      description: 'Nome do campo para uso em formulários HTML.',
      table: { type: { summary: 'string' } },
    },
    value: {
      control: 'text',
      description: 'Valor pré-selecionado. Deve corresponder ao `value` de um dos itens.',
      table: { type: { summary: 'string' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Quando ativo, o componente ocupa 100% da largura do container. O menu acompanha a mesma largura.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    items: {
      control: 'text',
      description: 'JSON string com os itens da lista. Aceita array de strings, objetos key-value ou objetos `{value, label}`.',
      table: { type: { summary: 'string' } },
    },
  },
};

/**
 * Uso padrão com array de strings simples.
 * O `value` de cada item é igual ao seu `label`.
 */
export const Default: Story = {
  args: {
    placeholder: 'Selecione uma opção',
    name: 'options',
    items: STRING_ITEMS,
  },
  render: OptionsListTemplate,
};

/**
 * Itens em formato key-value `{chave: label}`.
 * A chave é o `value` enviado no formulário e o valor é o label exibido.
 */
export const WithKeyValueItems: Story = {
  args: {
    placeholder: 'Selecione um estado',
    name: 'state',
    items: KEY_VALUE_ITEMS,
  },
  render: OptionsListTemplate,
};

/**
 * Itens em formato explícito `{value, label}`.
 * Útil quando `value` e `label` são completamente distintos.
 */
export const WithExplicitValueLabel: Story = {
  args: {
    placeholder: 'Selecione',
    name: 'option',
    items: EXPLICIT_ITEMS,
  },
  render: OptionsListTemplate,
};

/**
 * Item pré-selecionado via prop `value`.
 * Ao abrir, o item correspondente aparece marcado e o label é exibido no header.
 */
export const WithPreselectedItem: Story = {
  args: {
    placeholder: 'Selecione um estado',
    name: 'state',
    items: KEY_VALUE_ITEMS,
    value: 'sp',
  },
  render: OptionsListTemplate,
};

/**
 * Listas com mais de 5 itens exibem scroll interno.
 * O menu mantém altura máxima de ~5 itens (~213px).
 */
export const WithScrollableList: Story = {
  args: {
    placeholder: 'Selecione um estado',
    name: 'state',
    items: LONG_ITEMS,
  },
  render: OptionsListTemplate,
};

/**
 * Com `full-width`, o componente e seu menu ocupam 100% da largura do container.
 * Recomendado para uso em formulários onde o campo deve preencher a linha.
 *
 * **Nota:** `full-width` não funciona com layout `centered` no Storybook.
 */
export const FullWidth: Story = {
  parameters: {
    layout: 'padded',
  },
  args: {
    placeholder: 'Selecione um estado',
    name: 'state',
    items: KEY_VALUE_ITEMS,
    fullWidth: true,
  },
  render: OptionsListTemplate,
};
