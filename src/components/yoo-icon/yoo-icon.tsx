import { Component, Prop, h, Element } from '@stencil/core';
import { ICONS } from './yoo-icon-base';
import type { IconName, IconAnimation, IconSize } from './yoo-icon.types';

@Component({
  tag: 'yoo-icon',
  styleUrl: 'yoo-icon.scss',
  shadow: false,
})
export class IconComponent {
  @Element() el!: HTMLElement;

  @Prop() icon!: IconName;
  @Prop() size: number | IconSize = 'medium';
  @Prop() color: string = 'currentColor';
  @Prop() background?: string;
  @Prop() animation?: IconAnimation;

  svgIcon!: string;
  iconSize!: string;
  bgSize!: string;
  transform!: string;
  animate!: string;
  baseIconName: string;
  backgroundElRef!: HTMLSpanElement;

  componentWillLoad() {
    this.calculateSizes();
    this.baseIconName = this.getBaseIconName(this.icon);
    this.transform = this.getTransform(this.icon);
  }

  componentDidLoad() {
    this.setBackgroundProperties();
    this.updateIcon();
  }

  updateIcon() {
    const wrapper = this.el.firstElementChild;
    const baseIconName = this.getBaseIconName(this.icon);
    const container = wrapper.firstElementChild;

    container.firstElementChild.innerHTML = ICONS[baseIconName];
  }

  getBaseIconName(iconName: string): string {
    const directionPattern = /-(up|down|right|left)$/;

    if(!directionPattern) {
      return iconName
    } else {
      return iconName.replace(directionPattern, '');
    }
  }

  calculateSizes() {
    const sizeMap: Record<string, number> = {
      small: 16,
      medium: 24,
      large: 32,
      doubleLarge: 64,
    };

    const baseSize = typeof this.size === "number"
      ? this.size
      : sizeMap[this.size];

    this.bgSize = (this.background && baseSize > sizeMap.medium) ? `${baseSize}px` : undefined;
    this.iconSize = this.bgSize ? `${baseSize - sizeMap.small}px` : `${baseSize}px`;
  }

  getTransform(iconName: string): string { // TODO: Melhorar type em vez de string para ['up', 'down', 'right', 'left']
    if (iconName.includes('-up')) {
      return 'rotate(0)'; // Nenhuma rotação necessária para cima
    } else if (iconName.includes('-down')) {
      return 'rotate(180 0 0)'; // Rotação de 180 graus
    } else if (iconName.includes('-right')) {
      return 'rotate(90 0 0)'; // Rotação de 90 graus no sentido horário
    } else if (iconName.includes('-left')) {
      return 'rotate(-90 0 0)'; // Rotação de 90 graus no sentido anti-horário
    }

    return 'rotate(0)'; // Nenhuma rotação necessária para cima (-up) ou sem a prop rotate
  }

  setBackgroundProperties(): void {
    if (!this.background) {
      this.el.setAttribute("style", `width: ${this.iconSize}; height: ${this.iconSize}`);
      return
    }

    this.el.setAttribute("style", `width: ${this.bgSize}; height: ${this.bgSize}`);
    this.backgroundElRef = this.el.querySelector("span");
    this.backgroundElRef.classList.add("icon-bg", "border-circle");
    this.backgroundElRef.style.backgroundColor = this.background;
    this.backgroundElRef.style.width = this.bgSize;
    this.backgroundElRef.style.height = this.bgSize;
  }

  render() {
    return (
      <div class="icon-wrapper">
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

        {this.background && (
          <span></span>
        )}

      </div>
    );
  }
}
