import type { Preview } from '@storybook/html';
import { defineCustomElements } from '../loader';

import '../src/_common-variables.scss';

import '../dist-custom-elements/fonts/Poppins-Medium.woff2';
import '../dist-custom-elements/fonts/Poppins-Regular.woff2';
import '../dist-custom-elements/fonts/Poppins-SemiBold.woff2';

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
