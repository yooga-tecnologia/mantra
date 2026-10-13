import type { StoryFn, StoryObj } from '@storybook/html-vite';
import { sizeVariantsArray } from '@theme/theme.types';
// import { ICON_OPTIONS } from '../icon/icon.utils';
// import { HTMLString } from 'src/utils/utils';
// import { TagProps } from '../tag/tag.types';
import { TagSelectableGroupProps } from './tag-selectable-group.types';

type Story = StoryObj;

const tags = [
  { id: 'tag-1', label: 'Tag 1' },
  { id: 'tag-2', label: 'Tag 2' },
  { id: 'tag-3', label: 'Tag 3' },
];

export default {
  title: 'Components/Tags/TagSelectableGroup',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded', // ATENÇÃO: full-width não funciona com layout "centered"
    docs: {
      description: {
        component: `
Utilize o componente **mnt-tag-selectable-group** para exibir um grupo de tags selecionáveis.

### Recomendações:
- **size:** Propriedade que define o tamanho aplicado às tags do grupo.

### Ações / Eventos:

#### Trigger: Clique
1. [Event] **selectedChange:** Ao clicar em uma tag do grupo, o evento será emitido com o id + label da tag selecionada. Exemplo:

\`\`\`json
{
  "tagId": "tag-1",
  "label": "selected"
}
\`\`\`
`,
      },
      codePanel: true,
      source: {
        transform: (_: string, storyContext: StoryObj) => {
          return TagSelectableGroupTemplate(storyContext.args as TagSelectableGroupProps);
        },
      },
    },
  },
  // TODO: Adicionar os argTypes
  // argTypes: {
  //   selectedId: {
  //     control: 'select',
  //     options: tags.map((tag) => tag.id),
  //     description: 'ID da tag selecionada',
  //     table: {
  //       type: { summary: tags.map((tag) => tag.id).join(' | ') },
  //       defaultValue: { summary: 'medium' },
  //     },
  //   },
  //   size: {
  //     control: 'select',
  //     options: sizeVariantsArray,
  //     description: 'Tamanho aplicado às tags do grupo',
  //     table: {
  //       type: { summary: sizeVariantsArray.join(' | ') },
  //       defaultValue: { summary: 'medium' },
  //     },
  //   },
  // },
  render: (args: Partial<TagSelectableGroupProps>) => {
    return `
      <mnt-tag-selectable-group ${args}></mnt-tag-selectable-group>
    `;
  },
};

const TagSelectableGroupTemplate = (props: TagSelectableGroupProps) => {
  return `
    <mnt-tag-selectable-group
      tags='${JSON.stringify(tags)}'
      size='${props.size || 'medium'}'
    ></mnt-tag-selectable-group>
  `;
};

export const Removable: Story = {
  args: {},
  render: TagSelectableGroupTemplate as any,
};

// const getSizeVariants = () => {
//   const sizeVariants: string[] = [];

//   sizeVariantsArray.map((size) => {
//     sizeVariants.push(TagTemplate({ tagId: 'tag-1', size, label: size }));
//   });
//   return `
//   <div class="sb-grid-5">
//     ${sizeVariants.join('')}
//   </div>
// `;
// };

// export const AllVariants: StoryFn = () => {
//   const tagVariants: HTMLString = getSizeVariants();

//   return `
// <div>
// ${tagVariants}
// </div>
// `;
// };

// AllVariants.parameters = {
//   controls: {
//     disable: true,
//   },
//   actions: {
//     disable: true,
//   },
//   interactions: {
//     disable: true,
//   },
// };
