import type { StoryObj } from '@storybook/html-vite';

import { tooltipPositions, TooltipProps } from './tooltip.types';

type Story = StoryObj;

export default {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
O componente \`mnt-tooltip\` suporta as posições \`top\`, \`bottom\`, \`left\` e \`right\`.

O tooltip é exibido quando o usuário passa o mouse sobre o elemento que contém o tooltip.

### Recomendações:
- SEMPRE utilizar o slot \`trigger\` para exibir o tooltip. Caso contrário, o tooltip não será exibido.
- É possível utilizar **qualquer elemento** como trigger, desde que seja um filho direto do \`mnt-tooltip\`.
- Não é recomendado exibir mensagens muito extensas, pois o visual ficará comprometido.
`,
      },
      codePanel: true,
      source: {
        transform: (_: string, storyContext: StoryObj) => {
          return TooltipTemplate(storyContext.args as TooltipProps, '<button slot="trigger">Hover me</button>');
        },
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'O texto exibido no tooltip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    position: {
      control: 'select',
      options: tooltipPositions,
      description: 'A posição do tooltip',
      table: {
        type: { summary: tooltipPositions.join(' | ') },
        defaultValue: { summary: 'top' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-tooltip ${args}></mnt-tooltip>
    `;
  },
};

const TooltipTemplate = (props: TooltipProps, trigger: string) => {
  return `<mnt-tooltip text="${props.text}" position="${props.position}">${trigger}</mnt-tooltip>`;
};

/**
 * Exemplo simples de uso
 */
export const Simple: Story = {
  args: {
    text: 'Texto do tooltip',
    position: 'top',
  },
  render: (args) => TooltipTemplate(args as TooltipProps, '<button slot="trigger">Hover me</button>'),
};

/**
 * Exemplo de uso com `mnt-button`
 */
export const ButtonTrigger: Story = {
  args: {
    text: 'Texto do tooltip',
    position: 'top',
  },
  render: (args) => TooltipTemplate(args as TooltipProps, '<mnt-button variant="emphasis" color="primary" icon-left="info" label="Hover me" slot="trigger"></mnt-button>'),
};
