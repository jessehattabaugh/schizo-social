/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { followed_tags } = state.store;
	/** @type {import('../types').FollowedTagDataForAuths[]} */
	const FollowedTags = followed_tags;
	return FollowedTags.map(({ authorization, tags }) => {
		console.debug('🦜 map FollowedTags', { authorization, tags });
		const { host } = authorization;
		return html`<h2>${host}</h2>
			<ul>
				${tags
					.map(
						({ accounts, days, name, uses }) => html` <li>
							${name}: per day (people: ${Math.round(accounts / days).toString()},
							uses: ${Math.round(uses / days).toString()})
						</li>`,
					)
					.join('')}
			</ul>`;
	}).join('');
}
