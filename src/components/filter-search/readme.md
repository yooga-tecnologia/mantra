# mnt-filter-search



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type                                       | Default     |
| ------------- | ------------- | ----------- | ------------------------------------------ | ----------- |
| `fullWidth`   | `full-width`  |             | `boolean`                                  | `false`     |
| `name`        | `name`        |             | `string`                                   | `undefined` |
| `placeholder` | `placeholder` |             | `string`                                   | `undefined` |
| `size`        | `size`        |             | `"large" \| "medium" \| "small" \| "tiny"` | `'medium'`  |
| `state`       | `state`       |             | `"default" \| "error" \| "success"`        | `'default'` |
| `value`       | `value`       |             | `string`                                   | `undefined` |


## Events

| Event           | Description | Type                              |
| --------------- | ----------- | --------------------------------- |
| `filterApplied` |             | `CustomEvent<{ value: string; }>` |
| `valueChange`   |             | `CustomEvent<{ value: string; }>` |


## Dependencies

### Depends on

- [mnt-icon](../icon)

### Graph
```mermaid
graph TD;
  mnt-filter-search --> mnt-icon
  style mnt-filter-search fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
