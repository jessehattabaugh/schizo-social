/** @import { Statuses, Status} from '../../../types' */
import arc from '@architect/functions';
const db = await arc.tables();

/** fetch a timeline and put the results in the database
 * @see https://arc.codes/queues
 * @param {any} event
 */
export async function handler(event) {
	//console.debug('🐕 timelineFetch queue handler event', JSON.stringify(event, null, 2));
	const { Records } = event;
	for (const { body } of Records) {
		const payload = JSON.parse(body);
		const { access_token, host, timeline, max_id, min_id } = payload;
		console.debug('💽 timelineFetch queue event handler', { payload });
		const headers = { Authorization: `Bearer ${access_token}` };
		const limit = '40';
		const params = new URLSearchParams({ limit });
		if (max_id) params.append('max_id', max_id);
		if (min_id) params.append('min_id', min_id);

		/** @see https://docs.joinmastodon.org/methods/timelines/ */
		const url = `https://${host}/api/v1/timelines/${timeline}?${params}`;

		console.debug('🌜 fetching...', { headers, limit, params, url });
		try {
			const response = await fetch(url, { headers, method: 'GET' });
			if (response.ok) {
				/** @type Statuses */
				const statuses = await response.json();
				console.debug(`🌛 fetched ${statuses.length} statuses`);
				for (let statusData of statuses) {
					console.debug('📤 storing', { statusData });
					const { content, created, created_at, id, spoiler_text, url, uri, visibility, ...unused } =
						statusData;
					const status = {
						content,
						created_at,
						created,
						host,
						id,
						spoiler_text,
						timeline,
						uri,
						url,
						visibility,
					};
					console.debug('🌞 putting', { status, unused });
					const putResponse = await db.statuses.put(status);
					console.debug('🌟 put success', { putResponse });
				}
			} else {
				const { status, statusText } = response;
				throw new Error(
					`🏮 could not fetch ${timeline} from ${host}: ${status} ${statusText}`,
				);
			}
		} catch (error) {
			console.error('🔥 timelineFetch error', { error });
		}
	}
	return;
}
