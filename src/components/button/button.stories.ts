import type { Meta, StoryFn } from '@storybook/html';

import { sizeVariantsArray, ThemePalette, themePalettesArray } from '../../shared/theme/theme.types';
import { ICON_OPTIONS } from '../icon/icon.utils';

import { buttonStyleArray, type ButtonProps } from './button.types';
import { Button } from './button';
import { HTMLString } from 'src/utils/utils';

const SB_TABLE_ICON = {
  type: {
    summary: ICON_OPTIONS.join(' | '),
  },
};

const meta: Meta<ButtonProps> = {
  title: 'Components/Button/Default',
  component: 'mnt-button',
  argTypes: {
    label: { control: 'text' },
    size: {
      control: 'select',
      options: sizeVariantsArray,
      table: { defaultValue: { summary: 'medium' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    color: {
      control: 'select',
      options: themePalettesArray,
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: themePalettesArray.join(' | ') },
      },
    },
    variant: {
      control: 'select',
      options: buttonStyleArray,
      description: 'Variantes de estilo',
      table: {
        defaultValue: { summary: 'emphasis' },
        type: { summary: buttonStyleArray.join(' | ') },
      },
    },
    iconLeft: {
      control: 'select',
      options: ICON_OPTIONS,
      table: SB_TABLE_ICON,
    },
    iconRight: {
      control: 'select',
      options: ICON_OPTIONS,
      table: SB_TABLE_ICON,
    },
  },
};

export default meta;

const DefaultTemplate = (args: ButtonProps): HTMLString => `
  <mnt-button
    label="${args.label ?? ''}"
    icon-left="${args.iconLeft ?? ''}"
    icon-right="${args.iconRight ?? ''}"
    full-width="${args.fullWidth}"
    disabled="${args.disabled}"
    variant=${args.variant}
    color=${args.color}
    size=${args.size}
  ></mnt-button>
`;

const getColorVariants = (color: ThemePalette): HTMLString => {
  const buttonVariants: HTMLString[] = [];

  buttonStyleArray.map((variant) => {
    if (variant === 'filter') return;
    buttonVariants.push(`<span>${variant}</span>`);
    sizeVariantsArray.map((size) => {
      buttonVariants.push(
        DefaultTemplate({
          color: color,
          variant: variant,
          size: size,
          iconLeft: 'plus',
          iconRight: 'plus',
          label: 'Label',
          disabled: false,
          fullWidth: false,
        }),
      );
    });
  });
  return `
<div class="sb-section-box">
  <h4>${color}</h4>
  <div class="sb-grid-5 sb-grid-row-divider sb-grid-row-title">
    ${buttonVariants.join('')}
  </div>
</div>
`;
};

export const Example = DefaultTemplate.bind({});
Example.args = {
  label: 'Label',
  variant: 'emphasis',
  color: 'primary',
  size: 'medium',
  disabled: false,
  fullWidth: false,
  iconLeft: undefined,
  iconRight: undefined,
} as ButtonProps;

export const AllVariants: StoryFn<typeof Button> = () => {
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

AllVariants.parameters = {
  controls: { disable: true },
};

/**
 * Botão variante Filter
 */
export const FilterVariant: StoryFn = () => `
  <div style="padding: 20px;">
    <h3 style="margin-bottom: 20px;">Variante Filter</h3>
    <p style="margin-bottom: 16px; color: #666;">
      A variante <strong>filter</strong> é ideal para botões de filtro, tags removíveis e chips.
      Possui borda, background transparente e suporta ícones em ambos os lados.
    </p>

    <div style="display: flex; flex-direction: column; gap: 40px;">
      <!-- Tamanhos -->
      <div>
        <h4 style="margin-bottom: 12px;">Tamanhos</h4>
        <div style="display: flex; gap: 12px; align-items: center;">
          <mnt-button variant="filter" size="small" label="Small Filter"></mnt-button>
          <mnt-button variant="filter" size="medium" label="Medium Filter"></mnt-button>
          <mnt-button variant="filter" size="large" label="Large Filter"></mnt-button>
        </div>
      </div>

      <!-- Com Ícone à Esquerda -->
      <div>
        <h4 style="margin-bottom: 12px;">Filtros com Ícone Descritivo</h4>
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <mnt-button variant="filter" size="medium" label="Data" icon-left="calendar"></mnt-button>
          <mnt-button variant="filter" size="medium" label="Ordenar" icon-left="filter"></mnt-button>
          <mnt-button variant="filter" size="medium" label="Filtros" icon-left="filterHorizontal"></mnt-button>
          <mnt-button variant="filter" size="medium" label="Favoritos" icon-left="starOutline"></mnt-button>
        </div>
      </div>

      <!-- Com Ambos os Ícones -->
      <div>
        <h4 style="margin-bottom: 12px;">Filtros Ativos (ambos ícones)</h4>
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <mnt-button variant="filter" size="small" label="Exemplo 1" icon-left="calendar" icon-right="calendar"></mnt-button>
          <mnt-button variant="filter" size="medium" label="Exemplo 2" icon-left="headset" icon-right="headset"></mnt-button>
          <mnt-button variant="filter" size="large" label="Exemplo 3" icon-left="arrow-left" icon-right="arrow-right"></mnt-button>
        </div>
      </div>

      <!-- Estados -->
      <div>
        <h4 style="margin-bottom: 12px;">Estados</h4>
        <div style="display: flex; gap: 12px; align-items: center;">
          <mnt-button variant="filter" size="medium" label="Default"></mnt-button>
          <mnt-button variant="filter" size="medium" label="Pressed" state="pressed"></mnt-button>
          <mnt-button variant="filter" size="medium" label="Disabled" disabled></mnt-button>
        </div>
      </div>
    </div>

    <div style="margin-top: 24px; padding: 16px; background: #e3f2fd; border-left: 4px solid #2196f3; border-radius: 4px;">
      <strong>💡 Quando usar:</strong>
      <ul style="margin: 8px 0 0 20px; padding: 0;">
        <li>Tags removíveis em sistemas de filtro</li>
        <li>Chips de seleção múltipla</li>
        <li>Botões de filtro em barras de busca</li>
        <li>Categorias selecionáveis</li>
        <li>Ações de ordenação e visualização</li>
      </ul>
    </div>

    <div style="margin-top: 16px; padding: 16px; background: #f3e5f5; border-left: 4px solid #9c27b0; border-radius: 4px;">
      <strong>🎨 Dica de Design:</strong>
      <p style="margin: 8px 0 0 0;">
        Ícones à esquerda são ideais para identificar o tipo de filtro.
      </p>
    </div>
  </div>
`;
FilterVariant.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Variante Filter é ideal para tags removíveis, filtros ativos e chips de seleção com suporte a ícones em ambos os lados.',
    },
  },
};
