import path from 'path';
import { fileURLToPath } from 'url';
import type { StorybookConfig } from '@storybook/html-webpack5';

// Simula __dirname no modo ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_FONTS = {
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  type: 'asset/resource',
  generator: {
    filename: '[name][ext]', // Ajusta o destino das fontes no Storybook
  },

  // test: /\.(woff|woff2|eot|ttf|otf)$/,
  // use: [
  //   {
  //     loader: 'file-loader',
  //     options: {
  //       name: 'static/media/dist-custom-elements/fonts/[name].[ext]',
  //       outputPath: 'static/media/dist-custom-elements/fonts/',
  //       publicPath: '/static/media/dist-custom-elements/fonts/',   // Faz o Webpack servir as fontes corretamente
  //     },
  //   },
  // ],
};

const CONFIG_SCSS = {
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader'],
  include: path.resolve(__dirname, '../src'),
};

const CONFIG_RAW = {
  test: /\.md$/,
  type: 'asset/source',
};

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-webpack5-compiler-swc', '@storybook/addon-essentials', '@chromatic-com/storybook', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
  docs: {},
  webpackFinal: async config => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '/fonts': path.resolve(__dirname, '../dist-custom-elements/fonts'),
        // Garante que o Webpack encontre as fontes
        '/static/media/dist-custom-elements/fonts': path.resolve(__dirname, '../dist-custom-elements/fonts'),
      },
    };

    config.module?.rules?.push(CONFIG_FONTS, CONFIG_SCSS, CONFIG_RAW);

    return config;
  },
};
export default config;
