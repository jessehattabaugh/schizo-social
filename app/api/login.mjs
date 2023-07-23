import arc from '@architect/functions';
import fetch from 'node-fetch';

import { client_name, redirect_uri, scope, website } from '../constants.mjs';
const db = await arc.tables();

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	// handle errors from previous login attempts
	const { error, host } = req.session;
	return { json: { error, host } };
}

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function post(req) {
	const { host } = req.body;
	try {
		// first try to load an existing app from the db
		let app = await db.apps.get({ host });
		// console.debug('🐸', { app, host });
		// TODO: test the app to make sure it's still valid, delete it if not
		if (!app) {
			// create a new app for this host
			const body = new URLSearchParams({
				client_name,
				redirect_uris: redirect_uri,
				scopes: scope,
				website,
			});
			const response = await fetch(`https://${host}/api/v1/apps`, { method: 'POST', body });
			if (response.ok) {
				/** @type {import('../types').AppsResponse} */
				const data = await response.json();
				// console.debug('💎 api/login post() fetch success:', data);
				app = { host, ...data };
				await db.apps.put(app);
			} else {
				console.error('🍅 api/login post() fetch failure');
				throw new Error(`Request failed: ${response.status} ${response.statusText}`);
			}
		}
		const { client_id } = app;
		const params = new URLSearchParams({
			client_id,
			redirect_uri,
			response_type: 'code',
			scope,
		});
		const location = `https://${host}/oauth/authorize?${params.toString()}`;
		const session = { ...req.session, ...app };
		// console.debug('💸 api/login post() session:', { location, session });
		return { location, session };
	} catch (error) {
		console.error('⛔api/login post() returning error', error);
		return { json: { error, host, website, redirect_uri } };
	}
}
