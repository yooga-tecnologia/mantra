/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import { ButtonProps } from './components/yoo-button/yoo-button.types';
import { IconProps } from './components/yoo-icon/yoo-icon.types';
import { IllustrationProps } from './components/yoo-illustration/yoo-illustration.types';
export { ButtonProps } from './components/yoo-button/yoo-button.types';
export { IconProps } from './components/yoo-icon/yoo-icon.types';
export { IllustrationProps } from './components/yoo-illustration/yoo-illustration.types';
export namespace Components {
  interface YooButton {
    color: ButtonProps['color'];
    disabled: ButtonProps['disabled'];
    fullWidth: ButtonProps['fullWidth'];
    iconAnimation?: ButtonProps['iconAnimation'];
    iconLeft?: ButtonProps['iconLeft'];
    iconRight?: ButtonProps['iconRight'];
    label?: ButtonProps['label'];
    size: ButtonProps['size'];
    variant: ButtonProps['variant'];
  }
  interface YooIcon {
    animation?: IconProps['animation'];
    background?: IconProps['background'];
    color: IconProps['color'];
    icon: IconProps['icon'];
    size: IconProps['size'];
  }
  interface YooIllustration {
    height: IllustrationProps['height'];
    name: IllustrationProps['name'];
    width: IllustrationProps['width'];
  }
  interface YooInputGroup {
    condition: boolean;
    inputName: string;
    isRequired: boolean;
    label: string;
    placeholder?: string;
    trailingIcon: boolean;
  }
}
declare global {
  interface HTMLYooButtonElement extends Components.YooButton, HTMLStencilElement {}
  var HTMLYooButtonElement: {
    prototype: HTMLYooButtonElement;
    new (): HTMLYooButtonElement;
  };
  interface HTMLYooIconElement extends Components.YooIcon, HTMLStencilElement {}
  var HTMLYooIconElement: {
    prototype: HTMLYooIconElement;
    new (): HTMLYooIconElement;
  };
  interface HTMLYooIllustrationElement extends Components.YooIllustration, HTMLStencilElement {}
  var HTMLYooIllustrationElement: {
    prototype: HTMLYooIllustrationElement;
    new (): HTMLYooIllustrationElement;
  };
  interface HTMLYooInputGroupElement extends Components.YooInputGroup, HTMLStencilElement {}
  var HTMLYooInputGroupElement: {
    prototype: HTMLYooInputGroupElement;
    new (): HTMLYooInputGroupElement;
  };
  interface HTMLElementTagNameMap {
    'yoo-button': HTMLYooButtonElement;
    'yoo-icon': HTMLYooIconElement;
    'yoo-illustration': HTMLYooIllustrationElement;
    'yoo-input-group': HTMLYooInputGroupElement;
  }
}
declare namespace LocalJSX {
  interface YooButton {
    color?: ButtonProps['color'];
    disabled?: ButtonProps['disabled'];
    fullWidth?: ButtonProps['fullWidth'];
    iconAnimation?: ButtonProps['iconAnimation'];
    iconLeft?: ButtonProps['iconLeft'];
    iconRight?: ButtonProps['iconRight'];
    label?: ButtonProps['label'];
    size?: ButtonProps['size'];
    variant?: ButtonProps['variant'];
  }
  interface YooIcon {
    animation?: IconProps['animation'];
    background?: IconProps['background'];
    color?: IconProps['color'];
    icon: IconProps['icon'];
    size?: IconProps['size'];
  }
  interface YooIllustration {
    height?: IllustrationProps['height'];
    name: IllustrationProps['name'];
    width?: IllustrationProps['width'];
  }
  interface YooInputGroup {
    condition?: boolean;
    inputName?: string;
    isRequired?: boolean;
    label?: string;
    placeholder?: string;
    trailingIcon?: boolean;
  }
  interface IntrinsicElements {
    'yoo-button': YooButton;
    'yoo-icon': YooIcon;
    'yoo-illustration': YooIllustration;
    'yoo-input-group': YooInputGroup;
  }
}
export { LocalJSX as JSX };
declare module '@stencil/core' {
  export namespace JSX {
    interface IntrinsicElements {
      'yoo-button': LocalJSX.YooButton & JSXBase.HTMLAttributes<HTMLYooButtonElement>;
      'yoo-icon': LocalJSX.YooIcon & JSXBase.HTMLAttributes<HTMLYooIconElement>;
      'yoo-illustration': LocalJSX.YooIllustration & JSXBase.HTMLAttributes<HTMLYooIllustrationElement>;
      'yoo-input-group': LocalJSX.YooInputGroup & JSXBase.HTMLAttributes<HTMLYooInputGroupElement>;
    }
  }
}
