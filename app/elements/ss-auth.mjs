/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { error, access_token, vapid_key, name, website } = state.store;
	console.debug('📝', { error, access_token, vapid_key, name, website });

	// Confirm that the app’s OAuth2 credentials work.

	return html`<details>
			<summary>You are ${!access_token && 'not'} authenticated</summary>
			<dl>
				<dt>access_token</dt>
				<dd>${access_token}</dd>
				<dt>vapid_key</dt>
				<dd>${vapid_key}</dd>
				<dt>name</dt>
				<dd>${name}</dd>
				<dt>website</dt>
				<dd>${website}</dd>
			</dl>
		</details>
		${error && `<div class="error">${error}</div>`}
		${access_token && !error && `<nav><a href='/home'>Go to your Home Timeline</a></nav>`}`;
}
