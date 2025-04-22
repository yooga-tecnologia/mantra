import { Component, Prop, h, Element } from '@stencil/core';
import { ICONS } from './yoo-icon-base';
import { directionTransformMap } from './yoo-icon.constants';
import { type Direction, type IconProps, iconSizes } from './yoo-icon.types';

@Component({
  tag: 'yoo-icon',
  styleUrl: 'yoo-icon.scss',
  shadow: false,
})
export class IconComponent {
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

  private updateIcon() {
    const container = this.el.querySelector('#icon-container');
    const baseIconName = this.getBaseIconName(this.icon);

    if (container) {
      container.innerHTML = ICONS[baseIconName];
    }
  }

  private getBaseIconName(iconName: string): string {
    return iconName.replace(/-(up|down|right|left)$/, '');
  }

  private calculateSizes() {
    const baseSize = typeof this.size === 'number' ? this.size : iconSizes[this.size];

    if (this.background && baseSize > iconSizes.medium) {
      this.bgSize = `${baseSize}px`;
      this.iconSize = `${baseSize - iconSizes.small}px`;
    } else {
      this.iconSize = `${baseSize}px`;
      this.bgSize = undefined;
    }
  }

  private getTransform(iconName: string): string {
    const match = iconName.match(/-(up|down|left|right)$/);
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
      this.backgroundElRef.classList.add('icon-bg', 'border-circle');
      this.backgroundElRef.style.backgroundColor = this.background;
      this.backgroundElRef.style.width = this.bgSize;
      this.backgroundElRef.style.height = this.bgSize;
    }
  }

  render() {
    return (
      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={this.iconSize} height={this.iconSize} fill={this.color} transform={this.transform}>
          <g id="icon-container"></g>
        </svg>

        {this.background && <span ref={el => (this.backgroundElRef = el)}></span>}
      </div>
    );
  }
}
