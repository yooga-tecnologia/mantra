import { Component, Host, Prop, Watch, State, h } from '@stencil/core';

import { classNames } from '../../utils/utils';
import type { ProgressBarProps } from './progress-bar.types';

const COMPONENT_TAG = 'mnt-progress-bar';

@Component({
  tag: 'mnt-progress-bar',
  styleUrl: 'progress-bar.scss',
  shadow: false,
})
export class ProgressBar {
  @Prop() type: ProgressBarProps['type'] = 'percent';
  @Prop() value: ProgressBarProps['value'] = 0;
  @Prop() label?: ProgressBarProps['label'];
  @Prop() labelPosition: ProgressBarProps['labelPosition'] = 'top';
  @Prop() color: ProgressBarProps['color'] = 'primary';
  @Prop() fullWidth: ProgressBarProps['fullWidth'] = false;
  @Prop() rounded: ProgressBarProps['rounded'] = false;

  @State() private computedPercent: number = 0;

  componentWillLoad() {
    this.computedPercent = this.resolvePercent();
  }

  @Watch('value')
  @Watch('type')
  handleValueChange() {
    this.computedPercent = this.resolvePercent();
  }

  private resolvePercent(): number {
    if (this.type === 'steps') {
      const steps = this.value as [number, number];

      if (!Array.isArray(steps) || steps.length < 2) {
        console.warn(`[MANTRA][progress-bar]: "steps" type requires value as [currentStep, totalSteps].`);
        return 0;
      }

      const [current, total] = steps;

      if (total <= 0) return 0;

      return Math.min(Math.round((current / total) * 100), 100);
    }

    // ponytail: coerce string from HTML attributes to number
    const percent = Number(this.value);

    if (isNaN(percent)) {
      console.warn(`[MANTRA][progress-bar]: "percent" type requires a numeric value.`);
      return 0;
    }

    return Math.min(Math.max(Math.round(percent), 0), 100);
  }

  private get isInline(): boolean {
    return this.labelPosition === 'left' || this.labelPosition === 'right';
  }

  private get containerClass(): string {
    return classNames(
      `${COMPONENT_TAG}`,
      this.isInline && `${COMPONENT_TAG}--inline`,
      `${COMPONENT_TAG}--${this.color}`,
      this.labelPosition && `${COMPONENT_TAG}--label-${this.labelPosition}`,
    );
  }

  private get compactLabel(): string {
    if (this.type === 'steps') {
      const steps = this.value as [number, number];
      if (Array.isArray(steps) && steps.length >= 2) {
        return `${steps[0]} de ${steps[1]}`;
      }
      return '';
    }

    return `${this.computedPercent}%`;
  }

  render() {
    const isInline = this.isInline;
    const labelText = isInline ? this.compactLabel : this.label;
    const labelElement = labelText && <span class={`${COMPONENT_TAG}__label ${COMPONENT_TAG}__label-${this.labelPosition}`}>{labelText}</span>;

    const track = (
      <div
        class={`${COMPONENT_TAG}__track`}
        role="progressbar"
        aria-valuenow={this.computedPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={this.label ?? labelText}
      >
        <div
          class={`${COMPONENT_TAG}__fill`}
          style={{ width: `${this.computedPercent}%` }}
        />
      </div>
    );

    return (
      <Host>
        <div class={this.containerClass}>
          {(this.labelPosition === 'top' || this.labelPosition === 'left') && labelElement}
          {track}
          {(this.labelPosition === 'bottom' || this.labelPosition === 'right') && labelElement}
        </div>
      </Host>
    );
  }
}
