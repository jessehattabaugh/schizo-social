import fetch from 'node-fetch';
import { redirect_uri, scope } from '../constants.mjs';

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(request) {
	const { session } = request;
	/** @type {import('../types').Authorizations} */
	const authorizations = session.authorizations || [];
	try {
		const { code } = request.query;
		const { client_id, client_secret, host, ...remainingSession } = session;
		// console.debug('🥒 GET /settings', { client_id, client_secret, code, host });
		if (client_id && client_secret && code && host) {
			/** get a token
			 * @see https://docs.joinmastodon.org/methods/oauth/#token */
			const body = new URLSearchParams({
				client_id,
				client_secret,
				code,
				grant_type: 'authorization_code',
				redirect_uri,
				scope,
			});
			const response = await fetch(`https://${host}/oauth/token`, { method: `POST`, body });
			/** @type {import('../types').TokenResponse} */
			const data = await response.json();
			// console.debug('🍑 token response', { body, data });
			const { access_token } = data;
			if (access_token) {
				/** confirm that the access_token works.
				 * @see https://docs.joinmastodon.org/methods/apps/#verify_credentials */
				const response = await fetch(`https://${host}/api/v1/apps/verify_credentials`, {
					headers: { Authorization: `Bearer ${access_token}` },
				});
				/** @type {import('../types').VerifyResponse} */
				const data = await response.json();
				// console.debug('🍇 verify response', { data });
				const { vapid_key } = data;
				if (vapid_key) {
					const priorAuth = authorizations.find(
						(auth) => auth.access_token === access_token,
					);
					if (!priorAuth) authorizations.push({ access_token, host });
					// console.debug('🍈 login success!', { authorizations });
				} else {
					const { status, statusText } = response;
					const { error } = data;
					console.error('🍒 verify failure', { error, status, statusText });
					throw new Error('could not verify token');
				}
			} else {
				const { status, statusText } = response;
				const { error, error_description } = data;
				console.error('🍉 token failure', { error, error_description, status, statusText });
				throw new Error('could not get token');
			}
		}
		return {
			session: { ...remainingSession, authorizations },
		};
	} catch (error) {
		console.error('🍅', { error });
		return {
			location: '/login',
			session: { ...session, error: 'authorization failed' },
		};
	}
}
