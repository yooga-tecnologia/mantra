import { Component, Prop, h, Element, JSX } from '@stencil/core';

import { directionTransformMap, ICON_DIRECTION_SUFFIX_REGEX } from './icon.constants';

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
  @Prop() animation?: IconProps['animation'];

  iconSize!: string;
  bgSize?: string;
  transform!: string;
  baseIconName!: string;
  backgroundElRef?: HTMLSpanElement;

  componentWillLoad() {
    this.calculateSizes();
    this.baseIconName = this.getBaseIconName(this.icon);
    this.transform = this.getTransform(this.icon);
  }

  componentDidLoad() {
    this.setBackgroundProperties();
    this.updateIcon();
  }

  private getIconClass(): string {
    const classes = ['mnt-icon'];

    if (this.background) {
      classes.push('mnt-icon-with-background');
    }

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

    if (this.background && baseSize < iconSizes.large) {
      console.warn(
        `[mnt-icon] Background property is not recommended for sizes smaller than 'large' (32px). ` +
          `Current size: ${baseSize}px. Consider using 'large' or 'doubleLarge' for better visual results.`,
      );
    }

    if (this.background && baseSize > iconSizes.medium) {
      this.bgSize = `${baseSize}px`;
      this.iconSize = `${baseSize - iconSizes.small}px`;
    } else {
      this.iconSize = `${baseSize}px`;
      this.bgSize = undefined;
    }
  }

  private getTransform(iconName: string): string {
    const match = ICON_DIRECTION_SUFFIX_REGEX.exec(iconName);
    if (match) {
      const direction = match[1] as Direction;
      return directionTransformMap[direction];
    }
    return 'rotate(0)';
  }

  private setBackgroundProperties(): void {
    const targetSize = this.background ? this.bgSize : this.iconSize;
    if (targetSize) {
      this.el.style.width = targetSize;
      this.el.style.height = targetSize;
    }

    if (this.background && this.bgSize && this.backgroundElRef) {
      this.backgroundElRef.classList.add('mnt-icon-bg', 'mnt-border-circle');
      this.backgroundElRef.style.backgroundColor = this.background;
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
        transform={this.transform}
      >
        <g id="icon-container"></g>
      </svg>
    );
  }

  render(): JSX.Element {
    if (this.background) {
      return (
        <div class={this.getIconClass()}>
          {this.getIconBase()}
          {this.background && <span ref={(el) => (this.backgroundElRef = el)}></span>}
        </div>
      );
    }

    return this.getIconBase();
  }
}
