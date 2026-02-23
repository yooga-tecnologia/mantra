import type { StoryFn, StoryObj } from '@storybook/html';

import { buttonColorVariantsArray, ButtonProps, buttonSizeVariantsArray, buttonStyleArray } from './button.types';
import { ICON_OPTIONS } from '../icon/icon.utils';
import { ThemePalette, themePalettesArray } from '@theme/theme.types';
import { HTMLString } from 'src/utils/utils';

type Story = StoryObj;

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O componente **mnt-button** é um botão com várias variantes e tamanhos.
Utilizado para disparar uma ação ou evento.

Veja o protótipo oficial no [Figma](https://www.figma.com/design/ezr4b0ZxjmeWjASveGQoJS/-1-Core-Components?node-id=407-766&t=dfwzJtcmToPhfZLN-4)

### Recomendações:
- Variantes de estilo:
  - \`emphasis\`: Ações principais, onde botão é o foco da ação e precisa ser destacado.
  - \`regular\` e \`stroke\`: Ações secundárias, onde botão precisa ser destacado mas não é o foco da ação.
  - \`plain\`: Ações secundárias, onde botão não precisa ser destacado.
  - \`link\`: Ações de navegação, onde botão direciona para outras páginas ou seções da aplicação.
  - \`filter\`: Ações de filtros -> Tem uma leve diferença visual e limitação de uso em relação aos demais estilos.
- Ícones: É possível adicionar ícones à esquerda e à direita do botão, utilizando propriedades \`icon-left\` e \`icon-right\`. Por padrão, não são exibidos.
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'O texto exibido no botão',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    color: {
      control: 'select',
      options: buttonColorVariantsArray,
      description: 'Variante de cor do botão',
      table: {
        type: { summary: buttonColorVariantsArray.join(' | ') },
        defaultValue: { summary: 'neutral' },
      },
    },
    variant: {
      control: 'select',
      options: buttonStyleArray,
      description: 'Variante de estilo do botão',
      table: {
        type: { summary: buttonStyleArray.join(' | ') },
        defaultValue: { summary: 'regular' },
      },
    },
    size: {
      control: 'select',
      options: buttonSizeVariantsArray,
      description: 'Tamanho do botão',
      table: {
        type: { summary: buttonSizeVariantsArray.join(' | ') },
        defaultValue: { summary: 'medium' },
      },
    },
    state: {
      control: 'select',
      options: ['default', 'pressed'],
      description: 'Estado visual do botão. Utilizado para indicar quando um botão está selecionado / pressionado. Útil para indicar um estado de seleção de filtros.',
      table: {
        type: { summary: 'default | pressed' },
        defaultValue: { summary: 'default' },
      },
    },
    iconLeft: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Ícone exibido à esquerda do botão. Veja todas as opções de ícones no [Icon Component](../icon).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    iconRight: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Ícone exibido à direita do botão. Veja todas as opções de ícones no [Icon Component](../icon).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-button ${args}></mnt-button>
    `;
  },
};

const ButtonTemplate = (props: ButtonProps) => {
  return `
    <mnt-button
      label="${props.label}"
      color="${props.color}"
      variant="${props.variant}"
      size="${props.size}"
      state="${props.state || 'default'}"
      icon-left="${props.iconLeft || '' }"
      icon-right="${props.iconRight || '' }"
    ></mnt-button>
  `;
}

export const Regular: Story = {
  args: {
    label: 'Click me',
    color: 'primary',
    variant: 'regular',
    size: 'medium',
  },
  render: ButtonTemplate,
};

export const Emphasis: Story = {
  args: {
    label: 'Click me',
    color: 'primary',
    variant: 'emphasis',
    size: 'medium',
  },
  render: ButtonTemplate,
};

export const Stroke: Story = {
  args: {
    label: 'Click me',
    color: 'primary',
    variant: 'stroke',
    size: 'medium',
  },
  render: ButtonTemplate,
};

export const Plain: Story = {
  args: {
    label: 'Click me',
    color: 'primary',
    variant: 'plain',
    size: 'medium',
  },
  render: ButtonTemplate,
};

export const Link: Story = {
  args: {
    label: 'Click me',
    color: 'primary',
    variant: 'link',
    size: 'medium',
  },
  render: ButtonTemplate,
};

export const Filter: Story = {
  args: {
    label: 'Click me',
    variant: 'filter',
    color: 'primary',
    size: 'medium',
    state: 'default',
  },
  render: ButtonTemplate,
};


const getColorVariants = (color: ThemePalette) => {
  const buttonVariants: string[] = [];

  buttonStyleArray
    .filter((variant) => variant !== 'filter')
    .map((variant) => {
      buttonVariants.push(`<span>${variant}</span>`);
      buttonSizeVariantsArray.map((size) => {
        buttonVariants.push(ButtonTemplate({ label: 'Click me', color, variant, size, iconLeft: 'plus', iconRight: 'plus' }));
      });
    });
  return `
<div class="sb-section-box">
  <h4>${color}</h4>
  <div class="sb-grid-4 sb-grid-row-divider sb-grid-row-title">
    ${buttonVariants.join('')}
  </div>
</div>
`;
}
/**
 * Todas as variantes e estados
 */
export const AllVariants: StoryFn = () => {
  const buttonVariants: HTMLString[] = [];
  themePalettesArray.forEach((color) => {
    buttonVariants.push(getColorVariants(color));
  });

  return `
<div>
${buttonVariants.join('')}
</div>

<div class="sb-section-box">
  <h4>Filter</h4>
  <div class="sb-grid-4 sb-grid-row-divider sb-grid-row-title">
    <span>Default</span>
    <mnt-button label="Click me" variant="filter" size="small" state="default"></mnt-button>
    <mnt-button label="Click me" variant="filter" size="medium" state="default"></mnt-button>
    <mnt-button label="Click me" variant="filter" size="large" state="default"></mnt-button>
  </div>
  <div class="sb-grid-4 sb-grid-row-divider sb-grid-row-title">
    <span>Pressed</span>
    <mnt-button label="Click me" variant="filter" size="small" state="pressed"></mnt-button>
    <mnt-button label="Click me" variant="filter" size="medium" state="pressed"></mnt-button>
    <mnt-button label="Click me" variant="filter" size="large" state="pressed"></mnt-button>
  </div>
</div>
`;
};
