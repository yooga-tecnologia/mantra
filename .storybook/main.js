// import type { StorybookConfig } from '@storybook/html-vite';

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
};

export default config;
