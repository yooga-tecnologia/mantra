import path from 'path';
import { fileURLToPath } from 'url';

// Obter __dirname em módulos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  staticDirs: [
    { from: '../dist-custom-elements/fonts', to: '/fonts' }
  ],
  docs: {
    defaultName: 'Docs',
  },
  async viteFinal(config, { configType }) {
    // Configurar aliases do tsconfig.json para o Vite
    config.resolve.alias = {
      ...config.resolve.alias,
      '@theme': path.resolve(__dirname, '../src/shared/theme'),
      '@assets': path.resolve(__dirname, '../src/shared/assets/fonts'),
    };

    // O GitHub Pages serve o Storybook na raiz de /mantra/.
    // Definir base garante URLs corretas para os chunks JS e que
    // import.meta.env.BASE_URL resolva para o subpath certo no browser.
    if (configType === 'PRODUCTION') {
      config.base = '/mantra/';
    }

    return config;
  },
};

export default config;