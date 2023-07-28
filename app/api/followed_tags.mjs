import { redirectToLogin } from '../middleware.mjs';

/** @type {import('@enhance/types').EnhanceApiFn}*/
async function fetchAllFollowedTagsByAuth(request) {
	try {
		const { session } = request;

		const { authorizations } = session;
		/** @type {import('../types').Authorizations} */
		const auths = authorizations;

		const promises = await Promise.allSettled(
			auths.map(async (authorization) => {
				console.debug('🐦 map auths', { authorization });
				const { access_token, host } = authorization;
				/** @see https://docs.joinmastodon.org/methods/followed_tags/ */
				const response = await fetch(`https://${host}/api/v1/followed_tags`, {
					headers: { Authorization: `Bearer ${access_token}` },
					method: `GET`,
				});
				if (response.ok) {
					/** @type {import('../types').FollowedTag[]} */
					const data = await response.json();
					console.debug('🐔 data', { data });
					/** @type {import('../types').FollowedTagData[]}*/
					const tags = data.map(({ name, history }) => {
						/** @type {import('../types').FollowedTagHistoryData}*/
						const _ = { accounts: 0, uses: 0, days: 0 };
						const { accounts, uses, days } = history.reduce((_, { accounts, uses }) => {
							_.accounts += parseInt(accounts);
							_.uses += parseInt(uses);
							_.days++;
							return _;
						}, _);
						return { name, accounts, uses, days };
					});
					tags.sort((a, b) => b.uses - a.uses);
					console.debug('🦚 result', { authorization, tags });
					return { authorization, tags };
				} else {
					throw new Error(
						`could not fetch followed tags from ${host}: ${response.status} ${response.statusText}`,
					);
				}
			}),
		);
		// @ts-ignore typescript can't handle allSettled?
		const followed_tags = promises.map(({ value }) => value);
		console.debug('🦤', { followed_tags });
		return { json: { followed_tags } };
	} catch (error) {
		console.error('🐇 fetchAllFollowedTagsByAuth()', { error });
		return { json: { error: error.message } };
	}
}

export const get = [redirectToLogin, fetchAllFollowedTagsByAuth];
