import type { Meta, StoryFn } from '@storybook/html';
import type { IllustrationProps } from './illustration.types';
import { ILLUSTRATIONS } from './illustration-base';
import { HTMLString } from 'src/utils/utils';

const meta: Meta<IllustrationProps> = {
  title: 'Assets/Illustration',
  component: 'mnt-illustration',
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(ILLUSTRATIONS),
    },
    width: { control: 'number' },
    height: { control: 'number' },
  },
};

export default meta;

const DefaultTemplate = (args: IllustrationProps) => `
<mnt-illustration
  name="${args.name}"
  width="${args.width}"
  height="${args.height}"
></mnt-illustration>
`;

export const Example = DefaultTemplate.bind({});
Example.args = {
  name: 'burger',
  width: 140,
  height: 140,
} as IllustrationProps;

const renderAllIllustrations = (): HTMLString => {
  let html = '';
  Object.keys(ILLUSTRATIONS).forEach((illustration) => {
    html += `
      <div class="sb-box">
        <mnt-illustration name="${illustration}" size="medium"></mnt-illustration>
        <p class="label-regular-tiny">${illustration}</p>
      </div>
    `;
  });
  return `
    <div class="sb-grid-4 sb-grid-stretch">
      ${html}
    </div>
  `;
};

export const AllIllustrations: StoryFn = () => renderAllIllustrations();
AllIllustrations.parameters = {
  docs: {
    description: {
      story: 'Listagem completa de todas as ilustrações disponíveis no sistema.',
    },
    source: {
      code: renderAllIllustrations(),
    },
  },
  controls: { disable: true },
};
