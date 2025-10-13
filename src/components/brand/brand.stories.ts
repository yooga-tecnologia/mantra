import type { Meta, StoryFn } from '@storybook/html';

import { HTMLString } from 'src/utils/utils';

import { BrandProps } from './brand.types';
import { BRANDS } from './brand-base';

const meta: Meta<BrandProps> = {
  title: 'Assets/Brands',
  component: 'mnt-brand',
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(BRANDS),
    },
    height: { control: 'number' },
    color: { control: 'color' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Brand** é o componente responsável por exibir logotipos e identidades visuais de marcas parceiras e do próprio sistema.\n\n' +
          '### 🎯 **Características principais:**\n' +
          '- **Logotipos oficiais:** Marcas com identidade visual definida e cores corporativas\n' +
          '- **Escalabilidade controlada:** Mantém proporções originais e legibilidade\n' +
          '- **Cores corporativas:** Respeita as cores oficiais de cada marca\n' +
          '- **Uso comercial:** Ideal para parcerias, integrações e co-branding\n\n' +
          '### 🎨 **Funcionalidades:**\n' +
          '- **Altura customizável:** Ajuste de tamanho mantendo proporção\n' +
          '- **Cor personalizável:** Override da cor padrão quando necessário\n' +
          '- **SVG otimizado:** Renderização vetorial para máxima qualidade\n' +
          '- **Responsivo:** Adapta-se a diferentes contextos e dispositivos\n\n' +
          '### 📏 **Recomendações de uso:**\n' +
          '- **Altura mínima:** 24px para manter legibilidade\n' +
          '- **Ideal para:** Headers, footers, seções de parceiros, checkout\n' +
          '- **Contextos apropriados:** Páginas de landing, dashboards, formulários de pagamento\n\n' +
          '**Atenção:** Respeite sempre as diretrizes de marca de cada logotipo. Cores e proporções devem seguir os padrões oficiais.\n\n' +
          'Para visualizar todas as marcas disponíveis, veja a [listagem completa](#all-brands).\n\n' +
          '**Figma:** [Global Assets | Brands](https://www.figma.com/design/0Yxvp7aJaKkjyXduoQlPpM/-4-Global-Assets?node-id=34-27)\n\n',
      },
    },
  },
};

export default meta;

const DefaultTemplate = (args: BrandProps) => `
<mnt-brand
  name="${args.name}"
  height="${args.height}"
  color="${args.color}"
></mnt-brand>
`;

export const Example = DefaultTemplate.bind({});
Example.args = {
  name: 'yooga',
  height: 30,
  color: BRANDS.yooga.color,
} as BrandProps;
Example.storyName = 'Playground';
Example.parameters = {
  docs: {
    description: {
      story: 'Playground do componente `<mnt-brand>`. Experimente diferentes marcas, alturas e cores para ver como o componente se adapta.',
    },
  },
};

const renderAllVariants = (): HTMLString => {
  let html = '';
  Object.keys(BRANDS).forEach((brand) => {
    html += `
      <div class="sb-box">
        <mnt-brand name="${brand}"></mnt-brand>
        <p class="label-regular-tiny">${brand}</p>
      </div>
    `;
  });
  return `
    <div class="sb-grid-4 sb-grid-stretch">
      ${html}
    </div>
  `;
};

const renderSizeVariations = (): HTMLString => {
  const sizes = [20, 30, 40, 60];
  let html = '';

  sizes.forEach((size) => {
    html += `
      <div class="sb-box">
        <mnt-brand name="yooga" height="${size}"></mnt-brand>
        <p class="label-regular-tiny">${size}px</p>
      </div>
    `;
  });

  return `
    <div class="sb-grid-4 sb-grid-stretch">
      ${html}
    </div>
  `;
};

const renderColorVariations = (): HTMLString => {
  const colors = [
    { name: 'Original', color: BRANDS.yooga.color },
    { name: 'Black', color: '#000000' },
    { name: 'White', color: '#FFFFFF' },
    { name: 'Gray', color: '#6B7280' },
  ];

  let html = '';
  colors.forEach((colorOption) => {
    const bgClass = `style="padding: 16px; border-radius: 8px; background-color:${colorOption.color === '#FFFFFF' ? '#5F676C' : '#f3f4f6'}"`;
    html += `
      <div class="sb-box" ${bgClass}>
        <mnt-brand name="yooga" height="32" color="${colorOption.color}"></mnt-brand>
        <p class="label-regular-tiny" style="color:${colorOption.color}">${colorOption.name}</p>
      </div>
    `;
  });

  return `
    <div class="sb-grid-4 sb-grid-stretch">
      ${html}
    </div>
  `;
};

export const AllVariants: StoryFn = () => renderAllVariants();
AllVariants.parameters = {
  docs: {
    description: {
      story:
        'Listagem completa de todas as marcas e logotipos disponíveis na biblioteca.\n\n' +
        '### 📋 **Marcas disponíveis:**\n' +
        '- **yooga**: Logotipo completo da Yooga Tecnologia\n' +
        '- **yoogaIcon**: Versão icônica/símbolo da marca Yooga\n' +
        '- **ifood**: Logotipo oficial do iFood para integrações\n\n' +
        '### 🎨 **Características de cada marca:**\n' +
        '- Cada marca possui sua **cor corporativa oficial**\n' +
        '- **Proporções otimizadas** para diferentes contextos de uso\n' +
        '- **SVG vetorial** para qualidade em qualquer tamanho\n\n' +
        '**Nota:** Sempre verifique as diretrizes de uso de cada marca antes de implementar.',
    },
    source: {
      code: renderAllVariants(),
    },
  },
  controls: { disable: true },
};

export const SizeVariations: StoryFn = () => renderSizeVariations();
SizeVariations.storyName = 'Variações de Tamanho';
SizeVariations.parameters = {
  storyName: 'Variações de Tamanho',
  docs: {
    description: {
      story:
        'Demonstração de diferentes tamanhos do componente Brand.\n\n' +
        '### 📏 **Tamanhos recomendados:**\n' +
        '- **20px**: Uso mínimo, contextos compactos\n' +
        '- **30px**: Tamanho padrão para headers\n' +
        '- **40px**: Destaque em seções principais\n' +
        '- **60px**: Landing pages e apresentações\n\n' +
        '**Importante:** O componente mantém automaticamente a proporção original da marca.',
    },
  },
  controls: { disable: true },
};

export const ColorVariations: StoryFn = () => renderColorVariations();
ColorVariations.storyName = 'Variações de Cor';
ColorVariations.parameters = {
  docs: {
    description: {
      story:
        'Demonstração de diferentes cores aplicadas ao logotipo.\n\n' +
        '### 🎨 **Uso de cores:**\n' +
        '- **Original**: Sempre prefira a cor corporativa oficial\n' +
        '- **Black/Gray**: Para contextos monocromáticos\n' +
        '- **White**: Para fundos escuros ou coloridos\n\n' +
        '**Atenção:** Verifique sempre as diretrizes de marca antes de alterar cores. Algumas marcas têm restrições específicas.',
    },
  },
  controls: { disable: true },
};
