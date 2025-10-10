import type { Meta, StoryFn } from '@storybook/html';

import { iconSizes, type IconProps } from './icon.types';
import * as ICONS from './icon-base';
import { ICON_ANIMATION_ARRAY } from './icon.constants';
import { ICON_OPTIONS } from './icon.utils';

type HTMLString = string;

const meta: Meta<IconProps> = {
  title: 'Assets/Icon/Icon',
  component: 'mnt-icon',
  argTypes: {
    icon: { control: 'select', options: ICON_OPTIONS.sort() },
    size: { control: 'select', options: Object.keys(iconSizes) },
    color: { control: 'color' },
    background: { control: 'color' },
    animation: { control: 'select', options: ICON_ANIMATION_ARRAY },
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
          '- **Background circular:** Para criar badges ou botões de ação\n' +
          '- **Direcionamento automático:** Sufixos como `-left`, `-right` rotacionam o ícone\n' +
          '- **Animações:** Spin, pulse, bounce para feedback visual\n' +
          '- **Responsivo:** Tamanhos de `tiny` (12px) até `xxlarge` (48px)\n\n' +
          '**Atenção:** Os nomes dos ícones devem corresponder exatamente às nomenclaturas do protótipo Figma.\n\n' +
          'Para visualizar todos os ícones por categoria, veja a [listagem completa](#icon-variants).\n\n' +
          '**Figma:** [Global Assets | Icon](https://www.figma.com/design/0Yxvp7aJaKkjyXduoQlPpM/-4-Global-Assets?node-id=1321-19&t=KRWz7iIPc95JTGgp-4)\n\n',
      },
    },
  },
};

export default meta;

const DefaultTemplate = (args: IconProps) => `
<mnt-icon
  icon="${args.icon}"
  size="${args.size}"
  color="${args.color}"
  background="${args.background ?? ''}"
  animation="${args.animation ?? ''}"
></mnt-icon>
`;

export const Default: StoryFn = DefaultTemplate.bind({});
Default.args = {
  icon: 'caret',
  size: 'large',
  color: 'black',
  animation: undefined,
} as IconProps;
Default.storyName = 'Playground';
Default.parameters = {
  id: 'icon-playground',
  docs: {
    description: {
      story: 'Playground do componente `<mnt-icon>`.',
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

// export const WithBackground: StoryFn = DefaultTemplate.bind({});
// WithBackground.args = {
//   icon: 'caret-right',
//   size: 'large',
//   color: 'white',
//   background: 'black',
//   animation: undefined,
// } as IconProps;

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
        <div class="sb-grid-6 sb-grid-stretch">
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
