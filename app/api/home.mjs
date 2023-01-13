import fetch from 'node-fetch';

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	const { session } = req;
	const { access_token, host } = session;
	console.debug('👤', { access_token });

	if (access_token) {
		// fetch the most recent posts in the user's home timeline
		// https://docs.joinmastodon.org/methods/timelines/#home
		const params = new URLSearchParams({ limit: '20' });
		console.debug('🌜', { params });
		const response = await fetch(`https://${host}/api/v1/timelines/home?${params}`, {
			headers: { Authorization: `Bearer ${access_token}` },
			method: `GET`,
		});

		if (response.ok) {
			const statuses = await response.json();
			console.debug('🌞', statuses);
			return {
				json: { access_token, statuses },
			};
		} else {
			const { status, statusText } = response;
			console.error('☃️', { status, statusText });
			return {
				json: { error: `${status}: ${statusText}` },
			};
		}
	} else {
		return {
			location: '/login',
		};
	}
}
