import type { Meta, StoryFn } from '@storybook/html';

import { colorTonesArray, sizeVariantsArray, ThemePalette, themePalettesArray } from '../../shared/theme/theme.types';
import { ICON_OPTIONS } from '../icon/icon.utils';
import { HTMLString } from 'src/utils/utils';

import { BadgeBaseProps } from './badge.types';
import { Badge } from './badge';

const SB_TABLE_ICON = {
  type: {
    summary: ICON_OPTIONS.join(' | '),
  },
};

const meta: Meta = {
  title: 'Components/Badge/BadgeIcon',
  component: 'mnt-badge-icon',
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto utilizado para acessibilidade (aria-label)',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: sizeVariantsArray,
      description: 'Tamanho do badge',
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: sizeVariantsArray.join(' | ') },
      },
    },
    color: {
      control: 'select',
      options: themePalettesArray,
      description: 'Cor principal da badge',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: themePalettesArray.join(' | ') },
      },
    },
    tone: {
      control: 'select',
      options: colorTonesArray,
      description: 'Variação de tonalidade, baseado na cor selecionada',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: colorTonesArray.join(' | ') },
      },
    },
    icon: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Ícone exibido (opcional)',
      table: SB_TABLE_ICON,
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
O componente **BadgeIcon** exibe apenas o ícone, sem label visível.

### Características principais:

- **Tamanhos**: tiny, small, medium, large
- **Cores**: Todas as cores do tema (primary, secondary, success, warning, critical, neutral)
- **Tons**: default, highlight, emphasis
- **Ícones**: Suporte a todos os ícones do sistema
        `,
      },
    },
  },
};

export default meta;

const DefaultTemplate = (args: BadgeBaseProps): HTMLString => `
  <mnt-badge-icon
    icon=${args.icon}
    color=${args.color}
    size=${args.size}
    label="${args.label}"
    tone=${args.tone}
  ></mnt-badge-icon>
`;

export const Example = DefaultTemplate.bind({});
Example.args = {
  color: 'primary',
  size: 'medium',
  icon: 'check',
  tone: 'default',
  label: 'Badge Label',
} as BadgeBaseProps;

/**
 * Badge com apenas ícone (mnt-badge-icon)
 */
export const BadgeIconVariant: StoryFn = () => `
  <div style="display: flex; flex-direction: column; gap: 40px;">
    <!-- Tamanhos -->
    <div>
      <h4 style="margin-bottom: 16px;">Todos os Tamanhos</h4>
      <div style="display: flex; gap: 16px; align-items: center;">
        <div style="text-align: center;">
          <mnt-badge-icon size="tiny" icon="info" label="Informação" color="primary"></mnt-badge-icon>
          <div style="font-size: 12px; color: #666; margin-top: 4px;">tiny</div>
        </div>
        <div style="text-align: center;">
          <mnt-badge-icon size="small" icon="info" label="Informação" color="primary"></mnt-badge-icon>
          <div style="font-size: 12px; color: #666; margin-top: 4px;">small</div>
        </div>
        <div style="text-align: center;">
          <mnt-badge-icon size="medium" icon="info" label="Informação" color="primary"></mnt-badge-icon>
          <div style="font-size: 12px; color: #666; margin-top: 4px;">medium</div>
        </div>
        <div style="text-align: center;">
          <mnt-badge-icon size="large" icon="info" label="Informação" color="primary"></mnt-badge-icon>
          <div style="font-size: 12px; color: #666; margin-top: 4px;">large</div>
        </div>
      </div>
    </div>

    <!-- Cores -->
    <div>
      <h4 style="margin-bottom: 16px;">Todas as Cores</h4>
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <mnt-badge-icon size="medium" icon="info" label="Neutral" color="neutral"></mnt-badge-icon>
        <mnt-badge-icon size="medium" icon="check" label="Primary" color="primary"></mnt-badge-icon>
        <mnt-badge-icon size="medium" icon="star" label="Secondary" color="secondary"></mnt-badge-icon>
        <mnt-badge-icon size="medium" icon="checkCircle" label="Success" color="success"></mnt-badge-icon>
        <mnt-badge-icon size="medium" icon="alertTriangle" label="Warning" color="warning"></mnt-badge-icon>
        <mnt-badge-icon size="medium" icon="alertCircle" label="Critical" color="critical"></mnt-badge-icon>
      </div>
    </div>

    <!-- Tons -->
    <div>
      <h4 style="margin-bottom: 16px;">Tons (Tonalidades)</h4>
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <div style="text-align: center;">
          <mnt-badge-icon size="medium" icon="bell" label="Default" color="primary" tone="default"></mnt-badge-icon>
          <div style="font-size: 12px; color: #666; margin-top: 4px;">default</div>
        </div>
        <div style="text-align: center;">
          <mnt-badge-icon size="medium" icon="bell" label="Emphasis" color="primary" tone="highlight"></mnt-badge-icon>
          <div style="font-size: 12px; color: #666; margin-top: 4px;">highlight</div>
        </div>
        <div style="text-align: center;">
          <mnt-badge-icon size="medium" icon="bell" label="Emphasis" color="primary" tone="emphasis"></mnt-badge-icon>
          <div style="font-size: 12px; color: #666; margin-top: 4px;">emphasis</div>
        </div>
      </div>
    </div>

    <!-- Uso em contexto -->
    <div>
      <h4 style="margin-bottom: 16px;">Uso em Contexto</h4>
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 500px;">
        <!-- Notificação -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
          <mnt-badge-icon size="medium" icon="bell" label="3 novas notificações" color="critical" tone="emphasis"></mnt-badge-icon>
          <div>
            <strong>Notificações</strong>
            <div style="font-size: 14px; color: #666;">Você tem 3 novas mensagens</div>
          </div>
        </div>

        <!-- Status Online -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
          <img src="https://i.pravatar.cc/40" alt="Avatar" style="width: 40px; height: 40px; border-radius: 50%; position: relative;">
          <mnt-badge-icon size="tiny" icon="check" label="Usuário online" color="success" tone="emphasis" style="position: relative; margin-left: -16px; margin-top: 24px;"></mnt-badge-icon>
          <div>
            <strong>Ana Silva</strong>
            <div style="font-size: 14px; color: #666;">Online</div>
          </div>
        </div>

        <!-- Alerta -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px;">
          <mnt-badge-icon size="medium" icon="alertCircle" label="Atenção requerida" color="warning" tone="emphasis"></mnt-badge-icon>
          <div>
            <strong>Ação necessária</strong>
            <div style="font-size: 14px; color: #666;">Complete seu cadastro</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div style="margin-top: 24px; padding: 16px; background: #e0e7ff; border-left: 4px solid #6366f1; border-radius: 4px;">
    <strong>♿ Acessibilidade:</strong>
    <p style="margin: 8px 0 0 0; color: #4338ca;">
      Mesmo sem label visível, o atributo <code style="background: white; padding: 2px 6px; border-radius: 4px;">label</code>
      é convertido em <code style="background: white; padding: 2px 6px; border-radius: 4px;">aria-label</code>,
      garantindo que leitores de tela possam entender o significado do ícone.
    </p>
  </div>
`;
BadgeIconVariant.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Variante Badge Icon mostra apenas o ícone, ideal para notificações, indicadores de status e badges compactos.',
    },
  },
};

/**
 * Exemplos de uso: Badge Icon (apenas ícone)
 */
export const BadgeIconExamples: StoryFn = () => `
  <div style="padding: 20px;">
    <h3 style="margin-bottom: 20px;">Exemplos: Badge Icon (mnt-badge-icon)</h3>

    <div style="display: flex; flex-direction: column; gap: 32px;">
      <!-- Indicadores de Status -->
      <div>
        <h4 style="margin-bottom: 12px;">Indicadores de Status</h4>
        <div style="display: flex; gap: 8px; align-items: center;">
          <mnt-badge-icon size="tiny" icon="check" label="Online" color="success" tone="emphasis"></mnt-badge-icon>
          <span>Online</span>
        </div>
        <div style="display: flex; gap: 8px; align-items: center; margin-top: 8px;">
          <mnt-badge-icon size="tiny" icon="minus" label="Ausente" color="warning" tone="emphasis"></mnt-badge-icon>
          <span>Ausente</span>
        </div>
        <div style="display: flex; gap: 8px; align-items: center; margin-top: 8px;">
          <mnt-badge-icon size="tiny" icon="close" label="Offline" color="neutral" tone="emphasis"></mnt-badge-icon>
          <span>Offline</span>
        </div>
      </div>

      <!-- Badges em Avatares -->
      <div>
        <h4 style="margin-bottom: 12px;">Badges em Avatares</h4>
        <div style="display: flex; gap: 16px; align-items: flex-start;">
          <div style="position: relative; display: inline-block;">
            <img src="https://i.pravatar.cc/48?img=1" alt="User 1" style="width: 48px; height: 48px; border-radius: 50%;">
            <mnt-badge-icon
              size="tiny"
              icon="check"
              label="Usuário verificado"
              color="success"
              tone="emphasis"
              style="position: absolute; bottom: -2px; right: -2px;"
            ></mnt-badge-icon>
          </div>

          <div style="position: relative; display: inline-block;">
            <img src="https://i.pravatar.cc/48?img=2" alt="User 2" style="width: 48px; height: 48px; border-radius: 50%;">
            <mnt-badge-icon
              size="tiny"
              icon="star"
              label="Usuário premium"
              color="warning"
              tone="emphasis"
              style="position: absolute; bottom: -2px; right: -2px;"
            ></mnt-badge-icon>
          </div>

          <div style="position: relative; display: inline-block;">
            <img src="https://i.pravatar.cc/48?img=3" alt="User 3" style="width: 48px; height: 48px; border-radius: 50%;">
            <mnt-badge-icon
              size="tiny"
              icon="shield"
              label="Administrador"
              color="critical"
              tone="emphasis"
              style="position: absolute; bottom: -2px; right: -2px;"
            ></mnt-badge-icon>
          </div>
        </div>
      </div>

      <!-- Contadores Compactos -->
      <div>
        <h4 style="margin-bottom: 12px;">Contadores Compactos</h4>
        <div style="display: flex; gap: 24px; align-items: center;">
          <div style="position: relative; display: inline-block;">
            <button style="padding: 8px 16px; background: white; border: 1px solid #ddd; border-radius: 6px; cursor: pointer;">
              Notificações
            </button>
            <mnt-badge-icon
              size="tiny"
              icon="bell"
              label="5 notificações não lidas"
              color="critical"
              tone="emphasis"
              style="position: absolute; top: -8px; right: -8px;"
            ></mnt-badge-icon>
          </div>

          <div style="position: relative; display: inline-block;">
            <button style="padding: 8px 16px; background: white; border: 1px solid #ddd; border-radius: 6px; cursor: pointer;">
              Mensagens
            </button>
            <mnt-badge-icon
              size="tiny"
              icon="email"
              label="12 mensagens não lidas"
              color="primary"
              tone="emphasis"
              style="position: absolute; top: -8px; right: -8px;"
            ></mnt-badge-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
BadgeIconExamples.parameters = {
  controls: { disable: true },
  docs: {
    description: {
      story: 'Exemplos práticos de uso do mnt-badge-icon em diferentes contextos: status, avatares e contadores.',
    },
  },
};

const getColorVariants = (color: ThemePalette): HTMLString => {
  const badgeVariants: HTMLString[] = [];

  colorTonesArray.map((tone) => {
    badgeVariants.push(`<span>${tone}</span>`);
    sizeVariantsArray.map((size) => {
      const label = `${tone} ${size}`;
      badgeVariants.push(DefaultTemplate({ color, tone, size, icon: 'clock', label }));
    });
  });
  return `
<div class="sb-section-box">
  <h4>${color}</h4>
  <div class="sb-grid-5 sb-grid-row-divider sb-grid-row-title">
    ${badgeVariants.join('')}
  </div>
</div>`;
};

export const AllVariants: StoryFn<typeof Badge> = () => {
  const badgeVariants: HTMLString[] = [];
  themePalettesArray.forEach((color) => {
    badgeVariants.push(getColorVariants(color));
  });
  return `
<div>
  ${badgeVariants.join('')}
</div>
`;
};

AllVariants.parameters = {
  controls: { disable: true },
};
