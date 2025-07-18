import type { Meta } from '@storybook/html';
import type { TooltipProps } from './tooltip.types';
import { tooltipPositions } from './tooltip.types';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: 'mnt-tooltip',
  argTypes: {
    text: { control: 'text' },
    position: {
      control: { type: 'select' },
      options: tooltipPositions,
    },
  },
};

export default meta;

const Template = (args: TooltipProps) => `
  <mnt-tooltip text="${args.text}" position="${args.position}">
    <button slot="trigger">Passe o mouse</button>
  </mnt-tooltip>
`;

export const Default = Template.bind({});
Default.args = {
  text: 'Tooltip de exemplo',
  position: 'top',
};
