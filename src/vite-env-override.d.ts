import "react";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "m3e-theme": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        mode?: string;
        seed?: string;
      };
    }
  }
}declare module "*.md" {
  export const html: string;
  export const markdown: string;
}
