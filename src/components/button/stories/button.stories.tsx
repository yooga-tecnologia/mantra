import { marked } from 'marked';
import readme from '../readme.md?raw';

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'light',
      disable: true,
    },
    measures: {
      disable: true,
    },
    controls: {
      disable: true,
    },
    actions: {
      disable: true,
    },
    viewport: {
      disable: true,
    },
    docs: {
      codePanel: false,
      description: {
        component: `
O componente **Button** permite que usuários realizem ações e façam escolhas com um único toque ou clique.

Botões comunicam ações que os usuários podem realizar e são tipicamente colocados em interfaces como diálogos,
formulários, cards, toolbars, etc.

🔗 [**FIGMA**](https://www.figma.com/design/ezr4b0ZxjmeWjASveGQoJS/-1-Core-Components?node-id=407-766&t=YDt7UhIUEjPwGOIf-4)

## Guia de uso para variantes

- **Regular (solid)**: Ação primária de alto destaque, use para a ação mais importante da tela
- **Emphasis**: Variação com mais destaque visual (gradientes/sombras), ideal para CTAs importantes
- **Stroke (outline)**: Ações secundárias com menos destaque, bom para ações complementares
- **Plain (ghost)**: Ações terciárias ou em contextos com limitação de espaço, mínimo de interferência visual

## Cores disponíveis

Cada cor tem um significado semântico:
- **Primary**: Ações principais da aplicação
- **Secondary**: Ações secundárias
- **Neutral**: Ações neutras ou de cancelamento
- **Success**: Confirmações e ações positivas
- **Warning**: Ações que requerem atenção
- **Critical**: Ações destrutivas ou de alta importância
        `,
      },
    },
    storySort: {
      order: ['Intro', '*/*'],
    },
  },
};

export const Types = () => {
  const readmeContent = marked(readme) as string;
  const container = document.createElement('div');
  container.innerHTML = readmeContent;

  return `
    <div class="sb-docs-container">
      ${readmeContent}
    </div>
  `;
};
