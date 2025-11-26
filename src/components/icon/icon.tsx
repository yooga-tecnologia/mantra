import { Component, Prop, h, Element, JSX } from '@stencil/core';

import { ICON_DIRECTION_SUFFIX_REGEX } from './icon.constants';

import { iconSizes } from './icon.types';
import type { Direction, IconProps } from './icon.types';
import { getIconSvgByName } from './icon.utils';

@Component({
  tag: 'mnt-icon',
  styleUrl: 'icon.scss',
  shadow: false,
})
export class Icon {
  @Element() el!: HTMLElement;

  @Prop() icon!: IconProps['icon'];
  @Prop() size: IconProps['size'] = 'medium';
  @Prop() color: IconProps['color'] = 'currentColor';
  @Prop() background?: IconProps['background'];
  @Prop() bgShape?: IconProps['bgShape'];
  @Prop() animation?: IconProps['animation'];

  iconSize!: string;
  bgSize?: string;
  transform!: string;
  baseIconName!: string;
  backgroundElRef?: HTMLSpanElement;
  direction!: Direction;
  parsedBackground?: { color: string; shape: string };

  iconBgGapSizeMap = {
    tiny: 4,
    small: 8,
    medium: 12,
    large: 16,
    doubleLarge: 24,
  };

  componentWillLoad() {
    this.parseBackgroundAttribute();
    this.calculateSizes();
    this.baseIconName = this.getBaseIconName(this.icon);
    this.direction = this.getDirection(this.icon);
  }

  componentDidLoad() {
    this.setBackgroundProperties();
    this.updateIcon();
  }

  private parseBackgroundAttribute(): void {
    if (!this.background) {
      this.parsedBackground = undefined;
      return;
    }

    // Nova prop bgShape tem prioridade
    if (this.bgShape) {
      this.parsedBackground = {
        color: this.background as string,
        shape: this.bgShape,
      };
      return;
    }

    // Retrocompatibilidade: Se já é um array (tupla [string, shape]), usar diretamente
    if (Array.isArray(this.background)) {
      this.parsedBackground = {
        color: this.background[0],
        shape: this.background[1],
      };
      return;
    }

    // Retrocompatibilidade: Se é uma string JSON válida (ex: '["#color", "shape"]')
    if (typeof this.background === 'string' && this.background.startsWith('[')) {
      try {
        const parsed = JSON.parse(this.background);
        if (Array.isArray(parsed) && parsed.length === 2) {
          this.parsedBackground = {
            color: parsed[0],
            shape: parsed[1],
          };
          return;
        }
      } catch (e) {
        // Se falhar, tratar como cor simples
        console.log('[MANTRA][mnt-icon] Error parsing background:', e);
      }
    }

    // Padrão: cor simples com shape circle
    this.parsedBackground = {
      color: this.background,
      shape: 'circle',
    };
  }

  private getIconClass(): string {
    const classes = ['mnt-icon'];

    if (this.parsedBackground) {
      classes.push('mnt-icon-with-background');
    }

    classes.push(`mnt-icon-d-${this.direction}`);

    return classes.join(' ');
  }

  private updateIcon() {
    const container = this.el.querySelector('#icon-container');
    const baseIconName = this.getBaseIconName(this.icon);

    const svg = getIconSvgByName(baseIconName);
    if (container && svg) {
      container.innerHTML = svg;
    }
  }

  private getBaseIconName(iconName: string): string {
    return iconName.replace(ICON_DIRECTION_SUFFIX_REGEX, '');
  }

  private calculateSizes(): void {
    let numericSize = this.size;
    if (typeof this.size === 'string' && !isNaN(Number(this.size))) {
      numericSize = Number(this.size);
    }

    const baseSize = typeof numericSize === 'number' ? numericSize : iconSizes[numericSize] || iconSizes.medium;

    this.iconSize = `${baseSize}px`;

    if (this.parsedBackground) {
      // Background mantém o tamanho do SVG + gap baseado no tamanho
      // Precisamos normalizar o size para uma chave válida do map
      const normalizedSize = typeof this.size === 'number' ? this.getSizeNameFromNumericValue(this.size) : this.size;

      const gapSize = this.iconBgGapSizeMap[normalizedSize as keyof typeof this.iconBgGapSizeMap] || this.iconBgGapSizeMap.medium;

      this.bgSize = `${baseSize + gapSize}px`;
    } else {
      this.bgSize = undefined;
    }
  }

  private getSizeNameFromNumericValue(size: number): string {
    if (size <= iconSizes.tiny) return 'tiny';
    if (size <= iconSizes.small) return 'small';
    if (size <= iconSizes.medium) return 'medium';
    if (size <= iconSizes.large) return 'large';
    return 'doubleLarge';
  }

  private getDirection(iconName: string): Direction {
    const match = ICON_DIRECTION_SUFFIX_REGEX.exec(iconName);

    if (!match) return 'up';

    return match[1] as Direction;
  }

  private setBackgroundProperties(): void {
    if (this.parsedBackground) {
      // Container mantém o tamanho do background (SVG + 8px)
      const targetSize = this.bgSize;
      this.el.style.width = targetSize;
      this.el.style.height = targetSize;
    } else {
      // Sem background, container usa o tamanho do SVG
      this.el.style.width = this.iconSize;
      this.el.style.height = this.iconSize;
    }

    if (this.parsedBackground && this.backgroundElRef) {
      this.backgroundElRef.classList.add('mnt-icon-bg', `mnt-border-${this.parsedBackground.shape}`);
      this.backgroundElRef.style.backgroundColor = this.parsedBackground.color;
      this.backgroundElRef.style.width = this.bgSize;
      this.backgroundElRef.style.height = this.bgSize;
    }
  }

  private getIconBase(): JSX.Element {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={this.iconSize}
        height={this.iconSize}
        fill={this.color}
      >
        <g id="icon-container"></g>
      </svg>
    );
  }

  render(): JSX.Element {
    if (this.parsedBackground) {
      return (
        <div class={this.getIconClass()}>
          {this.getIconBase()}
          <span ref={(el) => (this.backgroundElRef = el)}></span>
        </div>
      );
    }

    // Sempre renderizar com wrapper para aplicar classes de direção
    return <div class={this.getIconClass()}>{this.getIconBase()}</div>;
  }
}
