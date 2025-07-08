import type { Meta } from '@storybook/html';
import type { TooltipProps } from './yoo-tooltip.types';
import { tooltipPositions } from './yoo-tooltip.types';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: 'yoo-tooltip',
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
  <yoo-tooltip text="${args.text}" position="${args.position}">
    <button slot="trigger">Passe o mouse</button>
  </yoo-tooltip>
`;

export const Default = Template.bind({});
Default.args = {
  text: 'Tooltip de exemplo',
  position: 'top',
};
