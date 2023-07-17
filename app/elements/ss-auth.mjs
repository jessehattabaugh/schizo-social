/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { store } = state;
	// console.debug('📝 ss-auth store', store);

	const { error, access_token, vapid_key, name, website } = store;

	// TODO: Confirm that the app’s OAuth2 credentials work.

	return html`<details>
			<summary>You are ${!access_token && 'not '}authenticated</summary>
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
		${error && html`<div class="error">${error}</div>`}
		${access_token && !error && html`<nav><a href="/home">Go to your Home Timeline</a></nav>`}`;
}
