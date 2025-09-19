import type { Meta, StoryFn } from '@storybook/html';

import { iconSizes, type IconProps } from './icon.types';
import * as ICONS from './icon-base';
import { ICON_ANIMATION_ARRAY } from './icon.constants';
import { ICON_OPTIONS } from './icon.utils';

type HTMLString = string;

const meta: Meta<IconProps> = {
  title: 'Assets/Icon',
  component: 'mnt-icon',
  argTypes: {
    icon: { control: 'select', options: ICON_OPTIONS },
    size: { control: 'select', options: Object.keys(iconSizes) },
    color: { control: 'color' },
    background: { control: 'color' },
    animation: { control: 'select', options: ICON_ANIMATION_ARRAY },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Este componente exibe ícones SVG categorizados conforme o design system da Mantra. Os ícones estão organizados por categorias para facilitar a busca e o uso consistente em toda a aplicação.\n\n' +
          '**Atenção:** Os nomes dos ícones devem corresponder exatamente às nomenclaturas dos componentes do protótipo Figma, garantindo padronização e fácil localização.\n\n' +
          'As categorias e nomes disponíveis podem ser consultados no arquivo de base dos ícones.\n\n' +
          'Para visualizar todos os ícones e suas categorias, veja a [listagem completa](#all-icons).\n\n' +
          '**Figma:** [Global Assets | Ícones](https://www.figma.com/design/0Yxvp7aJaKkjyXduoQlPpM/-4-Global-Assets?node-id=515-48&t=sxDfazkrLexGezmA-4)\n\n',
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

export const Default = DefaultTemplate.bind({});
Default.args = {
  icon: 'caret',
  size: 'large',
  color: 'black',
  animation: undefined,
} as IconProps;

// TODO: Melhorar documentacão desta funcionalidade
// export const RotationTemplate = DefaultTemplate.bind({});
// RotationTemplate.args = {
//   icon: 'caret-left',
//   size: 'large',
//   color: 'black',
//   animation: undefined,
// } as IconProps;

export const WithBackground = DefaultTemplate.bind({});
WithBackground.args = {
  icon: 'caret-right',
  size: 'large',
  color: 'white',
  background: 'black',
  animation: undefined,
} as IconProps;

const IconsByCategory = [
  {
    label: 'UI Actions',
    icons: ICONS.UI_ACTIONS_ICONS,
  },
  {
    label: 'Communication',
    icons: ICONS.COMMUNICATION_ICONS,
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

export const AllIcons: StoryFn = () => renderAllIcons();
AllIcons.parameters = {
  docs: {
    description: {
      story: 'Listagem completa de todos os ícones disponíveis no sistema.',
    },
  },
  controls: { disable: true },
};
