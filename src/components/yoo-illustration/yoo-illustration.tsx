import { Component, Prop, State, h, Watch, Element } from '@stencil/core';
import { ILLUSTRATIONS } from './yoo-illustration-base';
import type { IllustrationProps } from './yoo-illustration.types';

@Component({
  tag: 'yoo-illustration',
  styleUrl: 'yoo-illustration.scss',
  shadow: false,
})
export class IllustrationComponent {
  @Element() el!: HTMLElement;

  @Prop() name!: IllustrationProps['name'];
  @Prop() width: IllustrationProps['width'] = 140;
  @Prop() height: IllustrationProps['height'] = 140;
  @State() svgIllustration: string = '';

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
    this.svgIllustration = ILLUSTRATIONS[this.name] || '';
  }

  private updateSVGContent(): void {
    if (this.gRef && this.svgIllustration) {
      this.gRef.innerHTML = this.svgIllustration;
    }
  }

  render() {
    return (
      <div class="illustration-wrapper">
        <svg class="d-flex" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width={this.width} height={this.height}>
          <g ref={el => (this.gRef = el)}></g>
        </svg>
      </div>
    );
  }
}
