/**
 * Formata e concatena nomes, inserindo espaços apenas quando necessário.
 *
 * @param {string} [first] - Primeiro nome.
 * @param {string} [middle] - Nome do meio (opcional).
 * @param {string} [last] - Último nome (opcional).
 * @returns {string} Nome completo formatado.
 */
export function format(first?: string, middle?: string, last?: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

/**
 * Retorna o prefixo padrão da biblioteca para classes CSS.
 *
 * @returns {string} Prefixo da lib (ex: 'mnt-').
 */
export function getLibPrefix(): string {
  return 'mnt-';
}

/**
 * Gera uma classe CSS para um componente com base no tag e variante.
 *
 * @param {string} componentTag - Tag do componente (ex: 'button').
 * @param {string} variant - Variante ou modificador (ex: 'primary').
 * @returns {string} Classe CSS gerada.
 */
export function setComponentClass(componentTag: string, variant?: string): string {
  return `${getLibPrefix()}${componentTag}${variant ? `-${variant}` : ''}`;
}

/**
 * Utilitário para montar classes CSS dinamicamente.
 *
 * Exemplo de uso:
 *   classNames('foo', cond && 'bar', otherVar)
 *   // Resultado: 'foo bar valorDeOtherVar'
 *
 * @param {...(string | false | undefined)[]} args - Lista de classes, valores falsy são ignorados.
 * @returns {string} String de classes separadas por espaço.
 */
export function classNames(...args: (string | false | undefined)[]): string {
  return args.filter(Boolean).join(' ');
}

export type HTMLString = string;
