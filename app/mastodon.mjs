import fetch from 'node-fetch';

/**
 * @param {string} access_token
 * @param {string} timeline
 * @param {string} host
 * @param {string} max_id
 * */
export function timeline(access_token, timeline, host, max_id) {
	// fetch the most recent posts in the user's home timeline
	// https://docs.joinmastodon.org/methods/timelines/#home
	const params = new URLSearchParams({ limit: '40' });
	if (max_id) {
		params.set('max_id', max_id);
	}
	console.debug('🌜', { params });
	return fetch(`https://${host}/api/v1/timelines/${timeline}?${params}`, {
		headers: { Authorization: `Bearer ${access_token}` },
		method: `GET`,
	});
}
