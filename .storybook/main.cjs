const path = require('path');

const CONFIG_FONTS = {
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  type: 'asset/resource',
  generator: {
    filename: '[name][ext]',
  },
  // test: /\.(woff|woff2|eot|ttf|otf)$/,
  // use: [
  //   {
  //     loader: 'file-loader',
  //     options: {
  //       name: 'static/media/dist-custom-elements/fonts/[name].[ext]',
  //       outputPath: 'static/media/dist-custom-elements/fonts/',
  //       publicPath: '/static/media/dist-custom-elements/fonts/',
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

/** @type {import('@storybook/html-webpack5').StorybookConfig} */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
  docs: {},
  webpackFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '/fonts': path.resolve(__dirname, '../dist-custom-elements/fonts'),
        '/static/media/dist-custom-elements/fonts': path.resolve(
          __dirname,
          '../dist-custom-elements/fonts'
        ),
      },
    };

    config.module?.rules?.push(CONFIG_FONTS, CONFIG_SCSS, CONFIG_RAW);

    return config;
  },
};

module.exports = config;
