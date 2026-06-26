import type { StoryFn, StoryObj } from '@storybook/html-vite';

import { buttonColorVariantsArray, ButtonProps, buttonSizeVariantsArray, buttonStateVariantsArray, buttonStyleArray } from './button.types';
import { ICON_OPTIONS } from '../icon/icon.utils';
import { ThemePalette, themePalettesArray } from '@theme/theme.types';
import { HTMLString } from 'src/utils/utils';

type Story = StoryObj;

export default {
  title: 'Components/Button/Button',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded', // ATENÇÃO: full-width não funciona com layout "centered"
    docs: {
      description: {
        component: `
O componente **mnt-button** é um botão com várias variantes e tamanhos.
Utilizado para disparar uma ação ou evento.

Veja o protótipo oficial no [Figma](https://www.figma.com/design/ezr4b0ZxjmeWjASveGQoJS/-1-Core-Components?node-id=407-766&t=dfwzJtcmToPhfZLN-4)

### Recomendações:
- **Variantes de estilo:**
  - \`emphasis\`: Ações principais, onde botão é o foco da ação e precisa ser destacado.
  - \`regular\` e \`stroke\`: Ações secundárias, onde botão precisa ser destacado mas não é o foco da ação.
  - \`plain\`: Ações secundárias, onde botão não precisa ser destacado.
  - \`link\`: Ações de navegação, onde botão direciona para outras páginas ou seções da aplicação.
  - \`filter\`: Ações de filtros -> Tem uma leve diferença visual e limitação de uso em relação aos demais estilos.
- **Ícones:** É possível adicionar ícones à esquerda e à direita do botão, utilizando propriedades \`icon-left\` e \`icon-right\`. Por padrão, não são exibidos.
- **Largura total:** É possível ocupar a largura total do elemento pai, utilizando a propriedade \`full-width\`. O botão ocupará 100% da largura disponível.
- **Estados:**
  - \`default\`: Estado normal do botão.
  - \`pressed\`:
    - Utilizado para indicar quando um botão está selecionado / pressionado;
    - Útil para indicar um estado de seleção de filtros.
  - \`loading\`:
    - Exibe apenas o ícone de carregamento, ocultando label/ícones visíveis em outros estados;
    - Bloqueia interações enquanto estiver ativo, impedindo que o usuário clique no botão;
    - A largura do botão é congelada na transição para evitar layout shift
    - O controle do estado é programático *(responsabilidade do consumidor)*

### Responsividade:
Na tabela abaixo, há uma relação entre as variantes de tamanho e os breakpoints.

Obs.: \`XS\` é o tamanho aplicado ao \`tiny\` em breakpoints menores que 576px (NÃO disponível como variante de tamanho).

| Variantes | ≥576px       |	≥768px      |	≥992px (tamanho padrão) |
|-----------|--------------|--------------|-------------------------|
| Large     | medium       | medium       | large                   |
| Medium    | small        | small        | medium                  |
| Small     | tiny         | tiny         | tiny                    |
| Tiny      | xs           | xs           | xs                      |
`,
      },
      codePanel: true,
      source: {
        transform: (_: string, storyContext: StoryObj) => {
          return ButtonTemplate(storyContext.args as ButtonProps);
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
    color: {
      control: 'select',
      options: buttonColorVariantsArray,
      description: 'Variante de cor do botão',
      table: {
        type: { summary: buttonColorVariantsArray.join(' | ') },
        defaultValue: { summary: 'neutral' },
      },
    },
    variant: {
      control: 'select',
      options: buttonStyleArray,
      description: 'Variante de estilo do botão',
      table: {
        type: { summary: buttonStyleArray.join(' | ') },
        defaultValue: { summary: 'regular' },
      },
    },
    size: {
      control: 'select',
      options: buttonSizeVariantsArray,
      description: 'Tamanho do botão',
      table: {
        type: { summary: buttonSizeVariantsArray.join(' | ') },
        defaultValue: { summary: 'medium' },
      },
    },
    state: {
      control: 'select',
      options: buttonStateVariantsArray,
      description: 'Estado visual do botão. Utilizado para indicar quando um botão está selecionado / pressionado. Útil para indicar um estado de seleção de filtros.',
      table: {
        type: { summary: buttonStateVariantsArray.join(' | ') },
        defaultValue: { summary: 'default' },
      },
    },
    iconLeft: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Ícone exibido à esquerda do botão. Veja todas as opções de ícones no [Icon Component](../icon).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    iconRight: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Ícone exibido à direita do botão. Veja todas as opções de ícones no [Icon Component](../icon).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Se o botão deve ocupar a largura total da tela',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description:
        'Quando ativo, exibe um ícone de loading com animação de rotação, oculta label/ícones e bloqueia o evento de click. A largura do botão é congelada para evitar layout shift. Uso programático.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  render: (args) => {
    return `
      <mnt-button ${args}></mnt-button>
    `;
  },
};

const ButtonTemplate = (props: ButtonProps) => {
  if (props.loading) {
    return `
      <mnt-button
        label="${props.label}"
        color="${props.color}"
        variant="${props.variant}"
        size="${props.size}"
        full-width="${props.fullWidth}"
        loading
      ></mnt-button>
    `;
  }
  return `
    <mnt-button
      label="${props.label}"
      color="${props.color}"
      variant="${props.variant}"
      size="${props.size}"
      state="${props.state}"
      icon-left="${props.iconLeft || ''}"
      icon-right="${props.iconRight || ''}"
      full-width="${props.fullWidth}"
    ></mnt-button>
  `;
};

export const Regular: Story = {
  args: {
    label: 'Click me',
    color: 'primary',
    variant: 'regular',
    size: 'medium',
    fullWidth: false,
  },
  render: ButtonTemplate,
};

export const Emphasis: Story = {
  args: {
    label: 'Click me',
    color: 'primary',
    variant: 'emphasis',
    size: 'medium',
    fullWidth: false,
  },
  render: ButtonTemplate,
};

export const Stroke: Story = {
  args: {
    label: 'Click me',
    color: 'primary',
    variant: 'stroke',
    size: 'medium',
    fullWidth: false,
  },
  render: ButtonTemplate,
};

export const Plain: Story = {
  args: {
    label: 'Click me',
    color: 'primary',
    variant: 'plain',
    size: 'medium',
    fullWidth: false,
  },
  render: ButtonTemplate,
};

export const Link: Story = {
  args: {
    label: 'Click me',
    color: 'primary',
    variant: 'link',
    size: 'medium',
    fullWidth: false,
  },
  render: ButtonTemplate,
};

export const Filter: Story = {
  args: {
    label: 'Click me',
    variant: 'filter',
    color: 'primary',
    size: 'medium',
    state: 'default',
    fullWidth: false,
  },
  render: ButtonTemplate,
};

/**
 * Estado de carregamento. O botão substitui seu conteúdo por um ícone de loading com animação de rotação,
 * trava sua largura para evitar layout shift, aplica `aria-busy="true"` e bloqueia o evento de click.
 *
 * O controle do estado é programático — quem consome a lib é responsável por alternar a flag.
 */
export const Loading: Story = {
  args: {
    label: 'Salvando alterações',
    color: 'primary',
    variant: 'emphasis',
    size: 'medium',
    fullWidth: false,
    loading: true,
  },
  render: ButtonTemplate,
};

/**
 * Demonstração interativa: clique no botão para ativar o loading por 2 segundos.
 * Útil para visualizar a transição (congelamento de largura, troca de conteúdo).
 */
export const LoadingDemo: StoryFn = () => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
<div class="sb-section-box">
  <div class="sb-grid-4 sb-grid-row-divider sb-grid-row-title">
    <span>Tiny</span>
    <span>Small</span>
    <span>Medium</span>
    <span>Large</span>

    <mnt-button label="Salvar" icon-left="check" variant="emphasis" color="primary" size="tiny"></mnt-button>
    <mnt-button label="Salvar" icon-left="check" variant="emphasis" color="primary" size="small"></mnt-button>
    <mnt-button label="Salvar" icon-left="check" variant="emphasis" color="primary" size="medium"></mnt-button>
    <mnt-button label="Salvar" icon-left="check" variant="emphasis" color="primary" size="large"></mnt-button>
  </div>
</div>
  `;

  wrapper.querySelectorAll<HTMLElement & { loading: boolean }>('mnt-button').forEach((button) => {
    button.addEventListener('buttonClick', () => {
      console.log('[LoadingDemo] buttonClick', button.getAttribute('size'));
      button.loading = true;
      setTimeout(() => {
        button.loading = false;
      }, 2000);
    });
  });

  return wrapper;
};

LoadingDemo.parameters = {
  controls: { disable: true },
  actions: { disable: true },
  interactions: { disable: true },
};

const getColorVariants = (color: ThemePalette) => {
  const buttonVariants: string[] = [];

  buttonStyleArray
    .filter((variant) => variant !== 'filter')
    .map((variant) => {
      buttonVariants.push(`<span>${variant}</span>`);
      buttonSizeVariantsArray.map((size) => {
        buttonVariants.push(ButtonTemplate({ label: size, color, variant, size, iconLeft: 'plus', iconRight: 'plus' }));
      });
    });
  return `
<div class="sb-section-box">
  <h4>${color}</h4>
  <div class="sb-grid-5 sb-grid-row-divider sb-grid-row-title">
    ${buttonVariants.join('')}
  </div>
</div>
`;
};

/**
 * Todas as variantes e estados
 */
export const AllVariants: StoryFn = () => {
  const buttonVariants: HTMLString[] = [];
  themePalettesArray.forEach((color) => {
    buttonVariants.push(getColorVariants(color));
  });

  return `
<div>
${buttonVariants.join('')}
</div>

<div class="sb-section-box">
  <h4>Filter</h4>
  <div class="sb-grid-5 sb-grid-row-divider sb-grid-row-title">
    <span>Default</span>
    <mnt-button label="tiny" variant="filter" size="tiny" state="default"></mnt-button>
    <mnt-button label="small" variant="filter" size="small" state="default"></mnt-button>
    <mnt-button label="medium" variant="filter" size="medium" state="default"></mnt-button>
    <mnt-button label="large" variant="filter" size="large" state="default"></mnt-button>
  </div>
  <div class="sb-grid-5 sb-grid-row-divider sb-grid-row-title">
    <span>Pressed</span>
    <mnt-button label="tiny" variant="filter" size="tiny" state="pressed"></mnt-button>
    <mnt-button label="small" variant="filter" size="small" state="pressed"></mnt-button>
    <mnt-button label="medium" variant="filter" size="medium" state="pressed"></mnt-button>
    <mnt-button label="large" variant="filter" size="large" state="pressed"></mnt-button>
  </div>
</div>

<div class="sb-section-box">
  <h4>Loading</h4>
  <div class="sb-grid-4 sb-grid-row-divider sb-grid-row-title">
    <span>Tiny</span>
    <span>Small</span>
    <span>Medium</span>
    <span>Large</span>

    <mnt-button label="Salvando" loading="true" variant="emphasis" color="primary" size="tiny"></mnt-button>
    <mnt-button label="Salvando" loading="true" variant="emphasis" color="primary" size="small"></mnt-button>
    <mnt-button label="Salvando" loading="true" variant="emphasis" color="primary" size="medium"></mnt-button>
    <mnt-button label="Salvando" loading="true" variant="emphasis" color="primary" size="large"></mnt-button>
  </div>
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
