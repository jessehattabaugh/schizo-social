import { isAuthorized } from '../../middleware.mjs';
import fetch from 'node-fetch';
/** @todo use node-fetch-cache */
/** @see https://www.npmjs.com/package/node-fetch-cache */

/** fetch the most recent posts in the user's home timeline
 * @see https://docs.joinmastodon.org/methods/timelines/#home
 * @param {string} access_token
 * @param {string} host
 * @param {string} timeline
 * @param {string} max_id
 * @param {string} min_id
 */
export async function fetchTimeline(access_token, host, timeline, max_id, min_id) {
	const params = new URLSearchParams({ limit: '40' });
	if (max_id) params.append('max_id', max_id);
	if (min_id) params.append('min_id', min_id);
	console.debug('🌜fetchTimeline:', { params });
	const response = await fetch(`https://${host}/api/v1/timelines/${timeline}?${params}`, {
		headers: { Authorization: `Bearer ${access_token}` },
		method: `GET`,
	});
	if (response.ok) {
		/** type jackassery due to Typescript/node-fetch's broken types
		 * @see https://github.com/node-fetch/node-fetch/issues/1262
		 * @type {Promise<any>} */
		const promise = response.json();
		/** @type {Promise<import('../../types').Statuses>} */
		const Promise = promise;
		return Promise;
	} else {
		throw new Error(
			`could not fetch ${timeline} from ${host}: ${response.status} ${response.statusText}`,
		);
	}
}

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function fetchAllTimelines(req) {
	const { timeline } = req.params;
	try {
		const { session } = req;

		/** @type {import('../../types').Authorizations} */
		const authorizations = session.authorizations || [];

		const _nextIds = req.query?.nextIds?.split(',');
		const _prevIds = req.query?.prevIds?.split(',');
		console.debug('🏠fetchAllTimelines', { authorizations, _nextIds, _prevIds });

		const promises = authorizations.map(({ access_token, host }, i) => {
			const request = fetchTimeline(
				access_token,
				host,
				timeline,
				_nextIds?.[i],
				_prevIds?.[i],
			);
			return { access_token, request };
		});
		const responses = await Promise.all(promises.map(({ request }) => request));

		/** @type {import('../../types').StatusMap} */
		const statuses = {};

		/** @type {import('../../types').StatusIds} */
		const statusIds = [];

		/** @type {string[]} */
		const nextIds = [];

		/** @type {string[]} */
		const prevIds = [];

		for (let i = 0, n = promises.length; i < n; i++) {
			const { access_token } = promises[i];
			const auth = authorizations.find((auth) => auth.access_token === access_token);
			const response = responses[i];
			/** @todo use allSettled and handle error responses */

			/** store the first and last status' id for each server for pagination */
			nextIds.push(response[response.length - 1]?.id);
			prevIds.push(response[0]?.id);

			for (const status of response)
				if (statusIds.includes(status.id)) {
					/** status already exists, add authorization to it
					 * @todo check to make sure that status ids from different servers are the same */
					statuses[status.id].authorizations.push(auth);
				} else {
					status.authorizations = [auth];
					status.created = new Date(status.created_at).valueOf();
					statuses[status.id] = status;
					/** insert index in sorted order */
					const index = statusIds.findIndex(
						(id) => statuses[id].created < status.created,
					);
					if (index === -1) statusIds.push(status.id);
					else statusIds.splice(index, 0, status.id);
				}
		}
		return { json: { authorizations, nextIds, prevIds, statuses, statusIds, timeline } };
	} catch (error) {
		console.error('☃️', { error });
		return { json: { error: error.message, timeline } };
	}
}

export const get = [isAuthorized, fetchAllTimelines];
