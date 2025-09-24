import type { Meta, StoryFn } from '@storybook/html';

import { IconLargeProps, iconLargeSizes, type IconProps } from './icon.types';
import { ICON_LARGE_OPTIONS } from './icon.utils';

type HTMLString = string;

const meta: Meta<IconProps> = {
  title: 'Assets/Icon/IconLarge',
  component: 'mnt-icon-large',
  argTypes: {
    icon: { control: 'select', options: ICON_LARGE_OPTIONS },
    size: { control: 'select', options: Object.keys(iconLargeSizes) },
    color: { control: 'color' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Icon Large** é um componente especializado para ícones de maior complexidade visual, distinto do componente `Icon` padrão.\n\n' +
          '### 🎯 **Características principais:**\n' +
          '- **Ilustrações mais complexas:** Contêm mais detalhes visuais que os ícones convencionais\n' +
          '- **Monocromáticos:** Utilizam apenas uma cor, diferentemente do componente `Illustration` que é colorido\n' +
          '- **Tamanhos maiores recomendados:** Devido à complexidade, não são indicados para tamanhos muito pequenos\n' +
          '- **Uso específico:** Ideais para destaques, seções principais ou quando precisar de mais impacto visual\n\n' +
          '### ⚠️ **Diferenças do componente Icon:**\n' +
          '- `Icon`: Símbolos simples, funcionam bem em qualquer tamanho\n' +
          '- `IconLarge`: Ilustrações detalhadas, melhores em tamanhos médios/grandes\n\n' +
          '### 📏 **Recomendações de uso:**\n' +
          '- **Tamanho mínimo recomendado:** `medium` (24px)\n' +
          '- **Ideal para:** Headers, cards principais, estados vazios, onboarding\n' +
          '- **Evitar em:** Botões pequenos, listas densas, elementos inline\n\n' +
          '**Atenção:** Os nomes dos ícones devem corresponder exatamente às nomenclaturas do protótipo Figma.\n\n' +
          'Para visualizar todos os ícones disponíveis, veja a [listagem completa](#icon-large-variants).\n\n' +
          '**Figma:** [Global Assets | IconLarge](https://www.figma.com/design/0Yxvp7aJaKkjyXduoQlPpM/-4-Global-Assets?node-id=1264-68&t=nRkYtrOHJjfZr11g-4)\n\n',
      },
    },
  },
};

export default meta;

const DefaultTemplate = (args: IconLargeProps) => `
<mnt-icon-large
  icon="${args.icon}"
  size="${args.size}"
  color="${args.color}"
</mnt-icon-large>
`;

export const Default: StoryFn = DefaultTemplate.bind({});
Default.args = {
  icon: 'placeholder',
  size: 'medium',
  color: 'black',
} as IconLargeProps;
Default.storyName = 'Playground';
Default.parameters = {
  id: 'icon-large-playground',
  docs: {
    description: {
      story: 'Playground do componente `<mnt-icon-large>`.',
    },
  },
};

const renderIconBox = (iconName: string): HTMLString => {
  return `
    <div class="sb-box">
      <mnt-icon-large icon="${iconName}" size="medium"></mnt-icon-large>
      <p class="label-regular-tiny">${iconName}</p>
    </div>
  `;
};

const renderAllIcons = (): HTMLString => {
  let html = '';
  ICON_LARGE_OPTIONS.forEach((icon) => {
    html += `${renderIconBox(icon)}`;
  });

  return `
    <div class="sb-grid-6 sb-grid-stretch">
      ${html}
    </div>
  `;
};

export const IconLargeVariants: StoryFn = () => renderAllIcons();
IconLargeVariants.storyName = 'Icon Large Variants';
IconLargeVariants.parameters = {
  id: 'icon-large-variants',
  docs: {
    description: {
      story: 'Listagem completa de todos os ícones "grandes" disponíveis no sistema.',
    },
  },
  controls: { disable: true },
};
