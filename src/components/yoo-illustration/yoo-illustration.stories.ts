import type { Meta } from '@storybook/html';
import type { IllustrationProps } from './yoo-illustration.types';
import { ILLUSTRATIONS } from './yoo-illustration-base';

const meta: Meta<IllustrationProps> = {
  title: 'Components/Illustration',
  component: 'yoo-illustration',
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
<yoo-illustration
  name="${args.name}"
  width="${args.width}"
  height="${args.height}"
></yoo-illustration>
`;

export const Default = DefaultTemplate.bind({});
Default.args = {
  name: 'crying',
  width: 140,
  height: 140,
};

export const LargeIllustration = DefaultTemplate.bind({});
LargeIllustration.args = {
  name: 'crying',
  width: 200,
  height: 200,
};
