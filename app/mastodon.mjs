import fetch from 'node-fetch';
/** @todo use node-fetch-cache */
/** @see https://www.npmjs.com/package/node-fetch-cache */

/** fetch the most recent posts in the user's home timeline
 * @see https://docs.joinmastodon.org/methods/timelines/#home
 * @param {string} access_token
 * @param {string} host
 * @param {string} timeline
 * @param {string} max_id
 */
export async function fetchTimeline(access_token, host, timeline, max_id) {
	const params = new URLSearchParams({ limit: '40' });
	if (max_id) params.set('max_id', max_id);
	console.debug('🌜', { params });
	const response = await fetch(`https://${host}/api/v1/timelines/${timeline}?${params}`, {
		headers: { Authorization: `Bearer ${access_token}` },
		method: `GET`,
	});
	if (response.ok) {
		/** type jackassery due to Typescript/node-fetch's broken types
		 * @see https://github.com/node-fetch/node-fetch/issues/1262
		 * @type {Promise<any>} */
		const promise = response.json();
		/** @type {Promise<import('./types').Statuses>} */
		const Promise = promise;
		return Promise;
	} else {
		throw new Error(
			`could not fetch ${timeline} from ${host}: ${response.status} ${response.statusText}`,
		);
	}
}

/** fetches all the timelines for the user's authorizations and merges them in date order
 * @see https://docs.joinmastodon.org/methods/timelines/#home
 * @param {import('./types').Authorizations} authorizations
 * @param {string} timeline
 * @param {string} from
 * @returns {Promise<{ statuses: import('./types').StatusMap, statusIds: import('./types').StatusIds }>}
 */
export async function getStatuses(authorizations, timeline, from) {
	const promises = authorizations.map(({ access_token, host }) => {
		const request = fetchTimeline(access_token, host, timeline, from);
		return { access_token, request };
	});
	const responses = await Promise.all(promises.map(({ request }) => request));
	/** @type {import('./types').StatusMap} */
	const statuses = {};
	/** @type {import('./types').StatusIds} */
	const statusIds = [];
	for (let i = 0, n = promises.length; i < n; i++) {
		const { access_token } = promises[i];
		const auth = authorizations.find((auth) => auth.access_token === access_token);
		const response = responses[i];
		/** @todo handle error responses */
		for (const status of response)
			if (statusIds.includes(status.id)) {
				statuses[status.id].authorizations.push(auth);
			} else {
				status.authorizations = [auth];
				status.created_ms = new Date(status.created_at).valueOf();
				statuses[status.id] = status;
				// insert index in sorted order
				const index = statusIds.findIndex(
					(id) => statuses[id].created_ms < status.created_ms,
				);
				if (index === -1) statusIds.push(status.id);
				else statusIds.splice(index, 0, status.id);
			}
	}
	return { statuses, statusIds };
}
