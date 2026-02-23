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
  async viteFinal(config) {
    // Configurar aliases do tsconfig.json para o Vite
    config.resolve.alias = {
      ...config.resolve.alias,
      '@theme': path.resolve(__dirname, '../src/shared/theme'),
      '@assets': path.resolve(__dirname, '../src/shared/assets/fonts'),
    };
    return config;
  },
};

export default config;