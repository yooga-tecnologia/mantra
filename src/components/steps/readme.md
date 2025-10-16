# mnt-steps

O componente `mnt-steps` é utilizado para indicar o progresso de um processo em múltiplas etapas. Ele pode ser exibido em orientação horizontal ou vertical, e cada etapa pode ter um dos três estados: completado, ativo ou desabilitado.

## Uso

```html
<mnt-steps
  orientation="horizontal"
  steps='[
    {"label": "Step 1", "status": "completed"},
    {"label": "Step 2", "status": "completed"},
    {"label": "Step 3", "status": "active"},
    {"label": "Step 4", "status": "disabled"}
  ]'
></mnt-steps>
```

## Propriedades

| Propriedade   | Tipo                          | Padrão         | Descrição                                                  |
| ------------- | ----------------------------- | -------------- | ---------------------------------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'`  | `'horizontal'` | Define a orientação do componente                          |
| `steps`       | `StepItem[]`                  | `[]`           | Array de steps com label e status                          |

### StepItem

```typescript
interface StepItem {
  label: string;
  status: 'completed' | 'active' | 'disabled';
}
```

## Estados

### Completed (Completado)
- Background azul claro (#83cef6)
- Ícone de check branco
- Indica que a etapa foi concluída

### Active (Ativo)
- Background azul muito claro (#e1f1fd)
- Borda azul (#0b7cbe)
- Ícone placeholder azul
- Indica a etapa atual

### Disabled (Desabilitado)
- Background cinza (#f5f6f6)
- Ícone placeholder cinza
- Indica etapas futuras ainda não disponíveis

## Exemplos

### Horizontal
```html
<mnt-steps
  orientation="horizontal"
  steps='[
    {"label": "Dados Pessoais", "status": "completed"},
    {"label": "Endereço", "status": "completed"},
    {"label": "Pagamento", "status": "active"},
    {"label": "Confirmação", "status": "disabled"}
  ]'
></mnt-steps>
```

### Vertical
```html
<mnt-steps
  orientation="vertical"
  steps='[
    {"label": "Criar Conta", "status": "completed"},
    {"label": "Verificar Email", "status": "completed"},
    {"label": "Configurar Perfil", "status": "active"},
    {"label": "Começar a Usar", "status": "disabled"}
  ]'
></mnt-steps>
```

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type                         | Default        |
| ------------- | ------------- | ----------- | ---------------------------- | -------------- |
| `orientation` | `orientation` |             | `"horizontal" \| "vertical"` | `'horizontal'` |
| `steps`       | --            |             | `StepItem[]`                 | `[]`           |


## Dependencies

### Depends on

- [mnt-icon](../icon)

### Graph
```mermaid
graph TD;
  mnt-steps --> mnt-icon
  style mnt-steps fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
