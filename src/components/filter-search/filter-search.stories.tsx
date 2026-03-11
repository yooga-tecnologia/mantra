import type { StoryObj } from '@storybook/html-vite';

import { FilterSearchProps, filterSearchSizeVariantsArray } from './filter-search.types';

type Story = StoryObj;

export default {
  title: 'Forms/FilterSearch',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded', // ATENÇÃO: full-width não funciona com layout "centered"
    docs: {
      description: {
        component: `
O componente \`mnt-filter-search\` é um elemento utilizado para realizar buscas.
        `,
      },
      codePanel: true,
      source: {
        transform: (_: string, storyContext: StoryObj) => {
          return FilterSearchTemplate(storyContext.args as FilterSearchProps);
        },
      },
    },
  },
  argTypes: {
    inputName: {
      control: 'text',
      description: 'Nome do campo utilizado para identificação no formulário',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Texto exibido como placeholder no campo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    size: {
      control: 'select',
      options: filterSearchSizeVariantsArray,
      description: 'Tamanho do campo',
      table: {
        type: { summary: filterSearchSizeVariantsArray.join(' | ') },
        defaultValue: { summary: 'medium' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Se o campo deve ocupar a largura total da tela',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  render: (args) => FilterSearchTemplate(args as FilterSearchProps),
};

const FilterSearchTemplate = (props: FilterSearchProps) => {
  return `
    <mnt-filter-search
      size="${props.size || 'medium'}"
      input-name="${props.inputName || ''}"
      full-width="${props.fullWidth || false}"
      placeholder="${props.placeholder || ''}"
    ></mnt-filter-search>`;
};

export const Default: Story = {
  args: {},
  render: FilterSearchTemplate,
};

/**
 * Exemplo de uso de atributos nativos do input
 */
export const NativeAttributes: Story = {
  args: {
    type: 'text',
    inputName: 'firstName',
    size: 'medium',
    placeholder: 'Enter your first name',
  },
  parameters: {
    docs: {
      source: {
        code: `
          <mnt-filter-search type="text" input-name="firstName" size="medium" placeholder="Enter your first name" autofocus autocomplete="on"></mnt-filter-search>
        `,
      },
    },
  },
  render: ({ size = 'medium', inputName = '', fullWidth = false, placeholder = '' }: FilterSearchProps) => {
    return `
      <mnt-filter-search
        size="${size}"
        input-name="${inputName}"
        full-width="${fullWidth}"
        placeholder="${placeholder}"
        autofocus
        autocomplete="on"
      ></mnt-filter-search>
    `;
  },
};
