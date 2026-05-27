import type { StoryFn, StoryObj } from '@storybook/html-vite';
import { sizeVariantsArray } from '@theme/theme.types';
import { ICON_OPTIONS } from '../icon/icon.utils';
import { HTMLString } from 'src/utils/utils';
import { TagProps } from './tag.types';

type Story = StoryObj;

export default {
  title: 'Components/Tag/TagSelectable',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded', // ATENÇÃO: full-width não funciona com layout "centered"
    docs: {
      description: {
        component: `
Utilize o componente \`mnt-tag-selectable\` para exibir informações de um contexto específico.

### Recomendações:
- \`TagId:\` É necessário informar o id do tag para que seja possível selecioná-lo ou deselecioná-lo, considerando o uso em grupos de tags.

### Ações / Eventos:

#### Trigger: Clique
- [Event] **tagSelected:** Ao clicar em um tag selecionável, o evento será emitido com o id + label do tag selecionado. Exemplo:

\`\`\`json
{
  "tagId": "tag-1",
  "label": "selected"
}
\`\`\`

- Essa variante de tag **NÃO** possui animações complexas, apenas mudança suave de cores.
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
      <mnt-tag-selectable ${args}></mnt-tag-selectable>
    `;
  },
};

const TagTemplate = (props: TagProps) => {
  if (!props.icon) {
    return `
      <mnt-tag-selectable
        tag-id="${props.tagId || 'tag-1'}"
        size="${props.size || 'tiny'}"
        label="${props.label || 'selectable'}"
      ></mnt-tag-selectable>
    `;
  }
  return `
    <mnt-tag-selectable
      tag-id="${props.tagId || 'tag-1'}"
      icon="${props.icon}"
      size="${props.size || 'tiny'}"
      label="${props.label || 'selectable'}"
    ></mnt-tag-selectable>
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
