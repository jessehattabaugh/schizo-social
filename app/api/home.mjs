import { timeline } from '../mastodon.mjs';

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	try {
		const { session } = req;
		// todo: get a list of access_tokens
		const { access_token, host } = session;
		const { from } = req.query;
		// console.debug('🏠', { access_token, host, from });

		// todo: if there are any access_tokens, fetch from all of them
		if (access_token) {
			const data = await timeline(access_token, 'home', host, from);
			/** @type {{ [x: string]: import('../types').Status; }} */
			const _ = {};
			const statuses = data.reduce((_, status) => {
				_[status.id] = status;
				return _;
			}, _);
			// console.debug('🌞', statuses);
			return {
				json: { access_token, statuses },
			};
		} else {
			return {
				location: '/login',
			};
		}
	} catch (error) {
		console.error('☃️', { error });
		return {
			json: { error: error.message },
		};
	}
}
