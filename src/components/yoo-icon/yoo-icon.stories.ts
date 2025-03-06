import type { Meta } from "@storybook/html";
import { IconProps, iconSizeArray } from './yoo-icon.types';
import { ICONS } from './yoo-icon-base';

const meta: Meta<IconProps> = {
  title: 'Components/Icon',
  component: 'yoo-icon',
  argTypes: {
    icon: {
      control: "select",
      options: Object.keys(ICONS),
    },
    size: {
      control: "select",
      options: iconSizeArray
    }
  },
};

export default meta;

const DefaultTemplate = (args) => `
<yoo-icon
  icon="${args.icon}"
  size="${args.size}"
  color="${args.color}"
></yoo-icon>
`;

export const Default = DefaultTemplate.bind({});
Default.args = {
  icon: "caret",
  size: "large",
  color: "black",
};

export const RotationTemplate = DefaultTemplate.bind({});
RotationTemplate.args = {
  icon: "caret-left",
  size: "large",
  color: "black",
};

const BackgroundTemplate = (args) => `
<yoo-icon
  icon="${args.icon}"
  size="${args.size}"
  color="${args.color}"
  background="${args.background}"
></yoo-icon>
`;

export const WithBackground = BackgroundTemplate.bind({});
WithBackground.args = {
  icon: "caret-right",
  size: "large",
  color: "white",
  background: "black"
};



