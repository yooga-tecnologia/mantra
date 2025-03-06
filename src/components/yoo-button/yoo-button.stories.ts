import type { Meta } from "@storybook/html";
import { ButtonProps } from "./yoo-button";
import { buttonStyleArray } from './yoo-button.types';
import { sizeVariantsArray, themePaletteArray } from '../../shared/theme/theme.types';

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: 'yoo-button',
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: buttonStyleArray },
    color: { control: 'select', options: themePaletteArray },
    size: { control: 'select', options: sizeVariantsArray },
    disabled: { control: 'boolean' },
  },
};

export default meta;

const Template = (args) => `
  <yoo-button
    label="${args.label}"
    variant="${args.variant}"
    color="${args.color}"
    size="${args.size}"
    disabled="${args.disabled}"
  ></yoo-button>
`;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary',
  variant: 'emphasis',
  color: 'primary',
  size: 'medium',
  disabled: false,
};