import type { Meta, StoryFn } from '@storybook/html';

import { tabOrientationArray } from '../tab-item/tab-item.types';
import type { TabItemGroupProps, TabItem } from './tab-item-group.types';
import { HTMLString } from 'src/utils/utils';
import { TabItemGroup } from './tab-item-group';

// const SB_TABLE_ICON = {
//   type: {
//     summary: ICON_OPTIONS.join(' | '),
//   },
// };

const mockTabs: TabItem[] = [
  { id: 'tab-1', label: 'Overview', icon: 'houseSimple' },
  { id: 'tab-2', label: 'Settings', icon: 'wrench' },
  { id: 'tab-3', label: 'Favorites', icon: 'starOutline' },
  { id: 'tab-4', label: 'Notifications', icon: 'bell' },
];

const mockTabsWithDisabled: TabItem[] = [
  { id: 'tab-1', label: 'Overview', icon: 'houseSimple' },
  { id: 'tab-2', label: 'Settings', icon: 'wrench' },
  { id: 'tab-3', label: 'Favorites', icon: 'starOutline', disabled: true },
  { id: 'tab-4', label: 'Notifications', icon: 'bell' },
];

const mockTabsWithoutIcons: TabItem[] = [
  { id: 'tab-1', label: 'Overview' },
  { id: 'tab-2', label: 'Analytics' },
  { id: 'tab-3', label: 'Settings' },
  { id: 'tab-4', label: 'Profile' },
];

const meta: Meta<TabItemGroupProps> = {
  title: 'Navigation/Tab/TabItemGroup',
  component: 'mnt-tab-item-group',
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Array of tab items to display',
      table: {
        type: { summary: 'TabItem[]' },
        defaultValue: { summary: '[]' },
      },
    },
    selectedId: {
      control: 'text',
      description: 'ID of the currently selected tab',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    orientation: {
      control: 'select',
      options: tabOrientationArray,
      description: 'Orientation of the tab group',
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
          '**TabItemGroup** é um componente de navegação que organiza e gerencia uma coleção de abas (tabs) para facilitar a navegação entre diferentes seções de conteúdo.\n\n' +
          '### 🎯 **Características principais:**\n' +
          '- **Navegação intuitiva:** Permite alternar entre diferentes seções de forma clara e organizada\n' +
          '- **Orientação flexível:** Suporte a layout horizontal (padrão) e vertical\n' +
          '- **Ícones opcionais:** Cada tab pode ter um ícone para melhor identificação visual\n' +
          '- **Estados visuais:** Diferenciação clara entre tabs ativas, inativas e desabilitadas\n' +
          '- **Controle de estado:** Gerenciamento automático ou controlado da seleção\n' +
          '- **Acessibilidade:** Suporte completo a navegação por teclado e screen readers\n\n' +
          '### 📏 **Orientações disponíveis:**\n' +
          '- **Horizontal:** Ideal para navegação principal em headers ou seções superiores\n' +
          '- **Vertical:** Perfeito para sidebars, menus laterais ou navegação secundária\n\n' +
          '### 🎨 **Estados das tabs:**\n' +
          '- **Default:** Estado normal, clicável e disponível\n' +
          '- **Selected:** Tab atualmente selecionada (destaque visual)\n' +
          '- **Disabled:** Tab desabilitada, não clicável\n' +
          '- **Hover:** Estado de interação ao passar o mouse\n\n' +
          '### 🔧 **API do componente:**\n' +
          '- **Props:** `tabs`, `selectedId`, `orientation`\n' +
          '- **Eventos:** `tabChange` - emitido quando uma tab é selecionada\n' +
          '- **Métodos:** Gerenciamento automático de estado interno\n\n' +
          '### 💡 **Casos de uso:**\n' +
          '- Navegação principal de aplicações\n' +
          '- Seções de configurações\n' +
          '- Dashboards e painéis administrativos\n' +
          '- Formulários multi-etapas\n' +
          '- Filtros e categorias\n\n' +
          '**Figma:** [Global Assets | Tab](https://www.figma.com/design/ezr4b0ZxjmeWjASveGQoJS/-1-Core-Components?node-id=407-2410&m=dev)\n\n',
      },
    },
  },
};

export default meta;

const DefaultTemplate = (args: TabItemGroupProps): HTMLString => `
  <mnt-tab-item-group
    tabs='${JSON.stringify(args.tabs)}'
    selected-id="${args.selectedId || ''}"
    orientation="${args.orientation}"
  ></mnt-tab-item-group>

  <script>
    // Debug: verificar se o componente foi renderizado
    setTimeout(() => {
      const component = document.querySelector('mnt-tab-item-group');
      console.log('TabItemGroup component:', component);
      if (component) {
        console.log('Component tabs:', component.tabs);
        console.log('Component selectedId:', component.selectedId);
        console.log('Component orientation:', component.orientation);
      }
    }, 100);
  </script>
`;

export const Default: StoryFn = DefaultTemplate.bind({});
Default.args = {
  tabs: mockTabs,
  selectedId: 'tab-1',
  orientation: 'horizontal',
} as TabItemGroupProps;
Default.storyName = 'Playground';
Default.parameters = {
  id: 'tab-item-group-playground',
  docs: {
    description: {
      story: 'Playground do componente `<mnt-tab-item-group>`. Use os controles para testar diferentes configurações.',
    },
  },
};

// Teste simples para verificar se o componente está funcionando
export const SimpleTest: StoryFn = () => `
  <div>
    <h3>Teste Simples - TabItem Individual</h3>
    <mnt-tab-item tab-id="test-1" label="Test Tab 1" selected="true" orientation="horizontal"></mnt-tab-item>
    <mnt-tab-item tab-id="test-2" label="Test Tab 2" selected="false" orientation="horizontal"></mnt-tab-item>
  </div>
  
  <div style="margin-top: 20px;">
    <h3>Teste Simples - TabItemGroup</h3>
    <mnt-tab-item-group
      tabs='[{"id":"tab-1","label":"Overview","icon":"house"},{"id":"tab-2","label":"Analytics","icon":"chartBar"}]'
      selected-id="tab-1"
      orientation="horizontal"
    ></mnt-tab-item-group>
  </div>
  
  <script>
    setTimeout(() => {
      console.log('=== DEBUG TAB COMPONENTS ===');
      const tabItems = document.querySelectorAll('mnt-tab-item');
      console.log('TabItem elements found:', tabItems.length);
      tabItems.forEach((item, index) => {
        console.log(\`TabItem \${index}:\`, item);
        console.log(\`  - tabId: \${item.tabId}\`);
        console.log(\`  - label: \${item.label}\`);
        console.log(\`  - selected: \${item.selected}\`);
      });
      
      const tabGroup = document.querySelector('mnt-tab-item-group');
      console.log('TabItemGroup element:', tabGroup);
      if (tabGroup) {
        console.log('  - tabs:', tabGroup.tabs);
        console.log('  - selectedId:', tabGroup.selectedId);
        console.log('  - orientation:', tabGroup.orientation);
      }
    }, 500);
  </script>
`;

SimpleTest.storyName = 'Simple Test';
SimpleTest.parameters = {
  id: 'tab-simple-test',
  docs: {
    description: {
      story: 'Teste simples para verificar se os componentes Tab estão funcionando corretamente.',
    },
  },
  controls: { disable: true },
};

export const WithIcons: StoryFn<typeof TabItemGroup> = () => {
  return DefaultTemplate({
    tabs: mockTabs,
    selectedId: 'tab-2',
    orientation: 'horizontal',
  });
};

WithIcons.storyName = 'With Icons';
WithIcons.parameters = {
  id: 'tab-item-group-with-icons',
  docs: {
    description: {
      story: 'Tabs com ícones para melhor identificação visual. Cada tab pode ter um ícone opcional que melhora a experiência do usuário.',
    },
  },
  controls: { disable: true },
};

export const WithoutIcons: StoryFn<typeof TabItemGroup> = () => {
  return DefaultTemplate({
    tabs: mockTabsWithoutIcons,
    selectedId: 'tab-1',
    orientation: 'horizontal',
  });
};

WithoutIcons.storyName = 'Without Icons';
WithoutIcons.parameters = {
  id: 'tab-item-group-without-icons',
  docs: {
    description: {
      story: 'Tabs sem ícones, usando apenas texto. Ideal para interfaces mais minimalistas ou quando o espaço é limitado.',
    },
  },
  controls: { disable: true },
};

export const WithDisabledTabs: StoryFn<typeof TabItemGroup> = () => {
  return DefaultTemplate({
    tabs: mockTabsWithDisabled,
    selectedId: 'tab-1',
    orientation: 'horizontal',
  });
};

WithDisabledTabs.storyName = 'With Disabled Tabs';
WithDisabledTabs.parameters = {
  id: 'tab-item-group-disabled',
  docs: {
    description: {
      story: 'Tabs com algumas opções desabilitadas. Tabs desabilitadas não são clicáveis e têm aparência visual diferenciada para indicar indisponibilidade.',
    },
  },
  controls: { disable: true },
};

export const VerticalOrientation: StoryFn<typeof TabItemGroup> = () => {
  return DefaultTemplate({
    tabs: mockTabs,
    selectedId: 'tab-1',
    orientation: 'vertical',
  });
};

VerticalOrientation.storyName = 'Vertical Orientation';
VerticalOrientation.parameters = {
  id: 'tab-item-group-vertical',
  docs: {
    description: {
      story: 'Tabs organizadas verticalmente. Ideal para sidebars, menus laterais ou quando há muitas opções de navegação.',
    },
  },
  controls: { disable: true },
};

export const VerticalWithoutIcons: StoryFn<typeof TabItemGroup> = () => {
  return DefaultTemplate({
    tabs: mockTabsWithoutIcons,
    selectedId: 'tab-2',
    orientation: 'vertical',
  });
};

VerticalWithoutIcons.storyName = 'Vertical Without Icons';
VerticalWithoutIcons.parameters = {
  id: 'tab-item-group-vertical-no-icons',
  docs: {
    description: {
      story: 'Tabs verticais sem ícones. Combinação de orientação vertical com design minimalista usando apenas texto.',
    },
  },
  controls: { disable: true },
};

export const AllVariants: StoryFn<typeof TabItemGroup> = () => {
  const variants: HTMLString[] = [];

  // Horizontal with icons
  variants.push(`
    <div class="sb-section-box">
      <h4>Horizontal with Icons</h4>
      <div class="sb-grid-1">
        ${DefaultTemplate({
          tabs: mockTabs,
          selectedId: 'tab-2',
          orientation: 'horizontal',
        })}
      </div>
    </div>
  `);

  // Horizontal without icons
  variants.push(`
    <div class="sb-section-box">
      <h4>Horizontal without Icons</h4>
      <div class="sb-grid-1">
        ${DefaultTemplate({
          tabs: mockTabsWithoutIcons,
          selectedId: 'tab-1',
          orientation: 'horizontal',
        })}
      </div>
    </div>
  `);

  // Vertical with icons
  variants.push(`
    <div class="sb-section-box">
      <h4>Vertical with Icons</h4>
      <div class="sb-grid-1">
        ${DefaultTemplate({
          tabs: mockTabs,
          selectedId: 'tab-3',
          orientation: 'vertical',
        })}
      </div>
    </div>
  `);

  // Vertical without icons
  variants.push(`
    <div class="sb-section-box">
      <h4>Vertical without Icons</h4>
      <div class="sb-grid-1">
        ${DefaultTemplate({
          tabs: mockTabsWithoutIcons,
          selectedId: 'tab-2',
          orientation: 'vertical',
        })}
      </div>
    </div>
  `);

  // With disabled tabs
  variants.push(`
    <div class="sb-section-box">
      <h4>With Disabled Tabs</h4>
      <div class="sb-grid-1">
        ${DefaultTemplate({
          tabs: mockTabsWithDisabled,
          selectedId: 'tab-1',
          orientation: 'horizontal',
        })}
      </div>
    </div>
  `);

  return `
    <div>
      ${variants.join('')}
    </div>
  `;
};

AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  id: 'tab-item-group-all-variants',
  docs: {
    description: {
      story: 'Visão geral de todas as variações do componente TabItemGroup, incluindo diferentes orientações, presença de ícones e estados desabilitados.',
    },
  },
  controls: { disable: true },
};
