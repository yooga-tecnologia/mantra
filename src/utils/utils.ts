export function format(first?: string, middle?: string, last?: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function getLibPrefix(): string {
  return 'mnt-';
}

export function setComponentClass(componentTag: string, variant: string): string {
  return `${getLibPrefix()}${componentTag}-${variant}`;
}
