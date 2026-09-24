import { Meta, StoryFn } from '@storybook/html-vite';
import type { ProgressBarProps } from './progress-bar.types';
import { progressBarTypeArray, progressBarColorArray, progressBarLabelPositionArray } from './progress-bar.types';

const meta: Meta<ProgressBarProps> = {
  title: 'Components/ProgressBar',
  component: 'mnt-progress-bar',
  argTypes: {
    type: {
      control: 'select',
      options: progressBarTypeArray,
    },
    value: {
      control: 'object',
      description: 'number for percent type; [current, total] for steps type',
    },
    label: {
      control: 'text',
    },
    labelPosition: {
      control: 'select',
      options: progressBarLabelPositionArray,
    },
    color: {
      control: 'select',
      options: progressBarColorArray,
    },
    fullWidth: {
      control: 'boolean',
    },
    rounded: {
      control: 'boolean',
    },
  },
};

export default meta;

const Template = (args: ProgressBarProps) => {
  const value = Array.isArray(args.value) ? JSON.stringify(args.value) : args.value;
  return `
    <mnt-progress-bar
      type="${args.type ?? 'percent'}"
      value="${value ?? 0}"
      ${args.label ? `label="${args.label}"` : ''}
      label-position="${args.labelPosition ?? 'above'}"
      color="${args.color ?? 'primary'}"
      ${args.fullWidth ? 'full-width' : ''}
      ${args.rounded ? 'rounded' : ''}
    ></mnt-progress-bar>
  `;
};

export const Percent: StoryFn<ProgressBarProps> = Template.bind({});
Percent.args = {
  type: 'percent',
  value: 50,
  label: '50% concluído',
  color: 'primary',
};

export const Steps: StoryFn<ProgressBarProps> = Template.bind({});
Steps.args = {
  type: 'steps',
  value: [1, 4],
  label: 'Etapa 1 de 4',
  color: 'primary',
};

export const Rounded: StoryFn<ProgressBarProps> = Template.bind({});
Rounded.args = {
  type: 'percent',
  value: 75,
  label: '75%',
  color: 'primary',
  rounded: true,
};

export const FullWidth: StoryFn<ProgressBarProps> = Template.bind({});
FullWidth.args = {
  type: 'percent',
  value: 30,
  label: 'Carregando...',
  color: 'success',
  fullWidth: true,
};

export const Critical: StoryFn<ProgressBarProps> = Template.bind({});
Critical.args = {
  type: 'percent',
  value: 90,
  label: 'Quase cheio',
  color: 'critical',
};

export const LabelBelow: StoryFn<ProgressBarProps> = Template.bind({});
LabelBelow.args = {
  type: 'steps',
  value: [3, 5],
  label: 'Etapa 3 de 5',
  color: 'secondary',
  labelPosition: 'bottom',
};

export const LabelLeft: StoryFn<ProgressBarProps> = Template.bind({});
LabelLeft.args = {
  type: 'steps',
  value: [1, 4],
  label: 'Etapa 1 de 4',
  color: 'primary',
  labelPosition: 'left',
  fullWidth: true,
};

export const LabelRight: StoryFn<ProgressBarProps> = Template.bind({});
LabelRight.args = {
  type: 'percent',
  value: 60,
  color: 'success',
  labelPosition: 'right',
  fullWidth: true,
};
