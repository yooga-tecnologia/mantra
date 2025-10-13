import type { Meta, StoryFn } from '@storybook/html';
import type { IllustrationProps } from './illustration.types';
import { ILLUSTRATIONS } from './illustration-base';
import { HTMLString } from 'src/utils/utils';

const meta: Meta<IllustrationProps> = {
  title: 'Assets/Illustration',
  component: 'mnt-illustration',
  argTypes: {
    name: {
      control: { type: 'select' },
      options: Object.keys(ILLUSTRATIONS),
    },
    width: {
      control: { type: 'number' },
    },
    height: {
      control: { type: 'number' },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Componente Illustration

O componente Illustration fornece uma coleção de ilustrações SVG personalizadas para enriquecer interfaces de usuário com conteúdo visual envolvente. Essas ilustrações são projetadas para transmitir emoções, estados e conceitos de forma amigável e acessível.

### Características Principais
- **Gráficos Vetoriais Escaláveis**: Todas as ilustrações são baseadas em SVG para renderização nítida em qualquer tamanho
- **Representação de Emoções e Estados**: Ampla gama de ilustrações cobrindo diferentes estados emocionais e cenários de UI
- **Dimensões Personalizáveis**: Propriedades de largura e altura ajustáveis
- **Performance Otimizada**: Assets SVG leves para carregamento rápido
- **Estilo Visual Consistente**: Estilo de ilustração coeso que combina com o design system

### Ilustrações Disponíveis
O componente inclui várias categorias de ilustrações:
- **Estados emocionais**: happy, sad, inLove, happyWithCrying
- **Conquistas e Sucesso**: happyCheck, happyWithCoin, goalWithBoy, goalWithGirl
- **Busca e Descoberta**: search, glasses, sunglasses
- **Comida e Objetos**: burger, heart
- **Manutenção e Sistema**: maintenance

### Diretrizes de Uso
- Use ilustrações para aprimorar a conexão emocional com os usuários
- Escolha ilustrações que combinem com o contexto e tom do seu conteúdo
- Mantenha dimensionamento consistente em casos de uso similares
- Considere acessibilidade fornecendo contexto significativo quando necessário
- Use ilustrações com moderação para evitar poluição visual

### Acessibilidade
- Ilustrações são decorativas por padrão e não requerem texto alternativo
- Garanta contraste de cor suficiente ao usar ilustrações com elementos interativos
- Forneça informações contextuais através de texto circundante quando as ilustrações transmitem significado importante
        `,
      },
    },
  },
};

export default meta;

const DefaultTemplate = (args: IllustrationProps) => `
<mnt-illustration
  name="${args.name}"
  width="${args.width}"
  height="${args.height}"
></mnt-illustration>
`;

export const Playground = DefaultTemplate.bind({});
Playground.args = {
  name: 'burger',
  width: 140,
  height: 140,
} as IllustrationProps;
Playground.parameters = {
  docs: {
    description: {
      story: `
### Playground Interativo

Experimente diferentes ilustrações e opções de dimensionamento. Este playground permite que você:

- **Selecione qualquer ilustração** da coleção disponível usando o controle de nome
- **Ajuste as dimensões** com os controles de largura e altura para encontrar o tamanho perfeito
- **Visualize mudanças em tempo real** conforme modifica as propriedades
- **Teste responsividade** experimentando diferentes combinações de dimensões

Use este playground para entender como as ilustrações se comportam em diferentes tamanhos e para encontrar a ilustração perfeita para seu caso de uso.
      `,
    },
  },
};

const renderAllIllustrations = (): HTMLString => {
  let html = '';
  Object.keys(ILLUSTRATIONS).forEach((illustration) => {
    html += `
      <div class="sb-box">
        <mnt-illustration name="${illustration}" width="140" height="140"></mnt-illustration>
        <p class="label-regular-tiny">${illustration}</p>
      </div>
    `;
  });
  return `
    <div class="sb-grid-4 sb-grid-stretch">
      ${html}
    </div>
  `;
};

export const AllIllustrations: StoryFn = () => renderAllIllustrations();
AllIllustrations.parameters = {
  docs: {
    description: {
      story: `
### Coleção Completa de Ilustrações

Esta vitrine exibe todas as ilustrações disponíveis no design system. A coleção inclui:

#### Estados Emocionais
- **happy**: Um personagem alegre expressando alegria e positividade
- **sad**: Um personagem melancólico transmitindo decepção ou tristeza
- **inLove**: Um personagem com olhos de coração expressando amor ou admiração
- **happyWithCrying**: Emoções mistas mostrando alegria com lágrimas de felicidade

#### Conquistas e Sucesso
- **happyCheck**: Estado de sucesso com marca de verificação indicando conclusão
- **happyWithCoin**: Ilustração de conquista mostrando sucesso monetário ou recompensas
- **goalWithBoy**: Ilustração de conquista de objetivo apresentando um personagem masculino
- **goalWithGirl**: Ilustração de conquista de objetivo apresentando um personagem feminino

#### Busca e Descoberta
- **search**: Ilustração de lupa para funcionalidade de busca
- **glasses**: Ilustração de óculos para temas de visão ou insight
- **sunglasses**: Personagem descolado com óculos escuros para estados trendy ou relaxados

#### Objetos e Comida
- **burger**: Ilustração de comida perfeita para restaurantes ou aplicações relacionadas à comida
- **heart**: Símbolo de amor e afeto para contextos românticos ou carinhosos

#### Estados do Sistema
- **maintenance**: Ilustração de manutenção técnica para atualizações de sistema ou inatividade

Cada ilustração é projetada para ser expressiva, amigável e consistente com a estética geral do design system. Use essas ilustrações para criar conexões emocionais com os usuários e aprimorar a narrativa visual da sua aplicação.
      `,
    },
    source: {
      code: renderAllIllustrations(),
    },
  },
  controls: { disable: true },
};
