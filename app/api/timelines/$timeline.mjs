/**  @import { Authorizations, StatusMap, StatusIds } from '../../../types' */
import arc from '@architect/functions';
import { redirectToLogin } from '../../middleware.mjs';

/** @type {import('@enhance/types').EnhanceApiFn} */
async function fetchAllTimelines(request) {
	const { session, query, params } = request;
	const { timeline } = params;
	/** @type {Authorizations} */
	const authorizations = session.authorizations || [];
	const _nextIds = query?.nextIds?.split(',');
	const _prevIds = query?.prevIds?.split(',');
	// console.debug('🏠fetchAllTimelines', { authorizations, _nextIds, _prevIds });
	try {
		const promises = authorizations.map(({ access_token, host }, i) => {
			/** @todo replace http fetch with dynamodb lookup */
			/* @ts-expect-error function moved*/
			const promise = fetchTimeline(
				(40 / authorizations.length).toString(),
				access_token,
				host,
				timeline,
				_nextIds?.[i],
				_prevIds?.[i],
			);
			return { access_token, promise };
		});
		const responses = await Promise.all(promises.map(({ promise }) => promise));

		/** @type {StatusMap} */
		const statuses = {};

		/** @type {StatusIds} */
		const statusIds = [];

		/** @type {string[]} */
		const nextIds = [];

		/** @type {string[]} */
		const prevIds = [];

		for (let i = 0, n = promises.length; i < n; i++) {
			const { access_token } = promises[i];
			const auth = authorizations.find((auth) => auth.access_token === access_token);
			const response = responses[i];
			console.debug('🏠fetchAllTimelines', { auth, response });
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
		return {
			json: { nextIds, prevIds, statuses, statusIds, timeline },
		};
	} catch (error) {
		console.error('☃️', { error });
		return { json: { error: error.message, timeline } };
	}
}

/** publishes an event to the timelineFetch queue for each of a user's current authorizations that
 * fetches the most recent statuses for that timeline
 * @type {import('@enhance/types').EnhanceApiFn}
 */
async function queueTimelineFetches(request) {
	const { session, params } = request;
	const { timeline } = params;
	/** @type {Authorizations} */
	const authorizations = session.authorizations || [];
	console.debug('🛳️ queueTimelineFetches', { authorizations, timeline });
	try {
		for (let i = 0, n = authorizations.length; i < n; i++) {
			const { access_token, host } = authorizations[i];
			// queue events with a random string to prevent culling by the queue
			const random = Math.random().toString(36).substring(7);
			const payload = { access_token, host, timeline, random };
			const publishResponse = await arc.queues.publish({ name: 'timelineFetch', payload });
			console.debug('⚓ timelineFetch published', { publishResponse });
		}
	} catch (error) {
		console.error('☃️ queueTimelineFetches error', { error });
	} finally {
		return {};
	}
}

/** loads statuses for the timeline from the database
 * @type {import('@enhance/types').EnhanceApiFn}
 */
async function getStatuses(request) {
	const db = await arc.tables();
	const { session, params } = request;
	const { timeline } = params;
	/** @type {Authorizations} */
	const authorizations = session.authorizations || [];
	console.debug('📔 getStatuses', { authorizations, timeline });
	try {
		const statuses = await db.statuses.query({ timeline });
		console.debug('🙌 successfully queried statuses from database', { statuses, timeline });
		return { json: { statuses, timeline } };
	} catch (error) {
		console.error('🚨 error getting statuses', { error });
		return { json: { error: error.message, timeline } };
	}
}

export const get = [redirectToLogin, queueTimelineFetches, getStatuses];
