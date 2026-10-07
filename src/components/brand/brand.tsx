import { Component, Prop, State, h, Watch, Element } from '@stencil/core';

import { getLibPrefix } from 'src/utils/utils';
import { BRANDS } from './brand-base';
import { BrandProps } from './brand.types';

const LIB_PREFIX = getLibPrefix();

@Component({
  tag: 'mnt-brand',
  shadow: false,
})
export class Brand {
  @Element() el!: HTMLElement;

  @Prop() name!: BrandProps['name'];
  @Prop() height: BrandProps['height'] = 35;
  @Prop({ mutable: true }) color: BrandProps['color'];
  @State() svgIllustration: string = '';

  private svgViewbox: string = '';
  private gRef!: SVGElement;

  componentWillLoad() {
    this.updateIllustration();
  }

  componentDidLoad() {
    this.updateSVGContent();
  }

  componentDidUpdate() {
    this.updateSVGContent();
  }

  @Watch('name')
  watchName() {
    this.updateIllustration();
  }

  private updateIllustration(): void {
    if (BRANDS[this.name]) {
      this.svgIllustration = BRANDS[this.name].svg;
      this.color = this.color || BRANDS[this.name].color;
      this.svgViewbox = `0 0 ${BRANDS[this.name].size[0]} ${BRANDS[this.name].size[1]}`;
    }
  }

  private updateSVGContent(): void {
    if (this.gRef && this.svgIllustration) {
      this.gRef.innerHTML = this.svgIllustration;
    }
  }

  private getIllustrationClass(): string {
    return `${LIB_PREFIX}illustration-wrapper`;
  }

  render() {
    if (!this.svgIllustration) {
      console.error(`[MANTRA] Illustration name "${this.name.trim()}" does not exist.`);
      return;
    }

    return (
      <div class={this.getIllustrationClass()}>
        <svg
          class="d-flex"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={this.svgViewbox}
          height={this.height}
          fill={this.color}
        >
          <g ref={(el) => (this.gRef = el!)}></g>
        </svg>
      </div>
    );
  }
}
