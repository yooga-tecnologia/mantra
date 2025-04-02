import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'mantra',
  globalStyle: './src/_common-variables.scss',
  outputTargets: [

    /**
     * Distribution Output Target
     * @see https://stenciljs.com/docs/distribution
     * */

    {
      type: 'dist',
      esmLoaderPath: '../loader',
      transformAliasedImportPathsInCollection: true,
      copy: [
        {
          // Copia para dist/assets
          src: 'shared/assets/fonts',
          dest: 'fonts',
        }
      ],
    },

    /**
     * Custom Elements
     * @see https://stenciljs.com/docs/custom-elements
     * */

    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
      copy: [
        {
          src: 'shared/assets/fonts',
          dest: 'dist-custom-elements/fonts',
        },
      ]
    },

    /**
     * Webapp Output Target
     * @see https://stenciljs.com/docs/www
     * */

    {
      type: 'www',
      serviceWorker: null,
      copy: [
        {
          src: 'shared/assets/fonts',
          dest: 'fonts',
        }
      ],
    },

    {
      type: 'docs-readme',
    },
  ],
  testing: {
    browserHeadless: "shell",
  },
  plugins: [
    sass()
  ]
};
