import { Component, Prop, State, h, Watch, Element, Host, JSX } from '@stencil/core';

import { YOOGA_ICON_PATH } from '../brand/brand-base';
import {
  YOOGA_ORB_BLOOM_DURATION_MS,
  YOOGA_ORB_CONNECTIONS,
  YOOGA_ORB_MASK_RADIUS_PAD,
  YOOGA_ORB_MOLECULES,
  YoogaOrbProps,
  YoogaOrbState,
  yoogaOrbDefaultLabels,
  yoogaOrbSizes,
} from './yooga-orb.types';

const COMPONENT_PREFIX = 'mnt-yooga-orb';

let instanceCounter = 0;

@Component({
  tag: 'mnt-yooga-orb',
  styleUrl: 'yooga-orb.scss',
  shadow: false,
})
export class YoogaOrb {
  @Element() el!: HTMLElement;

  @Prop() state: YoogaOrbState = 'idle';
  @Prop() size: YoogaOrbProps['size'] = 'sm';
  @Prop() bloom: boolean = false;
  @Prop() decorative: boolean = false;
  @Prop() label?: YoogaOrbProps['label'];

  @State() isBlooming = false;

  private readonly instanceId = `${COMPONENT_PREFIX}-${++instanceCounter}`;
  private bloomTimer?: ReturnType<typeof setTimeout>;

  componentWillLoad() {
    if (this.bloom) {
      this.startBloom();
    }
  }

  disconnectedCallback() {
    clearTimeout(this.bloomTimer);
  }

  @Watch('state')
  watchState(newState: YoogaOrbState, oldState: YoogaOrbState) {
    if (oldState === 'thinking' && newState === 'settled') {
      this.startBloom();
    }
  }

  @Watch('bloom')
  watchBloom(isActive: boolean, wasActive: boolean) {
    if (isActive && !wasActive) {
      this.startBloom();
    }
  }

  private startBloom(): void {
    clearTimeout(this.bloomTimer);
    this.isBlooming = true;
    this.bloomTimer = setTimeout(() => {
      this.isBlooming = false;
    }, YOOGA_ORB_BLOOM_DURATION_MS);
  }

  private getSizeInPx(): string {
    const numericSize = Number(this.size);
    if (!isNaN(numericSize) && numericSize > 0) {
      return `${numericSize}px`;
    }

    return `${yoogaOrbSizes[this.size as keyof typeof yoogaOrbSizes] ?? yoogaOrbSizes.sm}px`;
  }

  private getHostA11yAttributes(): Record<string, string> {
    if (this.decorative) {
      return { 'aria-hidden': 'true' };
    }

    const defaultLabel = yoogaOrbDefaultLabels[this.state] ?? yoogaOrbDefaultLabels.idle;
    return { 'role': 'img', 'aria-label': this.label ?? defaultLabel };
  }

  private renderMask(maskId: string): JSX.Element {
    return (
      <mask
        id={maskId}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="32"
      >
        {YOOGA_ORB_CONNECTIONS.map((d, index) => (
          <path
            class={`${COMPONENT_PREFIX}-link ${COMPONENT_PREFIX}-link-${index + 1}`}
            d={d}
            pathLength={1}
          />
        ))}
        {YOOGA_ORB_MOLECULES.map(({ key, cx, cy, r }) => (
          <circle
            class={`${COMPONENT_PREFIX}-core ${COMPONENT_PREFIX}-core-${key}`}
            cx={cx}
            cy={cy}
            r={r + YOOGA_ORB_MASK_RADIUS_PAD}
          />
        ))}
      </mask>
    );
  }

  render(): JSX.Element {
    const sizeInPx = this.getSizeInPx();
    const maskId = `${this.instanceId}-mask`;
    const gradientId = `${this.instanceId}-gradient`;
    const gradientFill = `url(#${gradientId})`;

    return (
      <Host
        data-state={this.state}
        {...this.getHostA11yAttributes()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width={sizeInPx}
          height={sizeInPx}
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="5"
              y1="3"
              x2="27"
              y2="29"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                class={`${COMPONENT_PREFIX}-stop-start`}
                offset="0"
              />
              <stop
                class={`${COMPONENT_PREFIX}-stop-middle`}
                offset="0.45"
              />
              <stop
                class={`${COMPONENT_PREFIX}-stop-end`}
                offset="1"
              />
            </linearGradient>
            {this.renderMask(maskId)}
          </defs>

          {this.state === 'thinking' && (
            <path
              class={`${COMPONENT_PREFIX}-halo`}
              d={YOOGA_ICON_PATH}
              fill={gradientFill}
            />
          )}
          <path
            class={`${COMPONENT_PREFIX}-base`}
            d={YOOGA_ICON_PATH}
            fill={gradientFill}
          />
          <path
            class={`${COMPONENT_PREFIX}-lit`}
            d={YOOGA_ICON_PATH}
            fill={gradientFill}
            mask={`url(#${maskId})`}
          />
          {this.isBlooming && (
            <path
              class={`${COMPONENT_PREFIX}-bloom`}
              d={YOOGA_ICON_PATH}
            />
          )}
        </svg>
      </Host>
    );
  }
}
