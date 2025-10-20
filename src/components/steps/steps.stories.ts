import type { Meta, StoryFn } from '@storybook/html';
import { StepsProps, stepOrientationArray, StepItem } from './steps.types';

type HTMLString = string;

const meta: Meta<StepsProps> = {
  title: 'Navigation/Steps',
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
      description: 'Array de steps com id, label e status',
    },
    activeStepId: {
      control: 'text',
      description: 'ID do step ativo',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**Steps** é um componente de navegação sequencial que permite aos usuários visualizar e navegar através de etapas de um processo.\n\n' +
          '### 🎯 **Características principais:**\n' +
          '- **Navegação inteligente:** Apenas steps anteriores e o atual são clicáveis\n' +
          '- **Controle de progresso:** Mantém registro do maior índice acessado para desabilitar steps futuros\n' +
          '- **Flexibilidade:** Suporta orientação horizontal e vertical\n' +
          '- **Personalização:** Permite ícones customizados ou números\n' +
          '- **Acessibilidade:** Inclui atributos ARIA para navegação por teclado\n\n' +
          '### 🔄 **Comportamento de navegação:**\n' +
          '- **Steps anteriores:** Sempre clicáveis (podem ser revisitados)\n' +
          '- **Step atual:** Ativo e clicável\n' +
          '- **Steps futuros:** Desabilitados até serem "desbloqueados" pelo progresso\n' +
          '- **Desbloqueio:** Quando um step é acessado, todos os steps até aquele índice ficam disponíveis\n\n' +
          '### 📏 **Orientações disponíveis:**\n' +
          '- **Horizontal:** Ideal para processos lineares em telas maiores\n' +
          '- **Vertical:** Perfeito para formulários longos ou processos em mobile\n\n' +
          '### 🎨 **Estados dos steps:**\n' +
          '- **Done:** Step concluído com ícone de check (clicável)\n' +
          '- **Active:** Step atual (clicável)\n' +
          '- **Disabled:** Step futuro (não clicável)\n\n' +
          '### 🔧 **API do componente:**\n' +
          '- **Props:** `orientation`, `steps`, `activeStepId`\n' +
          '- **Eventos:** `stepClick` - emitido quando um step é clicado\n' +
          '- **Métodos públicos:** `nextStep()`, `previousStep()`, `resetToFirstStep()`, `goToStep()`, etc.\n\n' +
          '### 💡 **Casos de uso:**\n' +
          '- Formulários multi-etapas\n' +
          '- Processos de onboarding\n' +
          '- Fluxos de checkout\n' +
          '- Configurações passo a passo\n' +
          '- Wizards de configuração\n\n' +
          '**Figma:** [Core Components | Steps](https://www.figma.com/design/ezr4b0ZxjmeWjASveGQoJS/-1-Core-Components?node-id=407-2410&m=dev)\n\n',
      },
    },
  },
};

export default meta;

const DefaultTemplate = (args: StepsProps): HTMLString => {
  const id = `mnt-steps-${Math.random().toString(36).substr(2, 9)}`;

  // Usar setTimeout para garantir que o elemento existe antes de definir a prop
  setTimeout(() => {
    const element = document.getElementById(id) as any;
    if (element) {
      element.steps = args.steps;
      element.activeStepId = args.activeStepId;
    }
  }, 0);

  return `
    <mnt-steps
      id="${id}"
      orientation="${args.orientation}"
    ></mnt-steps>
  `;
};

export const Default: StoryFn = DefaultTemplate.bind({});
Default.args = {
  orientation: 'horizontal',
  activeStepId: 'step-3',
  steps: [
    { id: 'step-1', label: 'Informações', status: 'done' },
    { id: 'step-2', label: 'Endereço', status: 'done' },
    { id: 'step-3', label: 'Pagamento', status: 'active' },
    { id: 'step-4', label: 'Confirmação', status: 'disabled' },
  ] as StepItem[],
} as StepsProps;
Default.storyName = 'Playground';
Default.parameters = {
  id: 'steps-playground',
  docs: {
    description: {
      story: 'Playground do componente `<mnt-steps>`. Experimente diferentes orientações, steps e estados.',
    },
  },
};

export const Horizontal: StoryFn = () => {
  const steps = [
    { id: 'step-1', label: 'Completed', status: 'done' },
    { id: 'step-2', label: 'Completed', status: 'done' },
    { id: 'step-3', label: 'Completed', status: 'done' },
    { id: 'step-4', label: 'Active', status: 'active' },
    { id: 'step-5', label: 'Disabled', status: 'disabled' },
    { id: 'step-6', label: 'Disabled', status: 'disabled' },
    { id: 'step-7', label: 'Disabled', status: 'disabled' },
  ] as StepItem[];

  return DefaultTemplate({ orientation: 'horizontal', activeStepId: 'step-4', steps });
};

Horizontal.storyName = 'Horizontal Orientation';
Horizontal.parameters = {
  id: 'steps-horizontal',
  docs: {
    description: {
      story: 'Componente Steps em orientação horizontal, ideal para processos lineares em telas maiores.',
    },
  },
  controls: { disable: true },
};

export const Vertical: StoryFn = () => {
  const steps = [
    { id: 'step-1', label: 'Completed', status: 'done' },
    { id: 'step-2', label: 'Completed', status: 'done' },
    { id: 'step-3', label: 'Completed', status: 'done' },
    { id: 'step-4', label: 'Active', status: 'active' },
    { id: 'step-5', label: 'Disabled', status: 'disabled' },
    { id: 'step-6', label: 'Disabled', status: 'disabled' },
    { id: 'step-7', label: 'Disabled', status: 'disabled' },
  ] as StepItem[];

  return DefaultTemplate({ orientation: 'vertical', activeStepId: 'step-4', steps });
};

Vertical.storyName = 'Vertical Orientation';
Vertical.parameters = {
  id: 'steps-vertical',
  docs: {
    description: {
      story: 'Componente Steps em orientação vertical, perfeito para formulários longos ou processos em mobile.',
    },
  },
  controls: { disable: true },
};

export const AllStates: StoryFn = () => {
  const horizontalSteps = [
    { id: 'step-1', label: 'Completed', status: 'done' },
    { id: 'step-2', label: 'Active', status: 'active' },
    { id: 'step-3', label: 'Disabled', status: 'disabled' },
  ] as StepItem[];

  const verticalSteps = [
    { id: 'step-1', label: 'Completed', status: 'done' },
    { id: 'step-2', label: 'Active', status: 'active' },
    { id: 'step-3', label: 'Disabled', status: 'disabled' },
  ] as StepItem[];

  return `
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h3>Horizontal</h3>
        ${DefaultTemplate({ orientation: 'horizontal', activeStepId: 'step-2', steps: horizontalSteps })}
      </div>
      <div>
        <h3>Vertical</h3>
        ${DefaultTemplate({ orientation: 'vertical', activeStepId: 'step-2', steps: verticalSteps })}
      </div>
    </div>
  `;
};

AllStates.storyName = 'All States';
AllStates.parameters = {
  id: 'steps-all-states',
  docs: {
    description: {
      story: 'Demonstração de todos os estados possíveis dos steps: completed, active e disabled.',
    },
  },
  controls: { disable: true },
};

export const WithNumbers: StoryFn = () => {
  const steps = [
    { id: 'step-1', label: 'Passo 1', status: 'done', icon: 1 },
    { id: 'step-2', label: 'Passo 2', status: 'done', icon: 2 },
    { id: 'step-3', label: 'Passo 3', status: 'active', icon: 3 },
    { id: 'step-4', label: 'Passo 4', status: 'disabled', icon: 4 },
    { id: 'step-5', label: 'Passo 5', status: 'disabled', icon: 5 },
  ] as StepItem[];

  return DefaultTemplate({ orientation: 'horizontal', activeStepId: 'step-3', steps });
};

WithNumbers.storyName = 'With Numbers';
WithNumbers.parameters = {
  id: 'steps-with-numbers',
  docs: {
    description: {
      story: 'Steps com ícones numéricos para indicar a ordem sequencial do processo.',
    },
  },
  controls: { disable: true },
};

export const WithCustomIcons: StoryFn = () => {
  const steps = [
    { id: 'step-1', label: 'Usuário', status: 'done', icon: 'userCircle' },
    { id: 'step-2', label: 'Endereço', status: 'done', icon: 'houseSimple' },
    { id: 'step-3', label: 'Pagamento', status: 'active', icon: 'currencyDollarCircle' },
    { id: 'step-4', label: 'Confirmação', status: 'disabled', icon: 'checkCircle' },
  ] as StepItem[];

  return DefaultTemplate({ orientation: 'horizontal', activeStepId: 'step-3', steps });
};

WithCustomIcons.storyName = 'With Custom Icons';
WithCustomIcons.parameters = {
  id: 'steps-with-icons',
  docs: {
    description: {
      story: 'Steps com ícones customizados para representar visualmente cada etapa do processo.',
    },
  },
  controls: { disable: true },
};

export const WithDoneStatus: StoryFn = () => {
  const steps = [
    { id: 'step-1', label: 'Concluído', status: 'done' },
    { id: 'step-2', label: 'Concluído', status: 'done' },
    { id: 'step-3', label: 'Ativo', status: 'active' },
    { id: 'step-4', label: 'Desabilitado', status: 'disabled' },
  ] as StepItem[];

  return DefaultTemplate({ orientation: 'horizontal', activeStepId: 'step-3', steps });
};

WithDoneStatus.storyName = 'With Done Status';
WithDoneStatus.parameters = {
  id: 'steps-with-done',
  docs: {
    description: {
      story: 'Steps com status "done" que exibem automaticamente o ícone de check (✓).',
    },
  },
  controls: { disable: true },
};
