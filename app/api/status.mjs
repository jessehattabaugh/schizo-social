import { applyTheme, redirectToLogin } from '../middleware.mjs';

/** @type {import('@enhance/types').EnhanceApiFn} */
async function fetchStatus(req) {
	try {
		const { session, query } = req;
		const { authIndex, id } = query;

		/** @type {import('../types').Authorizations} */
		const authorizations = session.authorizations || [];
		// console.debug('🐛', { authorizations, id });
		const auth = authorizations[parseInt(authIndex)];
		const { access_token, host } = auth;

		/** @see https://docs.joinmastodon.org/methods/statuses/#get */
		const response = await fetch(`https://${host}/api/v1/statuses/${id}`, {
			headers: { Authorization: `Bearer ${access_token}` },
			method: `GET`,
		});

		/** @type {import('../types').Status} */
		const details = await response.json();
		details.authorizations = [auth];
		// console.debug('🦋 status:get()', { auth, details });
		return { json: { authorizations, details } };
	} catch (error) {
		console.error('🐞 status:get()', { error });
		return { json: { error: error.message } };
	}
}

export const get = [applyTheme, redirectToLogin, fetchStatus];
