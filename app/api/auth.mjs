import fetch from 'node-fetch';
import { redirect_uri, scope } from '../constants.mjs';

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	const { session } = req;
	const { host, client_id, client_secret } = session;
	let { access_token } = session;
	const { code } = req.query;
	// console.debug('🔑 GET /auth', { code, host, client_id, client_secret });

	if (code && host && client_id && client_secret) {
		// get a token
		// https://docs.joinmastodon.org/methods/oauth/#token

		try {
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
			if (response.ok) {
				({ access_token } = data);
			} else {
				const { status, statusText } = response;
				const { error, error_description } = data;
				console.error('🍉', {
					client_id,
					client_secret,
					code,
					error,
					error_description,
					status,
					statusText,
				});
				throw new Error('could not get token');
			}
		} catch (error) {
			console.error('🍓', error);
		}
		// console.debug('🍏', { access_token });
	}

	if (access_token) {
		// Confirm that the app’s OAuth2 credentials work.
		// https://docs.joinmastodon.org/methods/apps/#verify_credentials

		var vapid_key;
		try {
			const response = await fetch(`https://${host}/api/v1/apps/verify_credentials`, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
			/** @type {import('../types').VerifyResponse} */
			const data = await response.json();
			({ vapid_key } = data);
		} catch (error) {
			console.error('🍅', error);
		}
		// console.debug('🍇', { vapid_key });
	}

	if (access_token && vapid_key) {
		return {
			// json: { access_token, code, vapid_key },
			location: '/home',
			session: { access_token, ...session },
		};
	} else {
		return {
			location: '/login',
			session: { error: 'access token unverified', ...session },
		};
	}
}
