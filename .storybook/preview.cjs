const loader = require('../loader');

require('../src/_common-variables.scss');
require('../dist-custom-elements/fonts/Poppins-Medium.woff2');
require('../dist-custom-elements/fonts/Poppins-Regular.woff2');
require('../dist-custom-elements/fonts/Poppins-SemiBold.woff2');

loader.defineCustomElements();

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ['autodocs'],
};

module.exports = preview;
