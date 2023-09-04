const getJSONOpts = {
	credentials: 'same-origin',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	method: 'GET',
};

self.onmessage = async (event) => {
	// console.debug('🌴 handleMessage', { event });
	const { data } = event;
	const { type } = data;
	switch (type) {
		case 'INIT':
			console.debug('🍔 fetcher init', { data, event });
			try {
				// @ts-ignore No overload matches this call.
				const response = await fetch('/timelines/home', getJSONOpts);
				const data = await response.json();
				console.debug('🍋 timeline fetch response', { data });
				self.postMessage({ type: 'INIT', data });
			} catch (error) {
				console.error('🐒👇next case failed', { error });
			}
			break;
		case 'NEXT':
			console.debug('🍗 fetcher next', { data, event });
			try {
				// @ts-ignore No overload matches this call.
				const response = await fetch('/timelines/home', getJSONOpts);
				const data = await response.json();
				self.postMessage({ type: 'NEXT', data });
			} catch (error) {
				console.error('🐒👇next case failed', { error });
			}
			break;
		case 'PREV':
			console.debug('🍣 fetcher prev', { data, event });
			try {
				// @ts-ignore No overload matches this call.
				const response = await fetch('/timelines/home', getJSONOpts);
				const data = await response.json();
				self.postMessage({ type: 'PREV', data });
			} catch (error) {
				console.error('🪱👆 prev case failed', { error });
			}
			break;
	}
};
