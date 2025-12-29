import { marked } from 'marked';
import readme from '../../readme.md?raw';

export default {
  title: 'Intro',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: {
      disable: true,
    },
    measures: {
      disable: true,
    },
    controls: {
      disable: true,
    },
    actions: {
      disable: true,
    },
    viewport: {
      disable: true,
    },
  },
};

export const GettingStarted = () => {
  const readmeContent = marked(readme) as string;
  const container = document.createElement('div');
  container.className = 'sb-docs-container';
  container.innerHTML = readmeContent;

  return container;
};
