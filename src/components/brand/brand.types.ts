import { BRANDS } from './brand-base';

export type BrandProps = {
  name: keyof typeof BRANDS;
  height?: number;
  color?: string;
};
