import { timeline } from '../mastodon.mjs';

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	const { session } = req;
	const { access_token, host } = session;
	const { from } = req.query;
	console.debug('📢', { access_token, host, from });

	if (access_token) {
		const response = await timeline(access_token, 'public', host, from);
		if (response.ok) {
			const data = await response.json();

			// @ts-ignore
			const statuses = data.reduce(
				(
					/** @type {{ [x: string]: any; }} */ _,
					/** @type {{ id: string | number; }} */ status,
				) => {
					_[status.id] = status;
					return _;
				},
				{},
			);
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
