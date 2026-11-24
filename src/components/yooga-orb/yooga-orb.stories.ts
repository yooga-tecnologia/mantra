import type { StoryFn, StoryObj } from '@storybook/html-vite';

import { HTMLString } from 'src/utils/utils';
import { YoogaOrbProps, yoogaOrbSizes, yoogaOrbStates } from './yooga-orb.types';

type Story = StoryObj;

export default {
  title: 'Assets/Yooga Orb',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Avatar animado da Maya, construído a partir da geometria oficial do \`yoogaIcon\`.

A animação apenas revela partes do próprio logo através de uma \`<mask>\` SVG, sem desenhar formas por cima.

- **idle**: animação lenta. Só para a tela inicial, uma instância por tela.
- **thinking**: animação rápida com halo, enquanto a IA trabalha.
- **settled**: logo inteiro aceso e estático, para cada resposta do histórico.
        `,
      },
      codePanel: true,
      source: {
        transform: (_: string, storyContext: StoryObj) => {
          return YoogaOrbTemplate(storyContext.args as YoogaOrbProps);
        },
      },
    },
  },
  argTypes: {
    state: {
      control: 'select',
      options: yoogaOrbStates,
      description: 'Estado visual do orb.',
      table: {
        type: { summary: yoogaOrbStates.join(' | ') },
        defaultValue: { summary: 'idle' },
      },
    },
    size: {
      control: 'select',
      options: Object.keys(yoogaOrbSizes),
      description: 'Tamanho do orb: `sm` (32px), `md` (40px), `lg` (64px) ou um número em pixels.',
      table: {
        type: { summary: 'sm | md | lg | number' },
        defaultValue: { summary: 'sm' },
      },
    },
    bloom: {
      control: 'boolean',
      description: 'Dispara um brilho de 1s, uma única vez, quando a resposta acabou de chegar.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    decorative: {
      control: 'boolean',
      description: 'Esconde do leitor de tela quando o nome "Maya" já aparece ao lado.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Nome acessível. O padrão muda com o estado ("Maya" / "Maya está pensando").',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
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

const YoogaOrbTemplate = (props: YoogaOrbProps): HTMLString => {
  return `
    <mnt-yooga-orb
      state="${props.state}"
      size="${props.size}"
      ${props.bloom ? 'bloom' : ''}
      ${props.decorative ? 'decorative' : ''}
      ${props.label ? `label="${props.label}"` : ''}
    ></mnt-yooga-orb>
  `;
};

export const Default: Story = {
  args: {
    state: 'idle',
    size: 'lg',
    bloom: false,
    decorative: false,
  },
  render: YoogaOrbTemplate,
};

const renderBox = (content: string, caption: string): HTMLString => `
  <div class="sb-box">
    ${content}
    <p class="label-regular-tiny">${caption}</p>
  </div>
`;

/**
 * Os três estados lado a lado.
 */
export const States: StoryFn = () => `
  <div class="sb-section">
    <div class="sb-grid-3 sb-grid-stretch">
      ${yoogaOrbStates.map((state) => renderBox(`<mnt-yooga-orb state="${state}" size="lg"></mnt-yooga-orb>`, state)).join('')}
    </div>
  </div>
`;

States.parameters = disableArgs;

/**
 * Tamanhos predefinidos e tamanho numérico.
 */
export const Sizes: StoryFn = () => `
  <div class="sb-section">
    <div class="sb-grid-4 sb-grid-stretch">
      ${[...Object.keys(yoogaOrbSizes), '96']
        .map((size) => renderBox(`<mnt-yooga-orb state="thinking" size="${size}"></mnt-yooga-orb>`, size))
        .join('')}
    </div>
  </div>
`;

Sizes.parameters = disableArgs;

/**
 * Alterne entre `thinking` e `settled`: o brilho toca apenas na transição de `thinking` para `settled`.
 */
export const Bloom: StoryFn = () => `
  <div class="sb-section">
    <mnt-yooga-orb state="thinking" size="lg"></mnt-yooga-orb>
    <button
      type="button"
      onclick="const orb = this.previousElementSibling; orb.state = orb.state === 'thinking' ? 'settled' : 'thinking';"
    >
      Alternar thinking / settled
    </button>
  </div>
`;

Bloom.parameters = disableArgs;

/**
 * Várias instâncias em `settled`, como no histórico: nenhuma anima e os IDs não colidem.
 */
export const History: StoryFn = () => `
  <div class="sb-section">
    ${Array.from({ length: 5 })
      .map(() => `<mnt-yooga-orb state="settled" size="sm" decorative></mnt-yooga-orb>`)
      .join('')}
  </div>
`;

History.parameters = disableArgs;
