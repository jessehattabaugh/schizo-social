import fetch from 'node-fetch';
import { name, scopes } from '../constants.mjs';
const redirect_uri = `https://${name}/auth`;

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	const { session } = req;
	const { host, client_id, client_secret } = session;
	let { access_token } = session;
	const { code } = req.query;
	console.debug('🔑 GET /auth', { code, host, client_id, client_secret });

	if (code && host && client_id && client_secret) {
		// get a token
		// https://docs.joinmastodon.org/methods/oauth/#token

		try {
			const body = new URLSearchParams();
			body.set('client_id', client_id);
			body.set('client_secret', client_secret);
			body.set('code', code);
			body.set('grant_type', 'authorization_code');
			body.set('redirect_uri', redirect_uri);
			body.set('scope', scopes);
			console.debug('🍑', { body });
			const response = await fetch(`https://${host}/oauth/token`, { method: `POST`, body });
			/**
			 * @typedef {Object} TokenResponse
			 * @property {string} [access_token]
			 * @property {string} [error]
			 * @property {string} [error_description]
			 */
			/** @type {TokenResponse} */
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
		console.debug('🍏', { access_token });
	}

	if (access_token) {
		// Confirm that the app’s OAuth2 credentials work.
		// https://docs.joinmastodon.org/methods/apps/#verify_credentials

		var vapid_key, name, website;
		try {
			const response = await fetch(`https://${host}/api/v1/apps/verify_credentials`, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			});
			/**
			 * @typedef {Object} VerifyResponse
			 * @property {string} [name]
			 * @property {string} [website]
			 * @property {string} [vapid_key]
			 */
			/** @type {VerifyResponse} */
			const data = await response.json();
			({ name, website, vapid_key } = data);
		} catch (error) {
			console.error('🍅', error);
		}
		console.debug('🍇', { vapid_key, name, website });
	}

	if (access_token && vapid_key) {
		return {
			json: { access_token, code, vapid_key, name, website },
			session: { access_token, ...session },
		};
	} else {
		return {
			location: '/login',
			session: { error: 'access token unverified', ...session },
		};
	}
}
