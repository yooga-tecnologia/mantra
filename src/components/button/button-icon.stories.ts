import type { StoryFn, StoryObj } from '@storybook/html-vite';

import { buttonColorVariantsArray, ButtonIconProps, buttonSizeVariantsArray, buttonStyleArray } from './button.types';
import { ICON_OPTIONS } from '../icon/icon.utils';
import { ThemePalette, themePalettesArray } from '@theme/theme.types';
import { HTMLString } from 'src/utils/utils';

type Story = StoryObj;

export default {
  title: 'Components/Button/ButtonIcon',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O componente **mnt-button-icon** é um botão semelhante ao **mnt-button**, mas com apenas um ícone.
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
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Ícone exibido no botão. Veja todas as opções de ícones no [Icon Component](../icon).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-button-icon ${args}></mnt-button-icon>
    `;
  },
};

const ButtonIconTemplate = (props: ButtonIconProps) => {
  return `
    <mnt-button-icon
      color="${props.color}"
      variant="${props.variant}"
      size="${props.size}"
      icon="${props.icon || 'caret-up'}"
    ></mnt-button-icon>
  `;
};

export const Regular: Story = {
  args: {
    color: 'primary',
    variant: 'regular',
    size: 'medium',
  },
  render: ButtonIconTemplate,
};

export const Emphasis: Story = {
  args: {
    color: 'primary',
    variant: 'emphasis',
    size: 'medium',
  },
  render: ButtonIconTemplate,
};

export const Stroke: Story = {
  args: {
    color: 'primary',
    variant: 'stroke',
    size: 'medium',
  },
  render: ButtonIconTemplate,
};

export const Plain: Story = {
  args: {
    color: 'primary',
    variant: 'plain',
    size: 'medium',
  },
  render: ButtonIconTemplate,
};

export const Link: Story = {
  args: {
    color: 'primary',
    variant: 'link',
    size: 'medium',
  },
  render: ButtonIconTemplate,
};

export const Filter: Story = {
  args: {
    variant: 'filter',
    color: 'primary',
    size: 'medium',
    state: 'default',
  },
  render: ButtonIconTemplate,
};

const getColorVariants = (color: ThemePalette) => {
  const buttonVariants: string[] = [];

  buttonStyleArray
    .filter((variant) => variant !== 'filter')
    .map((variant) => {
      buttonVariants.push(`<span>${variant}</span>`);
      buttonSizeVariantsArray.map((size) => {
        buttonVariants.push(ButtonIconTemplate({ color, variant, size, icon: 'plus' }));
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
};

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
`;
};
