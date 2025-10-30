import type { Meta, StoryFn } from '@storybook/html';

import { iconSizes, type IconProps } from './icon.types';
import * as ICONS from './icon-base';
// import { ICON_ANIMATION_ARRAY } from './icon.constants';
import { ICON_OPTIONS } from './icon.utils';

type HTMLString = string;

const meta: Meta<IconProps> = {
  title: 'Assets/Icon/Icon',
  component: 'mnt-icon',
  argTypes: {
    icon: { control: 'select', options: ICON_OPTIONS.sort() },
    size: { control: 'select', options: Object.keys(iconSizes) },
    color: { control: 'color' },
    background: {
      control: 'color',
      description: 'Cor de fundo. Para formas customizadas (circle, rounded, square), veja a story Background Examples abaixo.',
    },
    // animation: { control: 'select', options: ICON_ANIMATION_ARRAY },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Icon** é o componente padrão para exibição de ícones SVG simples do Mantra.\n\n' +
          '### 🎯 **Características principais:**\n' +
          '- **Símbolos simples e versáteis:** Funcionam bem em qualquer tamanho\n' +
          '- **Organização por categorias:** UI Actions, Communication, Business, etc.\n' +
          '- **Altamente flexível:** Suporte a cores, backgrounds, animações e transformações\n' +
          '- **Otimizado para uso geral:** Ideal para interfaces de usuário do dia a dia\n\n' +
          '### ⚠️ **Diferenças dos outros componentes:**\n' +
          '- `Icon`: Símbolos simples, uso geral, qualquer tamanho\n' +
          '- `IconLarge`: Ilustrações complexas, apenas tamanhos médios/grandes\n' +
          '- `Illustration`: Desenhos coloridos e decorativos\n\n' +
          '### 📏 **Funcionalidades especiais:**\n' +
          '- **Direcionamento automático:** Sufixos como `-left`, `-right` rotacionam o ícone\n' +
          // '- **Animações:** Spin, pulse, bounce para feedback visual\n' +
          '- **Responsivo:** Tamanhos de `tiny` (12px) até `xxlarge` (48px)\n' +
          '- **Background com formas:** Veja a [story Background Examples](#background-examples) abaixo para exemplos de backgrounds com circle, rounded e square\n\n' +
          '**Atenção:** Os nomes dos ícones devem corresponder exatamente às nomenclaturas do protótipo Figma.\n\n' +
          'Para visualizar todos os ícones por categoria, veja a [listagem completa](#icon-variants).\n\n' +
          '**Figma:** [Global Assets | Icon](https://www.figma.com/design/0Yxvp7aJaKkjyXduoQlPpM/-4-Global-Assets?node-id=1321-19&t=KRWz7iIPc95JTGgp-4)\n\n',
      },
    },
  },
};

export default meta;

const DefaultTemplate = (args: IconProps) => {
  const backgroundAttr = args.background
    ? typeof args.background === 'string'
      ? `background="${args.background}"`
      : `background='["${args.background[0]}", "${args.background[1]}"]'`
    : '';

  // const animationAttr = args.animation ? `animation="${args.animation}"` : '';

  return `
<mnt-icon
  icon="${args.icon}"
  size="${args.size}"
  color="${args.color}"
  ${backgroundAttr}
  ></mnt-icon>
`;
};

export const Default: StoryFn = DefaultTemplate.bind({});
Default.args = {
  icon: 'caret',
  size: 'large',
  color: 'black',
  background: undefined,
  // animation: undefined,
} as IconProps;
Default.storyName = 'Playground';
Default.parameters = {
  id: 'icon-playground',
  docs: {
    description: {
      story:
        'Playground do componente `<mnt-icon>`. Use o controle de **background** para adicionar uma cor de fundo (padrão: circle). Para formas customizadas, veja a story **Background Examples** abaixo.',
    },
  },
};

// TODO: Melhorar documentacão desta funcionalidade
// export const RotationTemplate = DefaultTemplate.bind({});
// RotationTemplate.args = {
//   icon: 'caret-left',
//   size: 'large',
//   color: 'black',
//   animation: undefined,
// } as IconProps;

/**
 * Exemplos de uso do background com diferentes formas e tamanhos
 */
const BackgroundExamplesTemplate = (): HTMLString => {
  const shapes = [
    { bg: '#E5E7E8', fg: '#4B5053', label: 'Default (circle)', background: '#E5E7E8' },
    { bg: '#E1F1FD', fg: '#0A639A', label: 'Circle explícito', background: `['#E1F1FD', 'circle']` },
    { bg: '#FFE1E1', fg: '#C01642', label: 'Rounded', background: `['#FFE1E1', 'rounded']` },
    { bg: '#DCFCEA', fg: '#16653C', label: 'Square', background: `['#DCFCEA', 'square']` },
  ];

  const sizes = ['tiny', 'small', 'medium', 'large', 'doubleLarge'] as const;

  const renderSizeRow = (size: (typeof sizes)[number]): HTMLString => {
    return `
  <div class="sb-grid-5 sb-grid-row-title sb-grid-row-divider">
    <div class="sb-grid-row-title-item">${size}</div>
    ${shapes
      .map(
        (shape) => `
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; width: 100%;">
        <mnt-icon icon="starOutline" size="${size}" color="${shape.fg}" background="${shape.background}"></mnt-icon>
      </div>
        `,
      )
      .join('')}
    </div>
  </div>
`;
  };

  return `
  <div>
    <div class="sb-grid-4 sb-grid-row-title" style="margin-left: 180px;">
      ${shapes
        .map(
          (shape) => `
        <h4 style="text-align: center; width: 100%;">
          ${shape.label}
        </h4>
      `,
        )
        .join('')}
      </div>
    </div>
    ${sizes.map((size) => renderSizeRow(size)).join('')}
  </div>
`;
};

export const BackgroundExamples: StoryFn = BackgroundExamplesTemplate;
BackgroundExamples.parameters = {
  id: 'background-examples',
  docs: {
    description: {
      story:
        'Exemplos de uso do background com diferentes shapes (circle, rounded, square) e tamanhos.\n\n' +
        '**Uso programático:**\n' +
        '- Para cor simples: `background="#color"` (shape padrão: circle)\n' +
        '- Para shape customizado: `background={["#color", "circle|rounded|square"]}`',
    },
  },
};

/**
 * Demonstra os tamanhos pré-definidos e customizado
 */
const SizingVariantsTemplate = (): HTMLString => {
  const preSizes = ['tiny', 'small', 'medium', 'large', 'doubleLarge'] as const;
  const customSize = 55;

  return `
  <div style="padding: 16px;">
    <h3>Tamanhos Pré-definidos</h3>

    <div class="sb-grid-6 sb-grid-stretch">
      ${preSizes
        .map(
          (size) => `
      <div class="sb-box">
        <mnt-icon icon="starOutline" size="${size}" color="#242628"></mnt-icon>
        <div style="margin-top: 4px; text-align: center;">
          <p class="label-medium-tiny">${size}</p>
          <p class="label-regular-tiny">(${iconSizes[size]}px)</p>
        </div>
      </div>
      `,
          // <div style="text-align: center;">
          //   <mnt-icon icon="caret" size="${size}" color="#242628"></mnt-icon>
          //   <p style="margin-top: 0.5rem; font-size: 11px; color: #666;">${size}</p>
          //   <p style="margin-top: 0.25rem; font-size: 10px; color: #999;">${iconSizes[size]}px</p>
          // </div>
        )
        .join('')}
    </div>

    <h3>Tamanhos com Background</h3>
    <div class="sb-grid-6 sb-grid-stretch">
      ${preSizes
        .map(
          (size) => `
      <div class="sb-box">
        <mnt-icon icon="starOutline" size="${size}" color="#0A639A" background='["#E1F1FD", "circle"]'></mnt-icon>
        <div style="margin-top: 4px; text-align: center;">
          <p class="label-medium-tiny">${size}</p>
          <p class="label-regular-tiny">(${iconSizes[size]}px)</p>
        </div>
      </div>
    `,
        )
        .join('')}
    </div>

    <div>
      <h3>Tamanho Customizado (${customSize}px)</h3>
      <div class="sb-grid-6 sb-grid-stretch">
        <div class="sb-box">
          <mnt-icon icon="caret" size="${customSize}" color="#242628"></mnt-icon>
        </div>
        <div class="sb-box">
          <mnt-icon icon="caret" size="${customSize}" color="#242628" background='["#E1F1FD", "circle"]'></mnt-icon>
        </div>
    </div>
  </div>
`;
};

export const SizingVariants: StoryFn = SizingVariantsTemplate;
SizingVariants.parameters = {
  id: 'sizing-variants',
  docs: {
    description: {
      story:
        'Demonstra todos os tamanhos pré-definidos (tiny, small, medium, large, doubleLarge) e tamanho customizado. O background adiciona automaticamente 8px ao tamanho do ícone para manter proporção visual.\n\n' +
        '**Uso programático:**\n' +
        '- Para cor simples: `background="#color"` (shape padrão: circle)\n' +
        '- Para shape customizado: `background={["#color", "circle|rounded|square"]}`',
    },
  },
};

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
    label: 'Hardware',
    icons: ICONS.HARDWARE_ICONS,
  },
  {
    label: 'Maps and Transportation',
    icons: ICONS.MAPS_AND_TRANSPORTATION_ICONS,
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
            .map((iconName) => renderIconBox(iconName))
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

export const IconVariants: StoryFn = () => renderAllIcons();
IconVariants.parameters = {
  id: 'icon-variants',
  docs: {
    description: {
      story: 'Listagem completa de todos os ícones disponíveis no sistema.',
    },
  },
  controls: { disable: true },
};
