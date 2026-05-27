import type { StoryFn, StoryObj } from '@storybook/html-vite';
import { sizeVariantsArray } from '@theme/theme.types';
import { ICON_OPTIONS } from '../icon/icon.utils';
import { HTMLString } from 'src/utils/utils';
import { TagProps } from './tag.types';

type Story = StoryObj;

export default {
  title: 'Components/Tag/TagRemovable',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded', // ATENÇÃO: full-width não funciona com layout "centered"
    docs: {
      description: {
        component: `
Utilize o componente **mnt-tag-removable** para exibir informações de um contexto específico.

### Recomendações:
- **TagId:** É necessário informar o id do tag para que seja possível removê-lo.

### Ações / Eventos:

#### Trigger: Clique
1. [Event] **tagRemoved:** Ao clicar em um tag removível, o evento será emitido com o id + label do tag removido. Exemplo:

\`\`\`json
{
  "tagId": "tag-1",
  "label": "removable"
}
\`\`\`

2. Inicia a animação de remoção (duração: \`450ms\`).
3. Após o timer, o elemento é removido do DOM.
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
      description: 'O texto exibido no botão',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Ícone exibido no tag',
      table: {
        type: { summary: ICON_OPTIONS.join(' | ') },
        defaultValue: { summary: 'undefined' },
      },
    },
    size: {
      control: 'select',
      options: sizeVariantsArray,
      description: 'Tamanho do tag',
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
      <mnt-tag-removable ${args}></mnt-tag-removable>
    `;
  },
};

const TagTemplate = (props: TagProps) => {
  if (!props.icon) {
    return `
      <mnt-tag-removable
        tag-id="${props.tagId || 'tag-1'}"
        size="${props.size || 'tiny'}"
        label="${props.label || 'removable'}"
      ></mnt-tag-removable>
    `;
  }

  return `
    <mnt-tag-removable
      tag-id="${props.tagId || 'tag-1'}"
      icon="${props.icon}"
      size="${props.size || 'tiny'}"
      label="${props.label || 'removable'}"
    ></mnt-tag-removable>
  `;
};

export const Removable: Story = {
  args: {},
  render: TagTemplate,
};

const getSizeVariants = () => {
  const sizeVariants: string[] = [];

  sizeVariantsArray.map((size) => {
    sizeVariants.push(TagTemplate({ tagId: 'tag-1', size, label: size }));
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
