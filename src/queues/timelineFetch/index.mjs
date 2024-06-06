/** @import { Statuses } from '../../../types' */

/** fetch a timeline and put the results in the database
 * @see https://arc.codes/queues
 * @param {any} event
 */
export async function handler(event) {
	//console.debug('🐕 timelineFetch queue handler event', JSON.stringify(event, null, 2));
	const { Records } = event;
	for (const { body } of Records) {
		const { access_token, host, timeline, max_id, min_id, random } = JSON.parse(body);
		console.debug('💽 Record', { access_token, host, timeline, max_id, min_id, random });
		const limit = '40';
		const params = new URLSearchParams({ limit });
		if (max_id) params.append('max_id', max_id);
		if (min_id) params.append('min_id', min_id);
		console.debug('🌜 fetching...', { limit, params });
		try {
			const response = await fetch(`https://${host}/api/v1/timelines/${timeline}?${params}`, {
				headers: { Authorization: `Bearer ${access_token}` },
				method: `GET`,
			});
			if (response.ok) {
				/** @type {Promise<Statuses>} */
				const statuses = await response.json();
				console.debug('🌛 fetch success', { statuses });
			} else {
				throw new Error(
					`🏮 could not fetch ${timeline} from ${host}: ${response.status} ${response.statusText}`,
				);
			}
		} catch (error) {
			console.error('🔥 timelineFetch error', { error });
		}
	}
	return;
}
