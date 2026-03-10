import type { StoryFn, StoryObj } from '@storybook/html-vite';

import { BRANDS } from './brand-base';
import { BrandProps } from './brand.types';

type Story = StoryObj;

export default {
  title: 'Assets/Brand',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Componente padrão para exibição de logotipos e identidades visuais de marcas parceiras e do próprio sistema.

### Vantagens de uso:
- **Consistência**: Utilize a mesma marca em todo o sistema, garantindo a identidade visual consistente.
- **Facilidade de uso**: Simples e intuitivo, basta selecionar a marca e a cor desejada.
- **Flexibilidade**: Ajuste a altura e a cor da marca para atender aos diferentes contextos de uso -- evitando a necessidade de exportar imagens \`.png\` e \`.jpg\`.
        `,
      },
      codePanel: true,
      source: {
        transform: (_: string, storyContext: StoryObj) => {
          return BrandTemplate(storyContext.args as BrandProps);
        },
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(BRANDS),
      description: 'Nome da marca a ser exibida. Veja todas as opções de marcas na seção "All variants"',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    color: {
      control: 'color',
      description: 'Cor da marca a ser exibida. Utilize valor hexadecimal.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    height: {
      control: 'number',
      description: 'Altura da marca a ser exibida.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '35' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-brand ${args}></mnt-brand>
    `;
  },
};

const disableArgs = {
  controls: {
    disable: true,
  },
  actions: {
    disable: true,
  },
  interactions: {
    disable: true,
  },
};

const BrandTemplate = (props: BrandProps) => {
  return `
    <mnt-brand
      name="${props.name}"
      color="${props.color}"
      height="${props.height}"
    ></mnt-brand>
  `;
};

export const Simple: Story = {
  args: {
    name: 'yooga',
    color: '#000',
    height: 35,
  },
  render: BrandTemplate,
};

const renderAllBrands = () => {
  return Object.keys(BRANDS).map((brandName) => {
    return `
      <div class="sb-grid-3 sb-grid-row-title">
        <p class="text-color-body pl-5">${brandName.charAt(0).toUpperCase() + brandName.slice(1)}</p>
        <p class="text-color-body body-small pl-5">${BRANDS[brandName].color}</p>
        <mnt-brand name="${brandName}"></mnt-brand>
      </div>
    `;
  });
};

/**
 * Todas as variantes de marcas disponíveis para uso.
 */
export const AllVariants: StoryFn = () => {
  return `
  <div class="sb-section">
    <div class="sb-grid-3 sb-grid-row-title sb-grid-row-divider">
      <p class="label-medium-medium text-color-title">Name</p>
      <p class="label-medium-medium text-color-title">Default Color</p>
      <p class="label-medium-medium text-color-title">Redered</p>
    </div>
    ${renderAllBrands().join('')}
  </div>
  `;
};

AllVariants.parameters = disableArgs;
