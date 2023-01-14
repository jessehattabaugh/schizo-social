import { timeline } from '../mastodon.mjs';

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	const { session } = req;
	const { access_token, host } = session;
	console.debug('📢', { access_token, host });

	if (access_token) {
		const response = await timeline(access_token, 'public', host);
		if (response.ok) {
			const statuses = await response.json();
			//console.debug('🌞', statuses);
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
