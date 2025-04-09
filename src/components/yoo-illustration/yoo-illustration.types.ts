import { ILLUSTRATIONS } from './yoo-illustration-base';

export type IllustrationProps = {
  name: keyof typeof ILLUSTRATIONS;
  width: number;
  height: number;
};
