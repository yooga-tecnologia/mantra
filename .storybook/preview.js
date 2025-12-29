import { defineCustomElements } from '../loader';

import { setCustomElementsManifest } from '@stencil/storybook-plugin';
import customElements from '../custom-elements.json';

defineCustomElements();
setCustomElementsManifest(customElements);

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
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