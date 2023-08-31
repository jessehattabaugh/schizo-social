import EnhanceCustomElement from '@enhance/custom-element';
import MicromorphMixin from '@enhance/micromorph-mixin';

import renderTimeline from '../elements/ss-timeline.mjs';

class CustomTimeline extends MicromorphMixin(EnhanceCustomElement) {
	constructor() {
		super();
	}

	/**
	 * @param {import("@enhance/types").EnhanceElemArg} args
	 */
	render(args) {
		console.debug('🦤 CustomTimeline rendering', { args });
		return renderTimeline(args);
	}

	static get observedAttributes() {
		return ['test'];
	}
}

// @ts-ignore 'CustomTimeline' is missing properties from type 'HTMLElement'
customElements.define('ss-timeline', CustomTimeline);

console.debug('🐇 timeline.mjs evaluated');
