# mnt-tag-selectable



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                                       | Default     |
| -------- | --------- | ----------- | ------------------------------------------ | ----------- |
| `icon`   | `icon`    |             | `string`                                   | `undefined` |
| `label`  | `label`   |             | `string`                                   | `undefined` |
| `size`   | `size`    |             | `"large" \| "medium" \| "small" \| "tiny"` | `'medium'`  |


## Events

| Event                 | Description | Type                                  |
| --------------------- | ----------- | ------------------------------------- |
| `tagSelectableChange` |             | `CustomEvent<{ selected: boolean; }>` |


## Dependencies

### Depends on

- [mnt-icon](../icon)

### Graph
```mermaid
graph TD;
  mnt-tag-selectable --> mnt-icon
  style mnt-tag-selectable fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
