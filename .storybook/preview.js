// Each mnt-*.js in dist/components calls customElements.define() on import
// (auto-define-custom-elements). Vite's eager glob expands to individual
// static imports at build time, preserving side effects without lazy loading.
import.meta.glob('../dist/components/mnt-*.js', { eager: true });

import customElements from '../custom-elements.json';

// _styles.scss imports _typography.scss which generates @font-face with absolute /fonts/ paths.
// _fonts.scss must come AFTER so its correctly-resolved relative paths win the CSS cascade.
import './_styles.scss';
import './_fonts.scss';

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