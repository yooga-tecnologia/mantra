# mnt-checkbox



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                         | Default     |
| --------- | --------- | ----------- | ---------------------------- | ----------- |
| `checked` | `checked` |             | `boolean`                    | `false`     |
| `label`   | `label`   |             | `string`                     | `undefined` |
| `name`    | `name`    |             | `string`                     | `undefined` |
| `value`   | `value`   |             | `string`                     | `undefined` |
| `variant` | `variant` |             | `"check" \| "indeterminate"` | `'check'`   |


## Events

| Event            | Description | Type                                                |
| ---------------- | ----------- | --------------------------------------------------- |
| `checkboxChange` |             | `CustomEvent<{ checked: boolean; value: string; }>` |


## Dependencies

### Depends on

- [mnt-icon](../icon)

### Graph
```mermaid
graph TD;
  mnt-checkbox --> mnt-icon
  style mnt-checkbox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
