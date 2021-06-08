declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module "*.json" {
  const value: any;
  export const version: string;
  export default value;
}

declare module "*.css";
declare module "*.less";
declare module "*.png";
declare module '*.scss';
