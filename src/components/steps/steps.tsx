import { Component, Host, Prop, h } from '@stencil/core';
import { COMPONENT_PREFIX, type StepsProps, type StepItem } from './steps.types';

@Component({
  tag: 'mnt-steps',
  styleUrl: 'steps.scss',
  shadow: false,
})
export class Steps {
  @Prop() orientation: StepsProps['orientation'] = 'horizontal';
  @Prop() steps: StepsProps['steps'] = [];

  private renderStepIcon(status: StepItem['status']) {
    if (status === 'completed') {
      return (
        <mnt-icon
          icon="check"
          size={20}
          class={`${COMPONENT_PREFIX}-icon`}
        />
      );
    }
    
    // For active and disabled states, render an empty div as placeholder
    return null;
  }

  private renderDivider() {
    return <div class={`${COMPONENT_PREFIX}-divider`}></div>;
  }

  private renderStep(step: StepItem, index: number) {
    const stepClass = `${COMPONENT_PREFIX}-step ${COMPONENT_PREFIX}-step-${step.status}`;
    const circleClass = `${COMPONENT_PREFIX}-circle ${COMPONENT_PREFIX}-circle-${step.status}`;
    const labelContainerClass = `${COMPONENT_PREFIX}-label-container ${COMPONENT_PREFIX}-label-container-${step.status}`;
    const labelClass = `${COMPONENT_PREFIX}-label`;

    return (
      <div class={stepClass} key={`step-${index}`}>
        <div class={circleClass}>
          {this.renderStepIcon(step.status)}
        </div>
        <div class={labelContainerClass}>
          <span class={labelClass}>{step.label}</span>
        </div>
      </div>
    );
  }

  get containerClass(): string {
    return `${COMPONENT_PREFIX}-container ${COMPONENT_PREFIX}-${this.orientation}`;
  }

  render() {
    if (!this.steps || this.steps.length === 0) {
      console.warn('[MANTRA] The "steps" property is required and should contain at least one step.');
      return null;
    }

    return (
      <Host>
        <div class={this.containerClass}>
          {this.steps.map((step, index) => [
            this.renderStep(step, index),
            index < this.steps.length - 1 && this.renderDivider()
          ])}
        </div>
      </Host>
    );
  }
}

