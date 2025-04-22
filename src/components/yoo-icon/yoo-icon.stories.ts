import type { Meta } from '@storybook/html';
import { iconSizes, type IconProps } from './yoo-icon.types';
import { ICONS } from './yoo-icon-base';

const meta: Meta<IconProps> = {
  title: 'Components/Icon',
  component: 'yoo-icon',
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(ICONS),
    },
    size: {
      control: 'select',
      options: Object.keys(iconSizes),
    },
    color: {
      control: 'color',
    },
    background: {
      control: 'color',
    },
  },
};

export default meta;

const DefaultTemplate = (args: IconProps) => `
<yoo-icon
  icon="${args.icon}"
  size="${args.size}"
  color="${args.color}"
  background="${args.background}"
></yoo-icon>
`;

export const Default = DefaultTemplate.bind({});
Default.args = {
  icon: 'caret',
  size: 'large',
  color: 'black',
} as IconProps;

export const RotationTemplate = DefaultTemplate.bind({});
RotationTemplate.args = {
  icon: 'caret-left',
  size: 'large',
  color: 'black',
} as IconProps;

export const WithBackground = DefaultTemplate.bind({});
WithBackground.args = {
  icon: 'caret-right',
  size: 'large',
  color: 'white',
  background: 'black',
} as IconProps;
