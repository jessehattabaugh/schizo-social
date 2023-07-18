/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
	try {
		const { session, query } = req;
		const { id } = query;
		const { access_token, host } = session;
		// https://docs.joinmastodon.org/methods/statuses/#get
		const response = await fetch(`https://${host}/api/v1/statuses/${id}`, {
			headers: { Authorization: `Bearer ${access_token}` },
			method: `GET`,
		});
		/** @type {import('../types').Status} */
		const status = await response.json();
		console.debug('🦋 status:get()', { status });
		return {
			json: { access_token, status },
		};
	} catch (error) {
		console.error('🐞 status:get()', { error });
		return {
			json: { error: error.message },
		};
	}
}
