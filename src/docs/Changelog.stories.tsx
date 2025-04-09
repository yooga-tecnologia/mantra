import { Meta } from '@storybook/html';
import { marked } from 'marked';
import changelog from '../../CHANGELOG.md?raw';

export default {
  title: 'Docs/Changelog',
  tags: ['autodocs'],
} as Meta;

export const Changelog = () => {
  const changelogHTML = marked(changelog) as string;

  const container = document.createElement('div');
  container.className = 'changelog-container';
  container.innerHTML = changelogHTML;

  return container;
};

Changelog.storyName = 'Changelog';
