import type { Meta, StoryObj } from '@storybook/html';
// import { buttonStyleArray } from '../button.types';

const meta: Meta = {
  title: 'Components/Button/Regular',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    color: { control: 'select', options: ['primary', 'success', 'neutral', 'danger'] },
    variant: { control: 'text', defaultValue: 'regular' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const ComponentStory: Story = {
  args: {
    label: 'Click me',
    color: 'primary',
    variant: 'regular',
  },
  render: ({ label, color, variant }) => {
    return `
      <mnt-button
        label="${label}"
        color="${color}"
        variant="${variant}"
      ></mnt-button>
    `;
  },
};
