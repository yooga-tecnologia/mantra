import type { StoryFn, StoryObj } from '@storybook/html-vite';
import { sizeVariantsArray } from '@theme/theme.types';
import { ICON_OPTIONS } from '../icon/icon.utils';
import { HTMLString } from 'src/utils/utils';
import { TagProps } from './tag.types';

type Story = StoryObj;

export default {
  title: 'Components/Tag/TagCommon',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded', // ATENÇÃO: full-width não funciona com layout "centered"
    docs: {
      description: {
        component: `
Utilize o componente \`mnt-tag\` para exibir informações de um contexto específico.

### Recomendações:
- **Ícones:** É possível adicionar ícones à esquerda do texto, utilizando propriedade \`icon\`. Por padrão, **não será exibido**.
- **Tamanhos:** É possível utilizar os seguintes tamanhos: \`tiny\`, \`small\`, \`medium\` e \`large\`. Por padrão, o tamanho é \`medium\`.

### Comparação de Variações:
- **Common:** Sem interação.
- **Selectable:** Pode ser selecionada ou deselecionada.
- **Removable:** Pode ser removida. Geralmente utilizado em contextos de filtros.
`,
      },
      codePanel: true,
      source: {
        transform: (_: string, storyContext: StoryObj) => {
          return TagTemplate(storyContext.args as TagProps);
        },
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'O texto exibido',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Ícone exibido à esquerda do texto',
    },
    size: {
      control: 'select',
      options: sizeVariantsArray,
      description: 'Tamanho do componente',
      table: {
        type: { summary: sizeVariantsArray.join(' | ') },
        defaultValue: { summary: 'medium' },
      },
    },
    tagId: {
      control: 'text',
      description: 'ID do tag para que seja possível removê-lo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-tag ${args}></mnt-tag>
    `;
  },
};

const TagTemplate = (props: TagProps) => {
  return `
    <mnt-tag
      label="${props.label || 'Label'}"
      size="${props.size || 'medium'}"
      tagId="${props.tagId || 'tag-1'}"
    ></mnt-tag>
  `;
};

export const Common: Story = {
  args: {},
  render: TagTemplate,
};

const getSizeVariants = () => {
  const sizeVariants: string[] = [];

  sizeVariantsArray.map((size) => {
    sizeVariants.push(TagTemplate({ label: size, size, icon: 'info', tagId: 'tag-1' }));
  });
  return `
  <div class="sb-grid-5">
    ${sizeVariants.join('')}
  </div>
`;
};

export const AllVariants: StoryFn = () => {
  const tagVariants: HTMLString = getSizeVariants();

  return `
<div>
${tagVariants}
</div>
`;
};

AllVariants.parameters = {
  controls: {
    disable: true,
  },
  actions: {
    disable: true,
  },
  interactions: {
    disable: true,
  },
};
