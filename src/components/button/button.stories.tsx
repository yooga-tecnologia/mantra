import type { StoryObj } from '@storybook/html';

type Story = StoryObj;

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    color: { control: 'select', options: ['primary', 'success', 'neutral', 'danger'] },
    variant: { control: 'text', defaultValue: 'regular' },
  },
  render: (args) => {
    return `
      <mnt-button ${args}></mnt-button>
    `;
  },
};

export const Regular: Story = {
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

export const Emphasis: Story = {
  args: {
    label: 'Click me',
    color: 'primary',
    variant: 'emphasis',
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

export const Stroke: Story = {
  args: {
    label: 'Click me',
    color: 'primary',
    variant: 'stroke',
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

export const Plain: Story = {
  args: {
    label: 'Click me',
    color: 'primary',
    variant: 'plain',
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
