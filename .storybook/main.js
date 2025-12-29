// import type { StorybookConfig } from '@storybook/html-vite';

const config = {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  staticDirs: [
    { from: '../dist-custom-elements/fonts', to: '/fonts' }
  ],
};

export default config;
