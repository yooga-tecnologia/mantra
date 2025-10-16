import type { Meta, StoryFn } from '@storybook/html';
import { HTMLString } from '../../utils/utils';
import { StepsProps, stepOrientationArray, StepItem } from './steps.types';

const meta: Meta<StepsProps> = {
  title: 'Components/Steps/Default',
  component: 'mnt-steps',
  argTypes: {
    orientation: {
      control: 'select',
      options: stepOrientationArray,
      description: 'Orientação do componente steps',
      table: {
        defaultValue: { summary: 'horizontal' },
        type: { summary: stepOrientationArray.join(' | ') },
      },
    },
    steps: {
      control: 'object',
      description: 'Array de steps com label e status',
    },
  },
};

export default meta;

const DefaultTemplate = (args: StepsProps): HTMLString => {
  // Criar um ID único para este componente
  const id = `mnt-steps-${Math.random().toString(36).substr(2, 9)}`;
  
  // Usar setTimeout para garantir que o elemento existe antes de definir a prop
  setTimeout(() => {
    const element = document.getElementById(id) as any;
    if (element) {
      element.steps = args.steps;
    }
  }, 0);
  
  return `
    <mnt-steps
      id="${id}"
      orientation="${args.orientation}"
    ></mnt-steps>
  `;
};

export const Example = DefaultTemplate.bind({});
Example.args = {
  orientation: 'horizontal',
  steps: [
    { label: 'Step 1', status: 'completed' },
    { label: 'Step 2', status: 'completed' },
    { label: 'Step 3', status: 'active' },
    { label: 'Step 4', status: 'disabled' },
  ] as StepItem[],
} as StepsProps;

export const Horizontal: StoryFn = () => {
  const steps = [
    { label: 'Completed', status: 'completed' },
    { label: 'Completed', status: 'completed' },
    { label: 'Completed', status: 'completed' },
    { label: 'Active', status: 'active' },
    { label: 'Disabled', status: 'disabled' },
    { label: 'Disabled', status: 'disabled' },
    { label: 'Disabled', status: 'disabled' },
  ] as StepItem[];
  
  return DefaultTemplate({ orientation: 'horizontal', steps });
};

Horizontal.parameters = {
  controls: { disable: true },
};

export const Vertical: StoryFn = () => {
  const steps = [
    { label: 'Completed', status: 'completed' },
    { label: 'Completed', status: 'completed' },
    { label: 'Completed', status: 'completed' },
    { label: 'Active', status: 'active' },
    { label: 'Disabled', status: 'disabled' },
    { label: 'Disabled', status: 'disabled' },
    { label: 'Disabled', status: 'disabled' },
  ] as StepItem[];
  
  return DefaultTemplate({ orientation: 'vertical', steps });
};

Vertical.parameters = {
  controls: { disable: true },
};

export const AllStates: StoryFn = () => {
  const horizontalSteps = [
    { label: 'Completed', status: 'completed' },
    { label: 'Active', status: 'active' },
    { label: 'Disabled', status: 'disabled' },
  ] as StepItem[];
  
  const verticalSteps = [
    { label: 'Completed', status: 'completed' },
    { label: 'Active', status: 'active' },
    { label: 'Disabled', status: 'disabled' },
  ] as StepItem[];
  
  return `
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3>Horizontal</h3>
        ${DefaultTemplate({ orientation: 'horizontal', steps: horizontalSteps })}
      </div>
      <div>
        <h3>Vertical</h3>
        ${DefaultTemplate({ orientation: 'vertical', steps: verticalSteps })}
      </div>
    </div>
  `;
};

AllStates.parameters = {
  controls: { disable: true },
};

export const WithNumbers: StoryFn = () => {
  const steps = [
    { label: 'Passo 1', status: 'completed', icon: 1 },
    { label: 'Passo 2', status: 'completed', icon: 2 },
    { label: 'Passo 3', status: 'active', icon: 3 },
    { label: 'Passo 4', status: 'disabled', icon: 4 },
    { label: 'Passo 5', status: 'disabled', icon: 5 },
  ] as StepItem[];
  
  return DefaultTemplate({ orientation: 'horizontal', steps });
};

WithNumbers.parameters = {
  controls: { disable: true },
};

export const WithCustomIcons: StoryFn = () => {
  const steps = [
    { label: 'Usuário', status: 'completed', icon: 'userCircle' },
    { label: 'Endereço', status: 'completed', icon: 'houseSimple' },
    { label: 'Pagamento', status: 'active', icon: 'currencyDollarCircle' },
    { label: 'Confirmação', status: 'disabled', icon: 'checkCircle' },
  ] as StepItem[];
  
  return DefaultTemplate({ orientation: 'horizontal', steps });
};

WithCustomIcons.parameters = {
  controls: { disable: true },
};

