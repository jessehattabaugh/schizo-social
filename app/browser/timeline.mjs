import EnhanceCustomElement from '@enhance/custom-element';
import MicromorphMixin from '@enhance/micromorph-mixin';
import Store from '@enhance/store';

import renderTimeline from '../elements/ss-timeline.mjs';

const timelineStore = Store();
class CustomTimeline extends MicromorphMixin(EnhanceCustomElement) {
	constructor() {
		super();

		/** update the DOM when the store updates */
		timelineStore.subscribe(this.process);

	}

	/**
	 * @param {import("@enhance/types").EnhanceElemArg} args
	 */
	render(args) {
		console.debug('🦤 CustomTimeline rendering', { args });
		return renderTimeline(args);
	}

	disconnectedCallback() {
		timelineStore.unsubscribe(this.process);
	}
}

// @ts-ignore 'CustomTimeline' is missing properties from type 'HTMLElement'
customElements.define('ss-timeline', CustomTimeline);

console.debug('🐇 timeline.mjs evaluated');
