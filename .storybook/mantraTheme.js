import { create } from 'storybook/theming';

const GITHUB_URL = 'https://github.com/yooga-tecnologia/mantra';
const BRAND_IMAGE = 'https://github.com/yooga-tecnologia/mantra/blob/main/docs/assets/mantra-logo-default.png?raw=true';

export default create({
  base: 'dark',
  // Typography
  fontBase: 'monospace',
  fontCode: 'monospace',
  brandTitle: 'mantra | Yooga\'s UI Library',
  brandUrl: GITHUB_URL,
  brandImage: BRAND_IMAGE,
  brandTarget: '_blank',

  // colorScheme
  // colorPrimary: '#3A10E5',
  // colorSecondary: '#585C6D',

  // UI
  // appBg: '#ffffff',
  // appContentBg: '#ffffff',
  // appPreviewBg: '#ffffff',
  // appBorderColor: '#585C6D',
  // appBorderRadius: 4,

  // Text colors
  // textColor: '#10162F',
  // textInverseColor: '#ffffff',

  // Toolbar default and active colors
  // barTextColor: '#9E9E9E',
  // barSelectedColor: '#585C6D',
  // barHoverColor: '#585C6D',
  // barBg: '#ffffff',

  // Form colors
  // inputBg: '#ffffff',
  // inputBorder: '#10162F',
  // inputTextColor: '#10162F',
  // inputBorderRadius: 2,
});