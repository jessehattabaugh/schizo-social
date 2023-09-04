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
	// console.debug('📮 handleMessage', { data, type });
	switch (type) {
		case 'INIT':
			console.debug('🍇 initialize the store', { data, store });
			store.initialize(data);
			break;
		case 'NEXT':
			console.debug('🍌 appending older statuses to the store', { data, store });
			store.statusIds.push(...data.statusIds);
			break;
		case 'PREV':
			console.debug('🍎 prepending newer statuses to the store', { data, store });
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
	}

	/**
	 * @param {import("@enhance/types").EnhanceElemArg} args
	 */
	render(args) {
		console.debug('🦤 CustomTimeline rendering', { args });
		return render(args);
	}

	connectedCallback() {
		/** update the DOM when the store updates */
		store.subscribe(this.process);

		this.querySelector('#prevLink').addEventListener(
			'click',
			(/** @type {{ preventDefault: () => void; }} */ event) => {
				event.preventDefault();
				fetcher.postMessage({ type: 'PREV' });
				console.debug('⬆️ requested the previous page from fetcher', { event });
			},
		);
		this.querySelector('#nextLink').addEventListener(
			'click',
			(/** @type {{ preventDefault: () => void; }} */ event) => {
				event.preventDefault();
				fetcher.postMessage({ type: 'NEXT' });
				console.debug('⬇️ requested the next page from fetcher', { event });
			},
		);
	}

	disconnectedCallback() {
		store.unsubscribe(this.process);
		fetcher.removeEventListener('message', handleFetcherMessage);
	}
}

// @ts-ignore 'CustomTimeline' is missing properties from type 'HTMLElement'
customElements.define('ss-timeline', CustomTimeline);

console.debug('🐇 timeline.mjs evaluated');
