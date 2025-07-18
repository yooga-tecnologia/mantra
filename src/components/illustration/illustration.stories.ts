import type { Meta } from '@storybook/html';
import type { IllustrationProps } from './illustration.types';
import { ILLUSTRATIONS } from './illustration-base';

const meta: Meta<IllustrationProps> = {
  title: 'Components/Illustration',
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

export const Default = DefaultTemplate.bind({});
Default.args = {
  name: 'burger',
  width: 140,
  height: 140,
} as IllustrationProps;

export const LargeIllustration = DefaultTemplate.bind({});
LargeIllustration.args = {
  name: 'burger',
  width: 200,
  height: 200,
} as IllustrationProps;
