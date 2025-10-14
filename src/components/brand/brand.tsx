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
  @Prop() color: BrandProps['color'];
  @Prop() height: BrandProps['height'] = 35;
  @State() svgIllustration: string = '';

  private svgViewbox;
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
      console.log(this.svgViewbox);
    } else {
      console.log(`[Mantra]: Illustration with name "${this.name}" does not exist.`);
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
    return (
      <div class={this.getIllustrationClass()}>
        <svg
          class="d-flex"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={this.svgViewbox}
          height={this.height}
          fill={this.color}
        >
          <g ref={(el) => (this.gRef = el)}></g>
        </svg>
      </div>
    );
  }
}
