import type { Preview } from '@storybook/html';
import { defineCustomElements } from '@yooga-tecnologia/mantra/loader';
import '../src/_common-variables.scss';

defineCustomElements();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ['autodocs'],
};

export default preview;
