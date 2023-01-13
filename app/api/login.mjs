import fetch from 'node-fetch';
import { name, scopes } from '../constants.mjs';

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	const { session } = req;

	// get error and host from prior posts
	const { error, host, access_token } = session;
	console.debug('📤', { error, host, access_token });

	if (access_token) {
		return {
			location: '/home',
		};
	} else {
		return {
			json: { error, host },
			// reset the session
			session: {},
		};
	}

}

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function post(req) {
	const { host } = req.body;

	// https://docs.joinmastodon.org/client/token/

	// load an already existing client id for this host
	// from a database or the session or something

	// create a new app on this host
	const website = `https://${name}`;
	const redirect_uri = `${website}/auth`;
	var client_id, client_secret, id, vapid_key;
	try {
		const body = new URLSearchParams();
		body.set('client_name', name);
		body.set('redirect_uris', redirect_uri);
		body.set('scopes', scopes);
		body.set('website', website);
		const response = await fetch(`https://${host}/api/v1/apps`, { method: 'POST', body });
		/**
		 * @typedef {Object} AppsResponse
		 * @property {string} [client_id]
		 * @property {string} [client_secret]
		 * @property {string} [id]
		 * @property {string} [vapid_key]
		 */
		/** @type {AppsResponse} */
		const data = await response.json();
		if (response.ok) {
			console.debug('💎', data);
			({ client_id, client_secret, id, vapid_key } = data);
		} else {
			console.error('🍅', data);
			throw new Error(`Request failed: ${response.status} ${response.statusText}`);
		}
	} catch (error) {
		console.error('⛔', error);
	}
	console.debug('💸', { client_id, client_secret, id, vapid_key });

	const params = new URLSearchParams();
	params.set('client_id', client_id);
	params.set('redirect_uri', redirect_uri);
	params.set('response_type', 'code');
	params.set('scope', scopes);
	console.debug('📩', { host, params });
	return {
		location: `https://${host}/oauth/authorize?${params.toString()}`,
		session: { client_id, client_secret, host, id, vapid_key },
	};
}
