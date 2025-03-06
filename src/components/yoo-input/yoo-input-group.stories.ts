export default {
  title: 'Components/InputGroup',
  component: 'yoo-input-group',
  argTypes: {
    inputName: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    isRequired: { control: 'boolean' },
    condition: { control: 'boolean' },
    trailingIcon: { control: 'boolean' },
  },
};

const Template = args => `
  <div style="width: 500px">
    <yoo-input-group
      inputName="${args.inputName}"
      label="${args.label}"
      placeholder="${args.placeholder}"
      is-required="${args.isRequired}"
      condition="${args.condition}"
      trailingIcon="${args.trailingIcon}"
      block
    >
      <span slot="helperText">Helper Text</span>
      <input slot="input" />
      ${args.trailingIcon ? '<span slot="actions">🔍</span>' : ''}
    </yoo-input-group>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  inputName: 'username',
  label: 'Username',
  placeholder: 'Enter your username',
  isRequired: false,
  condition: false,
  trailingIcon: false,
};
