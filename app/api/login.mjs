import fetch from 'node-fetch';
import { name, scopes } from '../constants.mjs';

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	const { session } = req;
	console.debug('📤 api/login get() session', session);

	// get error and host from prior posts
	const { error, host, access_token } = req.session;

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

	// todo: load an already existing app for this host from a database or the session or something

	// create a new app on this host
	const website = `https://${name}`;
	const redirect_uri = `${website}/auth`;
	let client_id, client_secret, id, vapid_key;
	try {
			/** @type {import('../types').AppsResponse} */
		const location = `https://${host}/oauth/authorize?${params.toString()}`;
		// console.debug('📩 api/login post() location:', location);

		const session = { client_id, client_secret, host, id, vapid_key };
		// console.debug('💸 api/login post() session:', session);

		return { location, session };
	} catch (error) {
		console.error('⛔api/login post() returning error', error);
		return { json: { error, host, website, redirect_uri } };
	}
}
