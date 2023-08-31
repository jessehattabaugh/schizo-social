import EnhanceCustomElement from '@enhance/custom-element';

import renderTimeline from '../elements/ss-timeline.mjs';

class CustomTimeline extends EnhanceCustomElement {
	constructor() {
		super();
		this.render = renderTimeline;
	}
}

// @ts-ignore 'CustomTimeline' is missing properties from type 'HTMLElement'
customElements.define('ss-timeline', CustomTimeline);
