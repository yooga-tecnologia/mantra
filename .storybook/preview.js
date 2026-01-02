import { setCustomElementsManifest } from '@stencil/storybook-plugin';
import { themes } from 'storybook/theming';

import { defineCustomElements } from '../loader';
import customElements from '../custom-elements.json';

import './_fonts.scss';
import './_styles.scss';

defineCustomElements();
setCustomElementsManifest(customElements);

const preview = {
  parameters: {
    backgrounds: {
      options: {
        dark: { name: 'dark', value: '#333' },
        light: { name: 'light', value: '#F7F9F2' },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.light,
      codePanel: false,
    },
    options: {
      storySort: {
        order: [
          'Components',
          [
            'Button',
            [
              'Intro',
              'Default',
              'Icon',
            ],
          ],
        ],
      },
    },
  },
  initialGlobals: {
    // 👇 Set the initial background color
    backgrounds: { value: 'light' },
  },
  decorators: [
    (story) => {
      const storyResult = story();

      // Se for string HTML, criar um wrapper
      if (typeof storyResult === 'string') {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = storyResult;
        return wrapper;
      }

      return storyResult;
    },
  ],
};

export default preview;
