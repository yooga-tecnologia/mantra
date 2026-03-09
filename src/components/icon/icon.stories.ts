import type { StoryFn, StoryObj } from '@storybook/html-vite';

import * as ICONS from './icon-base';
import { ICON_OPTIONS } from './icon.utils';
import { IconProps, iconSizes } from './icon.types';
import { HTMLString } from 'src/utils/utils';
import { directionTransformMap } from './icon.constants';

type Story = StoryObj;

export default {
  title: 'Assets/Icon',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Componente padrão para exibição de ícones SVG simples do Design System.

Permite a utilização de ícones com modificadores de direções, background e shapes.

### ⚠️ Diferenças dos outros componentes:
- **Icon**: Símbolos mais simples; indicado para uso geral, contido em outros componentes como Button, MessageHighlight, etc.
- **IconLarge**: Ilustrações complexas, apenas tamanhos médios/grandes; indicado para uso em cards de produtos, serviços, etc.
- **Illustration**: Ilustrações coloridas e decorativas. Indicado para uso em EmptyState, Dialogs, etc.
        `,
      },
      codePanel: false,
    },
  },
  argTypes: {
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Nome do ícone a ser exibido. Veja todas as opções de ícones na seção "All variants"',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    color: {
      control: {
        type: 'color',
        defaultValue: '#000000',
      },
      description: 'Cor do ícone. Utilize valor hexadecimal.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#000000' },
      },
    },
    background: {
      control: {
        type: 'color',
        defaultValue: 'transparent',
      },
      description: 'Cor de fundo do ícone. Utilize valor hexadecimal.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    bgShape: {
      control: 'select',
      options: ['circle', 'rounded', 'square'],
      description: 'Formato do background do ícone.',
      table: {
        type: { summary: 'circle | rounded | square' },
        defaultValue: { summary: 'undefined' },
      },
    },
    size: {
      control: 'select',
      options: Object.keys(iconSizes),
      description: 'Tamanho do ícone.',
      table: {
        type: { summary: Object.keys(iconSizes).join(' | ') },
        defaultValue: { summary: 'medium' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-icon ${args}></mnt-icon>
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

const IconTemplate = (props: IconProps) => {
  return `
    <mnt-icon
      icon="${props.icon}"
      color="${props.color}"
      size="${props.size}"
      background="${props.background}"
      bg-shape="${props.bgShape}"
    ></mnt-icon>
  `;
};

export const Simple: Story = {
  args: {
    icon: 'caret-up',
    color: '#000',
    size: 'medium',
    background: undefined,
  },
  render: IconTemplate,
};

export const Sizes: StoryFn = () => {
  const sizes = Object.keys(iconSizes);
  const sizeMap = sizes.map((direction) => {
    return `
    <div class="sb-grid-3 sb-grid-row-title">
      <p class="label-medium-medium text-color-body p-5">${direction.charAt(0).toUpperCase() + direction.slice(1)}</p>
      <mnt-icon class="p-5" icon="starOutline" color="#000" size="${direction}"></mnt-icon>
      <mnt-icon class="p-5" icon="starOutline" background="#000" color="#FFF" size="${direction}"></mnt-icon>
    </div>
    `;
  });
  return `
<div class="sb-section">
  <div class="sb-grid-3 sb-grid-row-title sb-grid-row-divider">
    <p class="label-medium-medium text-color-title">Sizes</p>
    <p class="label-medium-medium text-color-title">Color</p>
    <p class="label-medium-medium text-color-title">Background</p>
  </div>
  ${sizeMap.join('')}
</div>
  `;
};

Sizes.parameters = disableArgs;

/**
 * Exemplos de uso de ícones que utilizam modificadores de background e shapes.
 */
export const BackgroundAndShapes: StoryFn = () => {
  const shapes = ['circle', 'rounded', 'square'];
  const shapesIcons = shapes.map((shape) => {
    return `
    <div class="sb-grid-3 sb-grid-row-title">
      <span class="text-color-body p-5">${shape.charAt(0).toUpperCase() + shape.slice(1)}</span>
      <mnt-icon class="p-5" icon="starOutline" color="#000" size="medium" bg-shape="${shape}"></mnt-icon>
      <mnt-icon class="p-5" icon="starOutline" background="#000" color="#FFF" size="medium" bg-shape="${shape}"></mnt-icon>
    </div>
    `;
  });
  return `
<div class="sb-section">
  <div class="sb-grid-3 sb-grid-row-title sb-grid-row-divider">
    <p class="label-medium-medium text-color-title">Shapes</p>
    <p class="label-medium-medium text-color-title">Color</p>
    <p class="label-medium-medium text-color-title">Background</p>
  </div>
  ${shapesIcons.join('')}
</div>
  `;
};

BackgroundAndShapes.parameters = disableArgs;

/**
 * Exemplos de uso de ícones que utilizam modificadores de direções.
 *
 * Utilize apenas os ícones que possuem `caret` ou `arrow` no nome.
 */
export const Directions: StoryFn = () => {
  const directions = Object.keys(directionTransformMap);
  const directionsIcons = directions.map((direction) => {
    return `
    <div class="sb-grid-3 sb-grid-row-title">
      <p class="text-color-body pl-5">${direction.charAt(0).toUpperCase() + direction.slice(1)}</p>
      <mnt-icon class="p-5" icon="caret-${direction}" color="#000" size="medium"></mnt-icon>
      <mnt-icon class="p-5" icon="caret-${direction}" background="#000" color="#FFF" size="medium"></mnt-icon>
    </div>
    `;
  });
  return `
<div class="sb-section">
  <div class="sb-grid-3 sb-grid-row-title sb-grid-row-divider">
    <p class="label-medium-medium text-color-title">Directions</p>
    <p class="label-medium-medium text-color-title">Color</p>
    <p class="label-medium-medium text-color-title">Background</p>
  </div>
  ${directionsIcons.join('')}
</div>
  `;
};

Directions.parameters = disableArgs;

const IconsByCategory = [
  {
    label: 'UI Actions',
    icons: ICONS.UI_ACTIONS_ICONS,
  },
  {
    label: 'Communication and Social',
    icons: ICONS.COMMUNICATION_AND_SOCIAL_ICONS,
  },
  {
    label: 'Common Actions',
    icons: ICONS.COMMON_ACTIONS_ICONS,
  },
  {
    label: 'Business and Payments',
    icons: ICONS.BUSINESS_AND_PAYMENTS_ICONS,
  },
  {
    label: 'Privacy and Security',
    icons: ICONS.PRIVACY_AND_SECURITY_ICONS,
  },
  {
    label: 'Hardware and Software',
    icons: ICONS.HARDWARE_AND_SOFTWARE_ICONS,
  },
  {
    label: 'Maps and Transportation',
    icons: ICONS.MAPS_AND_TRANSPORTATION_ICONS,
  },
  {
    label: 'Emotions',
    icons: ICONS.USER_EMOTION_ICONS,
  },
  {
    label: 'Numbers',
    icons: ICONS.NUMBER_ICONS,
  },
  {
    label: 'Brands and Media',
    icons: ICONS.BRANDS_AND_MEDIA_ICONS,
  },
];

const renderIconBox = (iconName: string): HTMLString => {
  return `
    <div class="sb-box">
      <mnt-icon icon="${iconName}" size="medium"></mnt-icon>
      <p class="label-regular-tiny">${iconName}</p>
    </div>
  `;
};

const renderAllIcons = (): HTMLString => {
  let html = '';
  IconsByCategory.forEach((category) => {
    html += `
      <div class="sb-category-section">
        <h3>${category.label}</h3>
        <div class="sb-grid-5 sb-grid-stretch">
          ${Object.keys(category.icons)
            .sort()
            .flatMap((iconName) => {
              // Se o ícone contém 'caret' ou 'arrow', renderizar todas as direções
              if (iconName.includes('caret') || iconName.includes('arrow')) {
                const directions = Object.keys(directionTransformMap);
                return directions.map((direction) => {
                  const directionalIconName = `${iconName}-${direction}`;
                  return renderIconBox(directionalIconName);
                });
              }
              // Caso contrário, renderizar apenas o ícone base
              return renderIconBox(iconName);
            })
            .join('')}
        </div>
      </div>
    `;
  });

  return `
    <div>
      ${html}
    </div>
  `;
};

/**
 * Todas as variantes de ícones
 */
export const AllVariants: StoryFn = () => {
  return `
  <div class="sb-section">
    ${renderAllIcons()}
  </div>
  `;
};

AllVariants.parameters = disableArgs;
