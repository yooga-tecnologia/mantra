import { defineCustomElements } from '../loader';
import customElements from '../custom-elements.json';

import './_fonts.scss';
import './_styles.scss';

// Stencil's lazy loader determines the base URL from the script's `src` attribute.
// When Vite bundles the loader, this detection fails and resourcesUrl becomes undefined,
// causing "Constructor for 'mnt-*#undefined' was not found" errors in production.
// We pass it explicitly using Vite's BASE_URL (set to '/mantra/storybook-static/' in prod).
defineCustomElements(window, {
  resourcesUrl: `${import.meta.env.BASE_URL}mantra/`,
});

// Configurar custom elements manifest para Storybook v10
if (customElements) {
  window.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__ = customElements;
}

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
      // theme: themes.dark, // Removido temporariamente
    },
    initialGlobals: {
      // 👇 Set the initial background color
      backgrounds: { value: 'light' },
    },
  },
  decorators: [
    (story) => {
      const storyResult = story();

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