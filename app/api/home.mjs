import { getStatuses } from '../mastodon.mjs';

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	try {
		const { session } = req;
		/** @type {import('../types').Authorizations} */
		const authorizations = session.authorizations || [];
		const { from } = req.query;
		console.debug('🏠', { authorizations, from });
		if (authorizations) {
			const { statuses, statusIds } = await getStatuses(authorizations, 'home', from);
			return { json: { authorizations, statuses, statusIds } };
		} else {
			return { location: '/login' };
		}
	} catch (error) {
		console.error('☃️', { error });
		return { json: { error: error.message } };
	}
}
