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
}
/// <reference types="react" />
/// <reference types="react-dom" />
