import { Component, Prop, h, Element, JSX } from '@stencil/core';

import { IconLargeProps, iconLargeSizes } from './icon.types';
import { getIconSvgByName } from './icon.utils';

@Component({
  tag: 'mnt-icon-large',
  styleUrl: 'icon.scss',
  shadow: false,
})
export class IconLarge {
  @Element() el!: HTMLElement;

  @Prop() icon!: string;
  @Prop() size: IconLargeProps['size'] = 'medium';
  @Prop() color: IconLargeProps['color'] = 'currentColor';

  iconSize!: string;
  bgSize?: string;
  baseIconName!: string;
  backgroundElRef?: HTMLSpanElement;

  componentWillLoad() {
    this.calculateSizes();
  }

  componentDidLoad() {
    this.updateIcon();
  }

  private updateIcon() {
    const container = this.el.querySelector('#icon-container');

    const svg = getIconSvgByName(this.icon, true);
    if (container && svg) {
      container.innerHTML = svg;
    }
  }

  calculateSizes(): void {
    let numericSize = this.size;

    if (typeof this.size === 'string' && !isNaN(Number(this.size))) {
      numericSize = Number(this.size);
    }

    if (typeof numericSize === 'number') {
      this.iconSize = `${numericSize}px`;
    } else {
      // Fallback to medium if invalid size provided
      const sizeValue = iconLargeSizes[numericSize] || iconLargeSizes.medium;
      this.iconSize = `${sizeValue}px`;
    }
  }

  render(): JSX.Element {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={this.iconSize}
        height={this.iconSize}
        fill={this.color}
      >
        <g id="icon-container"></g>
      </svg>
    );
  }
}
