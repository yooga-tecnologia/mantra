import type { Meta, StoryObj } from '@storybook/html-vite';

import { themePalettesArray } from '../../shared/theme/theme.types';
import { ButtonProps, buttonStyleArray } from './button.types';
import { sizeVariantsArray } from '../../shared/theme/theme.types';
import { Button } from './button';

type Story = StoryObj;

const meta = {
  title: 'Components/Button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      codePanel: true,
      description: {
        component: `
O componente **Button** permite que usuários realizem ações e façam escolhas com um único toque ou clique.

Botões comunicam ações que os usuários podem realizar e são tipicamente colocados em interfaces como diálogos,
formulários, cards, toolbars, etc.

🔗 [**FIGMA**](https://www.figma.com/design/ezr4b0ZxjmeWjASveGQoJS/-1-Core-Components?node-id=407-766&t=YDt7UhIUEjPwGOIf-4)

## Guia de uso para variantes

- **Regular (solid)**: Ação primária de alto destaque, use para a ação mais importante da tela
- **Emphasis**: Variação com mais destaque visual (gradientes/sombras), ideal para CTAs importantes
- **Stroke (outline)**: Ações secundárias com menos destaque, bom para ações complementares
- **Plain (ghost)**: Ações terciárias ou em contextos com limitação de espaço, mínimo de interferência visual

## Cores disponíveis

Cada cor tem um significado semântico:
- **Primary**: Ações principais da aplicação
- **Secondary**: Ações secundárias
- **Neutral**: Ações neutras ou de cancelamento
- **Success**: Confirmações e ações positivas
- **Warning**: Ações que requerem atenção
- **Critical**: Ações destrutivas ou de alta importância
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto exibido no botão',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    color: {
      control: 'select',
      options: themePalettesArray,
      description: 'Cor semântica do botão',
      table: {
        category: 'Appearance',
        type: { summary: 'ThemePalette' },
        defaultValue: { summary: 'primary' },
      },
    },
    variant: {
      control: 'select',
      options: buttonStyleArray,
      description: 'Estilo visual do botão',
      table: {
        category: 'Appearance',
        type: { summary: 'ButtonStyle' },
        defaultValue: { summary: 'regular' },
      },
    },
    size: {
      control: 'select',
      options: sizeVariantsArray.filter((s) => s !== 'tiny'),
      description: 'Tamanho do botão (tiny não é suportado para este componente)',
      table: {
        category: 'Appearance',
        type: { summary: 'SizeVariants' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita todas as interações com o botão',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expande o botão para ocupar toda a largura do container',
      table: {
        category: 'Layout',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    iconLeft: {
      control: 'text',
      description: 'Nome do ícone a ser exibido à esquerda do texto',
      table: {
        category: 'Content',
        type: { summary: 'ExtendedIconName' },
      },
    },
    iconRight: {
      control: 'text',
      description: 'Nome do ícone a ser exibido à direita do texto',
      table: {
        category: 'Content',
        type: { summary: 'ExtendedIconName' },
      },
    },
    iconAnimation: {
      control: 'select',
      options: ['spin', 'pulse', 'none'],
      description: 'Animação aplicada aos ícones',
      table: {
        category: 'Content',
        type: { summary: 'IconAnimation' },
      },
    },
  },
} satisfies Meta<Button>;

export default meta;

const baseArgs = {
  label: 'Button',
  size: 'medium',
  color: 'primary',
  disabled: false,
  fullWidth: false,
  iconLeft: undefined,
  iconRight: undefined,
  iconAnimation: 'none',
};

// Story principal: Matriz de todas as variantes
export const AllVariants: Story = {
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Visualização completa de todas as combinações de variantes e cores disponíveis. Use esta matriz para escolher a melhor combinação para seu caso de uso.',
      },
    },
  },
  render: () => {
    const colors = themePalettesArray;
    const variants = buttonStyleArray;

    return `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 20px;">
        <div style="overflow-x: auto;">
          <table style="border-collapse: separate; border-spacing: 16px 12px;">
            <thead>
              <tr>
                <th style="text-align: left; padding: 8px; font-weight: 600; color: #3A3D3F;">Color / Variant</th>
                ${variants.map((variant) => `<th style="text-align: center; padding: 8px; font-weight: 600; color: #3A3D3F; text-transform: capitalize;">${variant}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${colors
                .map(
                  (color) => `
                <tr>
                  <td style="padding: 8px; font-weight: 600; color: #5F676C; text-transform: capitalize;">${color}</td>
                  ${variants
                    .map((variant) => {
                      // Skip invalid combination: emphasis + neutral
                      if (variant === 'emphasis' && color === 'neutral') {
                        return `<td style="text-align: center; padding: 8px;"><span style="color: #5F676C; font-size: 12px;">N/A</span></td>`;
                      }
                      return `
                      <td style="text-align: center; padding: 8px;">
                        <mnt-button
                          label="Button"
                          color="${color}"
                          variant="${variant}"
                          size="medium"
                        ></mnt-button>
                      </td>
                    `;
                    })
                    .join('')}
                </tr>
              `,
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },
};

const ButtonTemplate = (props: ButtonProps) => {
  return `
    <mnt-button
      variant="${props.variant}"
      label="${props.label}"
      color="${props.color}"
      size="${props.size}"
      ${props.iconLeft ? `icon-left="${props.iconLeft}"` : ''}
      ${props.iconRight ? `icon-right="${props.iconRight}"` : ''}
      ${props.disabled ? 'disabled' : ''}
      ${props.fullWidth ? 'full-width' : ''}
    ></mnt-button>
  `.trim();
};

// Stories individuais por variante
export const Regular: Story = {
  args: {
    variant: 'regular',
    ...baseArgs,
  },
  parameters: {
    docs: {
      description: {
        story: 'Variante **Regular** (solid) - Use para ações primárias que precisam de destaque máximo na interface. É a variante mais visualmente proeminente.',
      },
    },
  },
  render: (args) => ButtonTemplate(args),
};

export const Emphasis: Story = {
  args: {
    variant: 'emphasis',
    ...baseArgs,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Variante **Emphasis** - Adiciona efeitos visuais extras (gradientes, sombras) para ainda mais destaque. Ideal para CTAs (Call-to-Action) importantes. **Nota**: não suporta a cor "neutral".',
      },
    },
  },
  render: (args) => ButtonTemplate(args),
};

export const Stroke: Story = {
  args: {
    variant: 'stroke',
    ...baseArgs,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Variante **Stroke** (outline) - Use para ações secundárias ou quando precisa de uma alternativa mais sutil à variante regular. Bom para múltiplos botões lado a lado.',
      },
    },
  },
  render: (args) => ButtonTemplate(args),
};

export const Plain: Story = {
  args: {
    variant: 'plain',
    ...baseArgs,
  },
  parameters: {
    docs: {
      description: {
        story: 'Variante **Plain** (ghost) - A variante mais sutil, ideal para ações terciárias, toolbars, ou quando você precisa minimizar a interferência visual do botão.',
      },
    },
  },
  render: (args) => ButtonTemplate(args),
};

// Story: Tamanhos disponíveis
export const Sizes: Story = {
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'O componente Button oferece três tamanhos: **small**, **medium** e **large**. O tamanho "tiny" não é suportado para botões. Use tamanhos consistentes dentro de cada contexto da interface.',
      },
    },
  },
  render: () => {
    const sizes = sizeVariantsArray.filter((s) => s !== 'tiny');
    return sizes.map((size) => ButtonTemplate({ ...baseArgs, size, variant: 'emphasis' } as ButtonProps)).join('\n');
  },
};

// Story: Com ícones
export const WithIcons: Story = {
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Adicione ícones à esquerda (`iconLeft`) ou à direita (`iconRight`) do texto para fornecer contexto visual adicional. Você também pode animar os ícones com `iconAnimation`.',
      },
    },
  },
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <span style="font-weight: 600; min-width: 120px;">Icon Left:</span>
          ${ButtonTemplate({ ...baseArgs, iconLeft: 'downloadSimple', variant: 'regular' } as ButtonProps)}
          ${ButtonTemplate({ ...baseArgs, iconLeft: 'downloadSimple', variant: 'plain' } as ButtonProps)}
          ${ButtonTemplate({ ...baseArgs, iconLeft: 'downloadSimple', variant: 'stroke' } as ButtonProps)}
          ${ButtonTemplate({ ...baseArgs, iconLeft: 'downloadSimple', variant: 'emphasis' } as ButtonProps)}
        </div>

        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <span style="font-weight: 600; min-width: 120px;">Icon Right:</span>
          ${ButtonTemplate({ ...baseArgs, iconRight: 'arrow-right', variant: 'regular' } as ButtonProps)}
          ${ButtonTemplate({ ...baseArgs, iconRight: 'arrow-right', variant: 'plain' } as ButtonProps)}
          ${ButtonTemplate({ ...baseArgs, iconRight: 'arrow-right', variant: 'stroke' } as ButtonProps)}
          ${ButtonTemplate({ ...baseArgs, iconRight: 'arrow-right', variant: 'emphasis' } as ButtonProps)}
        </div>

        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
          <span style="font-weight: 600; min-width: 120px;">Both Icons:</span>
          ${ButtonTemplate({ ...baseArgs, iconLeft: 'caret-left', iconRight: 'caret-right', variant: 'regular' } as ButtonProps)}
          ${ButtonTemplate({ ...baseArgs, iconLeft: 'caret-left', iconRight: 'caret-right', variant: 'plain' } as ButtonProps)}
          ${ButtonTemplate({ ...baseArgs, iconLeft: 'caret-left', iconRight: 'caret-right', variant: 'stroke' } as ButtonProps)}
          ${ButtonTemplate({ ...baseArgs, iconLeft: 'caret-left', iconRight: 'caret-right', variant: 'emphasis' } as ButtonProps)}
        </div>
      </div>
    `;
  },
};

// Story: Estados especiais
export const States: Story = {
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Exemplos de estados especiais do botão: **disabled** (desabilitado) e **fullWidth** (largura total do container).',
      },
    },
  },
  render: () => {
    return `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666;">Disabled State</h4>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          ${ButtonTemplate({ ...baseArgs, label: 'Disabled Regular', disabled: true, variant: 'regular' } as ButtonProps)}
          ${ButtonTemplate({ ...baseArgs, label: 'Disabled Stroke', disabled: true, variant: 'stroke' } as ButtonProps)}
          ${ButtonTemplate({ ...baseArgs, label: 'Disabled Plain', disabled: true, variant: 'plain' } as ButtonProps)}
          ${ButtonTemplate({ ...baseArgs, label: 'Disabled Emphasis', disabled: true, variant: 'emphasis' } as ButtonProps)}
        </div>
      </div>
    `;
  },
};

// Story: Full Width
export const FullWidth: Story = {
  args: {
    ...baseArgs,
    fullWidth: true,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Exemplo de como usar botões com largura total do container.',
      },
    },
  },
  render: (args) => {
    return `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 600px; max-width: 400px;">
        <h4 style="text-align: center; margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666;">Full Width (eg.: container width = 600px)</h4>
        ${ButtonTemplate({ ...args, variant: 'regular' })}
        ${ButtonTemplate({ ...args, variant: 'plain' })}
        ${ButtonTemplate({ ...args, variant: 'stroke' })}
        ${ButtonTemplate({ ...args, variant: 'emphasis' })}
      </div>
    `;
  },
};

// Story: Exemplo de uso em formulário
export const InFormContext: Story = {
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Exemplo de como usar botões em um contexto de formulário, demonstrando hierarquia visual entre ações primárias e secundárias.',
      },
    },
  },
  render: () => {
    return `
      <div style="background: #f5f5f5; padding: 24px; border-radius: 8px; max-width: 500px;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">Confirm Your Action</h3>
        <p style="margin: 0 0 24px 0; color: #666; font-size: 14px;">
          Are you sure you want to proceed with this action? This cannot be undone.
        </p>

        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <mnt-button
            label="Cancel"
            color="neutral"
            variant="stroke"
            size="medium"
          ></mnt-button>

          <mnt-button
            label="Confirm"
            color="primary"
            variant="regular"
            size="medium"
          ></mnt-button>
        </div>
      </div>
    `;
  },
};
