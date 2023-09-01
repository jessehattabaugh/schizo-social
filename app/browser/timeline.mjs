import EnhanceCustomElement from '@enhance/custom-element';
import MicromorphMixin from '@enhance/micromorph-mixin';
import Store from '@enhance/store';

import render from '../elements/ss-timeline.mjs';

const store = Store();

/**
 * @param {{ data: any; }} event
 */
function handleFetcherMessage(event) {
	const { data } = event;
	const { type } = data;
	console.debug('📮 handleMessage', { data, type });
	switch (type) {
		case 'INIT':
			console.debug('🍇 initialize the store', { data, store });
			store.initialize(data);
			break;
		case 'NEXT':
			console.debug('🍌 appending older statuses to the store', { data, store });
			store.statuses.push(...data.statuses);
			store.statusIds.push(...data.statusIds);
			break;
		case 'PREV':
			console.debug('🍎 prepending newer statuses to the store', { data, store });
			store.statuses.unshift(...data.statuses);
			store.statusIds.unshift(...data.statusIds);
			break;
	}
}

const fetcher = new Worker('/_public/browser/fetcher.mjs');
fetcher.addEventListener('message', handleFetcherMessage);

/** initialize the store with data from the api */
fetcher.postMessage({ type: 'INIT' });
// @todo pass the initial store data in the page so a second network request isn't needed


class CustomTimeline extends MicromorphMixin(EnhanceCustomElement) {
	constructor() {
		super();
		/** update the DOM when the store updates */
		store.subscribe(this.process);
	}

	/**
	 * @param {import("@enhance/types").EnhanceElemArg} args
	 */
	render(args) {
		console.debug('🦤 CustomTimeline rendering', { args });
		return render(args);
	}

	disconnectedCallback() {
		store.unsubscribe(this.process);
		fetcher.removeEventListener('message', handleFetcherMessage);
	}
}

// @ts-ignore 'CustomTimeline' is missing properties from type 'HTMLElement'
customElements.define('ss-timeline', CustomTimeline);

console.debug('🐇 timeline.mjs evaluated');
