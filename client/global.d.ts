declare module '*.module.scss' {
  interface IClassName {
    [className: string]: string
  }

  const classNames: IClassName;
  export = classNames
}

declare module "*.png";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.svg" {
  import React from "react";
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}