import type { Meta } from '@storybook/html';
import { iconSizes, type IconProps } from './yoo-icon.types';
import { ICONS } from './yoo-icon-base';
import { ICON_ANIMATION_ARRAY } from './yoo-icon.constants';

const meta: Meta<IconProps> = {
  title: 'Components/Icon',
  component: 'yoo-icon',
  argTypes: {
    icon: { control: 'select', options: Object.keys(ICONS) },
    size: { control: 'select', options: Object.keys(iconSizes) },
    color: { control: 'color' },
    background: { control: 'color' },
    animation: { control: 'select', options: ICON_ANIMATION_ARRAY },
  },
};

export default meta;

const DefaultTemplate = (args: IconProps) => `
<yoo-icon
  icon="${args.icon}"
  size="${args.size}"
  color="${args.color}"
  background="${args.background ?? ''}"
  animation="${args.animation ?? ''}"
></yoo-icon>
`;

export const Default = DefaultTemplate.bind({});
Default.args = {
  icon: 'caret',
  size: 'large',
  color: 'black',
  animation: undefined,
} as IconProps;

export const RotationTemplate = DefaultTemplate.bind({});
RotationTemplate.args = {
  icon: 'caret-left',
  size: 'large',
  color: 'black',
  animation: undefined,
} as IconProps;

export const WithBackground = DefaultTemplate.bind({});
WithBackground.args = {
  icon: 'caret-right',
  size: 'large',
  color: 'white',
  background: 'black',
  animation: undefined,
} as IconProps;
