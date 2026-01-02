import type { Meta, StoryObj } from '@storybook/html-vite';

import { themePalettesArray } from '../../../shared/theme/theme.types';
import { sizeVariantsArray } from '../../../shared/theme/theme.types';
import { buttonStyleArray, type ButtonIconProps } from '../button.types';

type Story = StoryObj;

const meta = {
  title: 'Components/Button/Icon',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      codePanel: true,
      description: {
        component: `Variante de button que contém color, variant, size, disabled e icon.`,
      },
    },
    options: {
      // The `a` and `b` arguments in this function have a type of `import('storybook/internal/types').IndexEntry`. Remember that the function is executed in a JavaScript environment, so use JSDoc for IntelliSense to introspect it.
      storySort: (a, b) => (a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true })),
    },
  },
  argTypes: {
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
    icon: {
      control: 'text',
      description: 'Nome do ícone a ser exibido à esquerda do texto',
      table: {
        category: 'Content',
        type: { summary: 'ExtendedIconName' },
      },
    },
  },
} satisfies Meta<ButtonIconProps>;

export default meta;

const baseArgs = {
  size: 'medium',
  color: 'primary',
  disabled: false,
  icon: 'close',
};

const ButtonIconTemplate = (props: ButtonIconProps) => {
  return `
    <mnt-button-icon
      variant="${props.variant}"
      color="${props.color}"
      size="${props.size}"
      icon="${props.icon}"
      ${props.disabled ? 'disabled' : ''}
    ></mnt-button-icon>
  `.trim();
};

// Story principal: Matriz de todas as variantes
export const AllVariants: Story = {
  args: {
    ...baseArgs,
  },
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
                        ${ButtonIconTemplate({ ...baseArgs, color, variant } as ButtonIconProps)}
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
  render: (args) => ButtonIconTemplate(args),
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
  render: (args) => ButtonIconTemplate(args),
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
  render: (args) => ButtonIconTemplate(args),
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
  render: (args) => ButtonIconTemplate(args),
};

// // Story: Tamanhos disponíveis
// export const Sizes: Story = {
//   parameters: {
//     layout: 'centered',
//     docs: {
//       description: {
//         story:
//           'O componente Button oferece três tamanhos: **small**, **medium** e **large**. O tamanho "tiny" não é suportado para botões. Use tamanhos consistentes dentro de cada contexto da interface.',
//       },
//     },
//   },
//   render: () => {
//     const sizes = sizeVariantsArray.filter((s) => s !== 'tiny');
//     return sizes.map((size) => ButtonTemplate({ ...baseArgs, size, variant: 'emphasis' } as ButtonProps)).join('\n');
//   },
// };

// // Story: Estados especiais
// export const States: Story = {
//   parameters: {
//     layout: 'centered',
//     docs: {
//       description: {
//         story: 'Exemplos de estados especiais do botão: **disabled** (desabilitado) e **fullWidth** (largura total do container).',
//       },
//     },
//   },
//   render: () => {
//     return `
//       <div style="display: flex; flex-direction: column; gap: 24px;">
//         <div>
//           <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666;">Disabled State</h4>
//           <div style="display: flex; gap: 12px; flex-wrap: wrap;">
//           ${ButtonTemplate({ ...baseArgs, label: 'Disabled Regular', disabled: true, variant: 'regular' } as ButtonProps)}
//           ${ButtonTemplate({ ...baseArgs, label: 'Disabled Stroke', disabled: true, variant: 'stroke' } as ButtonProps)}
//           ${ButtonTemplate({ ...baseArgs, label: 'Disabled Plain', disabled: true, variant: 'plain' } as ButtonProps)}
//           ${ButtonTemplate({ ...baseArgs, label: 'Disabled Emphasis', disabled: true, variant: 'emphasis' } as ButtonProps)}
//         </div>
//       </div>
//     `;
//   },
// };
