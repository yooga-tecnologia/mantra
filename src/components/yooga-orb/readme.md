# mnt-yooga-orb

Avatar animado da Maya, construído a partir da geometria oficial do `yoogaIcon` (viewBox `0 0 32 32`). A animação apenas revela partes do próprio logo através de uma `<mask>` SVG, sem desenhar formas por cima.

## Uso

```html
<!-- Tela inicial -->
<mnt-yooga-orb state="idle" size="lg"></mnt-yooga-orb>

<!-- Enquanto a IA trabalha -->
<mnt-yooga-orb state="thinking"></mnt-yooga-orb>

<!-- Resposta no histórico, com o nome "Maya" ao lado -->
<mnt-yooga-orb state="settled" decorative></mnt-yooga-orb>
```

## Estados

| Estado     | Comportamento                                      | Quando usar                                   |
| ---------- | -------------------------------------------------- | --------------------------------------------- |
| `idle`     | Animação lenta                                     | Tela inicial, uma instância por tela          |
| `thinking` | Animação rápida com halo                           | Enquanto a IA trabalha                        |
| `settled`  | Logo inteiro aceso e estático, sem nenhuma animação | Cada resposta do histórico                    |

## Brilho (bloom)

O brilho dura 1s e toca uma única vez quando:

- a mesma instância passa de `thinking` para `settled`;
- a prop `bloom` é ativada.

Montar o componente já em `settled` (por exemplo, ao abrir uma conversa do histórico) não dispara o brilho.

## Acessibilidade

- Por padrão o componente expõe `role="img"` e um `aria-label` que muda com o estado: "Maya" ou "Maya está pensando".
- `label` sobrescreve o nome acessível padrão.
- `decorative` aplica `aria-hidden="true"`; use quando o nome "Maya" já aparece ao lado.
- Com `prefers-reduced-motion`, as animações são desligadas e o logo fica inteiro aceso. O estado `thinking` mantém uma respiração suave de opacidade para continuar diferente de `settled`.

## Fora do escopo

Não usar como loading geral do sistema.

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description | Type                                | Default     |
| ------------ | ------------ | ----------- | ----------------------------------- | ----------- |
| `bloom`      | `bloom`      |             | `boolean`                           | `false`     |
| `decorative` | `decorative` |             | `boolean`                           | `false`     |
| `label`      | `label`      |             | `string`                            | `undefined` |
| `size`       | `size`       |             | `"lg" \| "md" \| "sm" \| number`    | `'sm'`      |
| `state`      | `state`      |             | `"idle" \| "settled" \| "thinking"` | `'idle'`    |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
