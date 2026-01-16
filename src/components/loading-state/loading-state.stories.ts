import type { Meta, StoryFn } from '@storybook/html';

import { HTMLString } from 'src/utils/utils';

import { LoadingStateProps } from './loading-state';
import { LoadingState } from './loading-state';

const colorOptions = ['neutral', 'primary', 'secondary', 'success', 'warning', 'error'] as const;

const meta: Meta<LoadingStateProps> = {
  title: 'Components/LoadingState',
  component: 'mnt-loading-state',
  parameters: {
    docs: {
      description: {
        component:
          '### 🎯 **Características principais:**\n' +
          '**LoadingState** é o componente de loading que exibe um spinner e um texto.\n\n' +
          'Geralmente utilizado para indicar que um conteúdo está carregando.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto exibido abaixo do spinner',
    },
    color: {
      control: 'select',
      options: colorOptions,
      table: {
        defaultValue: { summary: 'neutral' },
        type: { summary: colorOptions.join(' | ') },
      },
    },
  },
};

export default meta;

const DefaultTemplate = (args: LoadingStateProps): HTMLString => `
  <div style="height: 300px; display: flex; align-items: center; justify-content: center;">
    <mnt-loading-state
      color="${args.color ?? 'neutral'}"
      label="${args.label ?? ''}"
    ></mnt-loading-state>
  </div>
`;

export const Example = DefaultTemplate.bind({});
Example.args = {
  color: 'primary',
  label: 'Carregando...',
} as LoadingStateProps;

export const WithoutLabel = DefaultTemplate.bind({});
WithoutLabel.args = {
  color: 'primary',
} as LoadingStateProps;

const getColorVariant = (color: LoadingStateProps['color']): HTMLString => {
  return `
    <div style="height: 200px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
      <mnt-loading-state color="${color}" label="${color}"></mnt-loading-state>
    </div>
  `;
};

export const AllColorVariants: StoryFn<typeof LoadingState> = () => {
  const variants: HTMLString[] = [];
  colorOptions.forEach((color) => {
    variants.push(getColorVariant(color));
  });
  return `
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
      ${variants.join('')}
    </div>
  `;
};

AllColorVariants.parameters = {
  controls: { disable: true },
};

export const WithLongLabel = DefaultTemplate.bind({});
WithLongLabel.args = {
  color: 'primary',
  label: 'Aguarde enquanto processamos sua solicitação...',
} as LoadingStateProps;
