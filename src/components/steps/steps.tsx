import { Component, Host, Prop, Event, EventEmitter, h, Fragment, State, Watch } from '@stencil/core';
import { COMPONENT_PREFIX, type StepsProps, type StepItem, StepStatus } from './steps.types';

@Component({
  tag: 'mnt-steps',
  styleUrl: 'steps.scss',
  shadow: false,
})
export class Steps {
  @Prop() orientation: StepsProps['orientation'] = 'horizontal';
  @Prop() steps: StepsProps['steps'] = [];
  @Prop() activeStepId?: StepsProps['activeStepId'];

  @State() maxAccessedIndex: number = 0; // Estado interno para o maior índice acessado

  // Propriedade pública para acessar o maxAccessedIndex
  get maxAccessedIndexValue(): number {
    return this.maxAccessedIndex;
  }

  @Event() stepClick: EventEmitter<{ stepId: string; stepIndex: number; status: StepStatus; step: StepItem }>;

  componentWillLoad() {
    this.initializeMaxAccessedIndex();
  }

  @Watch('steps')
  onStepsChange() {
    this.initializeMaxAccessedIndex();
  }

  @Watch('activeStepId')
  onActiveStepIdChange() {
    this.updateMaxAccessedIndexFromActiveStep();
  }

  private initializeMaxAccessedIndex() {
    if (!this.steps || this.steps.length === 0) {
      this.maxAccessedIndex = 0;
      return;
    }

    const currentActiveId = this.getActiveStepId();
    const activeIndex = this.steps.findIndex((s) => s.id === currentActiveId);
    this.maxAccessedIndex = Math.max(0, activeIndex);
  }

  private updateMaxAccessedIndexFromActiveStep() {
    if (!this.steps || this.steps.length === 0) {
      return;
    }

    const activeIndex = this.steps.findIndex((s) => s.id === this.activeStepId);
    if (activeIndex >= 0) {
      this.maxAccessedIndex = Math.max(this.maxAccessedIndex, activeIndex);
    }
  }

  private getActiveStepId(): string {
    // Se activeStepId foi fornecido, usa ele
    if (this.activeStepId) {
      return this.activeStepId;
    }

    // Caso contrário, usa o primeiro step como padrão
    return this.steps.length > 0 ? this.steps[0].id : '';
  }

  private handleStepClick(step: StepItem, index: number) {
    console.log('handleStepClick:', { stepId: step.id, index, maxAccessedIndex: this.maxAccessedIndex });

    // Só permite clique se não estiver desabilitado (índice maior que o máximo acessado)
    if (index > this.maxAccessedIndex) {
      return;
    }

    // Atualiza o maior índice acessado para o maior valor entre atual e o clicado
    this.maxAccessedIndex = Math.max(this.maxAccessedIndex, index);

    this.activeStepId = step.id;
    this.stepClick.emit({
      stepId: step.id,
      stepIndex: index,
      status: step.status,
      step: step,
    });
  }

  private renderDivider() {
    return <div class={`${COMPONENT_PREFIX}-divider`}></div>;
  }

  private renderStepIcon(step: StepItem) {
    if (step.status === 'done') {
      return (
        <mnt-icon
          icon="check"
          size="small"
          class={`${COMPONENT_PREFIX}-icon`}
        />
      );
    }

    if (step.icon !== undefined) {
      if (typeof step.icon === 'number') {
        return <span class={`${COMPONENT_PREFIX}-number`}>{step.icon}</span>;
      }

      return (
        <mnt-icon
          icon={step.icon}
          size="small"
          class={`${COMPONENT_PREFIX}-icon`}
        />
      );
    }

    return null;
  }

  private renderStep(step: StepItem, index: number) {
    const currentActiveId = this.getActiveStepId();
    const activeIndex = this.steps.findIndex((s) => s.id === currentActiveId);
    const isActive = activeIndex === index;
    const isDisabled = index > this.maxAccessedIndex; // Desabilita steps futuros (índice maior que o máximo acessado)

    let stepClass = `${COMPONENT_PREFIX}-item`;

    if (isActive) {
      stepClass += ` ${COMPONENT_PREFIX}-item-active`;
    } else if (isDisabled) {
      stepClass += ` ${COMPONENT_PREFIX}-item-disabled`;
    } else if (step.status === 'done') {
      stepClass += ` ${COMPONENT_PREFIX}-item-done`;
    }

    return (
      <button
        class={stepClass}
        key={`step-${index}`}
        onClick={() => this.handleStepClick(step, index)}
        disabled={isDisabled}
        aria-label={`Ir para ${step.label}`}
      >
        <div class={`${COMPONENT_PREFIX}-index`}>{this.renderStepIcon(step)}</div>
        <span class={`${COMPONENT_PREFIX}-label`}>{step.label}</span>
      </button>
    );
  }

  get containerClass(): string {
    return `${COMPONENT_PREFIX}-container ${COMPONENT_PREFIX}-${this.orientation}`;
  }

  // Métodos públicos para controle externo
  nextStep(): boolean {
    const currentIndex = this.steps.findIndex((s) => s.id === this.activeStepId);
    if (currentIndex < this.steps.length - 1) {
      // Atualiza o status do step atual para "done"
      this.steps[currentIndex].status = 'done';
      // Avança para o próximo step
      const nextStep = this.steps[currentIndex + 1];
      this.activeStepId = nextStep.id;

      return true; // Indica que conseguiu avançar
    }
    return false; // Indica que já está no último step
  }

  previousStep(): boolean {
    const currentIndex = this.steps.findIndex((s) => s.id === this.activeStepId);
    if (currentIndex > 0) {
      const previousStep = this.steps[currentIndex - 1];
      this.activeStepId = previousStep.id;
      return true; // Indica que conseguiu voltar
    }
    return false; // Indica que já está no primeiro step
  }

  resetToFirstStep(): void {
    if (this.steps.length > 0) {
      // Reseta todos os steps para o estado inicial
      this.steps.forEach((step, index) => {
        if (index === 0) {
          step.status = 'active';
        } else {
          step.status = 'disabled';
        }
      });

      this.activeStepId = this.steps[0].id;
    }
  }

  goToStep(stepId: string): boolean {
    const stepExists = this.steps.some((s) => s.id === stepId);
    if (stepExists) {
      const targetIndex = this.steps.findIndex((s) => s.id === stepId);
      const currentIndex = this.steps.findIndex((s) => s.id === this.activeStepId);

      // Se está avançando (targetIndex > currentIndex), marca steps intermediários como done
      if (targetIndex > currentIndex) {
        for (let i = currentIndex; i < targetIndex; i++) {
          this.steps[i].status = 'done';
        }
      }

      this.activeStepId = stepId;
      return true;
    }
    return false; // Indica que o step não existe
  }

  getCurrentStepIndex(): number {
    return this.steps.findIndex((s) => s.id === this.activeStepId);
  }

  getCurrentStep(): StepItem | undefined {
    return this.steps.find((s) => s.id === this.activeStepId);
  }

  isFirstStep(): boolean {
    return this.getCurrentStepIndex() === 0;
  }

  isLastStep(): boolean {
    return this.getCurrentStepIndex() === this.steps.length - 1;
  }

  render() {
    if (!this.steps || this.steps.length === 0) {
      console.warn('[MANTRA] The "steps" property is required and should contain at least one step.');
      return null;
    }

    return (
      <Host data-max-accessed-index={this.maxAccessedIndex}>
        <div class={this.containerClass}>
          {this.steps.map((step, index) => (
            <Fragment>
              {this.renderStep(step, index)}
              {index < this.steps.length - 1 && this.renderDivider()}
            </Fragment>
          ))}
        </div>
      </Host>
    );
  }
}
