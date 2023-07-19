import fetch from 'node-fetch';

/**
 * @param {string} access_token
 * @param {string} timeline
 * @param {string} host
 * @param {string} max_id
 */
export async function timeline(access_token, timeline, host, max_id) {
	// fetch the most recent posts in the user's home timeline
	// https://docs.joinmastodon.org/methods/timelines/#home
	const params = new URLSearchParams({ limit: '40' });
	if (max_id) {
		params.set('max_id', max_id);
	}
	console.debug('🌜', { params });
	const response = await fetch(`https://${host}/api/v1/timelines/${timeline}?${params}`, {
		headers: { Authorization: `Bearer ${access_token}` },
		method: `GET`,
	});
	if (response.ok) {
		/** @type {import('./types').TimelineResponse} */
		// @ts-ignore don't know how to tell typescript that json can return an array
		const data = await response.json();
		return data;
	} else {
		throw new Error(
			`could not fetch ${timeline} from ${host}: ${response.status} ${response.statusText}`,
		);
	}
}
