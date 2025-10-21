import type { Meta, StoryFn } from '@storybook/html';

import { tabOrientationArray } from './tab-item.types';
import type { TabItemProps } from './tab-item.types';
import { HTMLString } from 'src/utils/utils';
import { TabItem } from './tab-item';

const meta: Meta<TabItemProps> = {
  title: 'Navigation/Tab/TabItem',
  component: 'mnt-tab-item',
  argTypes: {
    tabId: {
      control: 'text',
      description: 'Unique identifier for the tab item',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    label: {
      control: 'text',
      description: 'Text label displayed in the tab',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    icon: {
      control: 'text',
      description: 'Icon name to display in the tab',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    selected: {
      control: 'boolean',
      description: 'Whether the tab is currently selected',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tab is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    orientation: {
      control: 'select',
      options: tabOrientationArray,
      description: 'Orientation of the tab item',
      table: {
        defaultValue: { summary: 'horizontal' },
        type: { summary: tabOrientationArray.join(' | ') },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '**TabItem** é um componente individual de aba (tab) que representa uma única opção de navegação dentro de um sistema de tabs.\n\n' +
          '### 🎯 **Características principais:**\n' +
          '- **Elemento individual:** Representa uma única aba dentro de um grupo de navegação\n' +
          '- **Estados visuais:** Suporte a estados selected, disabled e hover\n' +
          '- **Ícones opcionais:** Pode exibir um ícone junto com o texto\n' +
          '- **Orientação flexível:** Funciona tanto em layout horizontal quanto vertical\n' +
          '- **Interatividade:** Emite eventos quando clicado (se não estiver desabilitado)\n' +
          '- **Acessibilidade:** Suporte completo a navegação por teclado e screen readers\n\n' +
          '### 📏 **Orientações disponíveis:**\n' +
          '- **Horizontal:** Ideal para navegação principal em headers ou seções superiores\n' +
          '- **Vertical:** Perfeito para sidebars, menus laterais ou navegação secundária\n\n' +
          '### 🎨 **Estados da tab:**\n' +
          '- **Default:** Estado normal, clicável e disponível\n' +
          '- **Selected:** Tab atualmente selecionada (destaque visual)\n' +
          '- **Disabled:** Tab desabilitada, não clicável\n' +
          '- **Hover:** Estado de interação ao passar o mouse\n\n' +
          '### 🔧 **API do componente:**\n' +
          '- **Props:** `tabId`, `label`, `icon`, `selected`, `disabled`, `orientation`\n' +
          '- **Eventos:** `tabItemClick` - emitido quando a tab é clicada\n' +
          '- **Métodos:** Gerenciamento automático de estado interno\n\n' +
          '### 💡 **Casos de uso:**\n' +
          '- Navegação principal de aplicações\n' +
          '- Seções de configurações\n' +
          '- Dashboards e painéis administrativos\n' +
          '- Formulários multi-etapas\n' +
          '- Filtros e categorias\n\n' +
          '**Nota:** Este componente é geralmente usado dentro de um `TabItemGroup` para formar um sistema completo de navegação por abas.\n\n' +
          '**Figma:** [Global Assets | Tab](https://www.figma.com/design/ezr4b0ZxjmeWjASveGQoJS/-1-Core-Components?node-id=407-2410&m=dev)\n\n',
      },
    },
  },
};

export default meta;

const DefaultTemplate = (args: TabItemProps): HTMLString => `
  <mnt-tab-item
    tab-id="${args.tabId || ''}"
    label="${args.label || ''}"
    icon="${args.icon || ''}"
    selected="${args.selected}"
    disabled="${args.disabled}"
    orientation="${args.orientation}"
  ></mnt-tab-item>
`;

export const Default: StoryFn = DefaultTemplate.bind({});
Default.args = {
  tabId: 'tab-1',
  label: 'Overview',
  icon: 'houseSimple',
  selected: false,
  disabled: false,
  orientation: 'horizontal',
} as TabItemProps;

export const WithIcon: StoryFn<typeof TabItem> = () => {
  return DefaultTemplate({
    tabId: 'tab-1',
    label: 'Settings',
    icon: 'wrench',
    selected: true,
    disabled: false,
    orientation: 'horizontal',
  });
};

WithIcon.storyName = 'With Icon';
WithIcon.parameters = {
  id: 'tab-item-with-icon',
  docs: {
    description: {
      story: 'Tab com ícone para melhor identificação visual. O ícone é exibido junto com o texto do label.',
    },
  },
  controls: { disable: true },
};

export const WithoutIcon: StoryFn<typeof TabItem> = () => {
  return DefaultTemplate({
    tabId: 'tab-2',
    label: 'Profile',
    selected: false,
    disabled: false,
    orientation: 'horizontal',
  });
};

WithoutIcon.storyName = 'Without Icon';
WithoutIcon.parameters = {
  id: 'tab-item-without-icon',
  docs: {
    description: {
      story: 'Tab sem ícone, usando apenas texto. Ideal para interfaces mais minimalistas ou quando o espaço é limitado.',
    },
  },
  controls: { disable: true },
};

export const Selected: StoryFn<typeof TabItem> = () => {
  return DefaultTemplate({
    tabId: 'tab-3',
    label: 'Selected Tab',
    icon: 'bell',
    selected: true,
    disabled: false,
    orientation: 'horizontal',
  });
};

Selected.storyName = 'Selected State';
Selected.parameters = {
  id: 'tab-item-selected',
  docs: {
    description: {
      story: 'Tab no estado selecionado. Apresenta destaque visual para indicar que é a aba ativa.',
    },
  },
  controls: { disable: true },
};

export const Disabled: StoryFn<typeof TabItem> = () => {
  return DefaultTemplate({
    tabId: 'tab-4',
    label: 'Disabled Tab',
    icon: 'bell',
    selected: false,
    disabled: true,
    orientation: 'horizontal',
  });
};

Disabled.storyName = 'Disabled State';
Disabled.parameters = {
  id: 'tab-item-disabled',
  docs: {
    description: {
      story: 'Tab no estado desabilitado. Não é clicável e tem aparência visual diferenciada para indicar indisponibilidade.',
    },
  },
  controls: { disable: true },
};

export const VerticalOrientation: StoryFn<typeof TabItem> = () => {
  return DefaultTemplate({
    tabId: 'tab-5',
    label: 'Vertical Tab',
    icon: 'bell',
    selected: false,
    disabled: false,
    orientation: 'vertical',
  });
};

VerticalOrientation.storyName = 'Vertical Orientation';
VerticalOrientation.parameters = {
  id: 'tab-item-vertical',
  docs: {
    description: {
      story: 'Tab com orientação vertical. Ideal para sidebars, menus laterais ou quando há muitas opções de navegação.',
    },
  },
  controls: { disable: true },
};

export const VerticalWithIcon: StoryFn<typeof TabItem> = () => {
  return DefaultTemplate({
    tabId: 'tab-6',
    label: 'Vertical with Icon',
    icon: 'bell',
    selected: true,
    disabled: false,
    orientation: 'vertical',
  });
};

VerticalWithIcon.storyName = 'Vertical with Icon';
VerticalWithIcon.parameters = {
  id: 'tab-item-vertical-icon',
  docs: {
    description: {
      story: 'Tab vertical com ícone. Combinação de orientação vertical com ícone para melhor identificação visual.',
    },
  },
  controls: { disable: true },
};

export const AllStates: StoryFn<typeof TabItem> = () => {
  const states: HTMLString[] = [];

  // Horizontal states
  states.push(`
    <div class="sb-section-box">
      <h4>Horizontal States</h4>
      <div style="display: flex; gap: 8px; margin-bottom: 16px;">
        ${DefaultTemplate({
          tabId: 'tab-1',
          label: 'Default',
          icon: 'houseSimple',
          selected: false,
          disabled: false,
          orientation: 'horizontal',
        })}
        ${DefaultTemplate({
          tabId: 'tab-2',
          label: 'Selected',
          icon: 'wrench',
          selected: true,
          disabled: false,
          orientation: 'horizontal',
        })}
        ${DefaultTemplate({
          tabId: 'tab-3',
          label: 'Disabled',
          icon: 'starOutline',
          selected: false,
          disabled: true,
          orientation: 'horizontal',
        })}
      </div>
    </div>
  `);

  // Vertical states
  states.push(`
    <div class="sb-section-box">
      <h4>Vertical States</h4>
      <div style="display: flex; flex-direction: column; gap: 8px; width: 200px;">
        ${DefaultTemplate({
          tabId: 'tab-4',
          label: 'Default',
          icon: 'houseSimple',
          selected: false,
          disabled: false,
          orientation: 'vertical',
        })}
        ${DefaultTemplate({
          tabId: 'tab-5',
          label: 'Selected',
          icon: 'wrench',
          selected: true,
          disabled: false,
          orientation: 'vertical',
        })}
        ${DefaultTemplate({
          tabId: 'tab-6',
          label: 'Disabled',
          icon: 'starOutline',
          selected: false,
          disabled: true,
          orientation: 'vertical',
        })}
      </div>
    </div>
  `);

  // Without icons
  states.push(`
    <div class="sb-section-box">
      <h4>Without Icons</h4>
      <div style="display: flex; gap: 8px; margin-bottom: 16px;">
        ${DefaultTemplate({
          tabId: 'tab-7',
          label: 'Default',
          selected: false,
          disabled: false,
          orientation: 'horizontal',
        })}
        ${DefaultTemplate({
          tabId: 'tab-8',
          label: 'Selected',
          selected: true,
          disabled: false,
          orientation: 'horizontal',
        })}
        ${DefaultTemplate({
          tabId: 'tab-9',
          label: 'Disabled',
          selected: false,
          disabled: true,
          orientation: 'horizontal',
        })}
      </div>
    </div>
  `);

  return `
    <div>
      ${states.join('')}
    </div>
  `;
};

AllStates.storyName = 'All States';
AllStates.parameters = {
  id: 'tab-item-all-states',
  docs: {
    description: {
      story: 'Visão geral de todos os estados do componente TabItem, incluindo diferentes orientações, presença de ícones e estados de seleção/desabilitação.',
    },
  },
  controls: { disable: true },
};
