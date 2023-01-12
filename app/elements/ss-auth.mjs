/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { error, access_token, vapid_key, name, website } = state.store;
	console.debug('📝', { error, access_token, vapid_key, name, website });

	// Confirm that the app’s OAuth2 credentials work.

	return html` ${access_token
			? `<h3>You are authenticated!</h3>`
			: `<h3>You are not authenticated</h3>`}
		${vapid_key}
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
		${error && `<div class="error">${error}</div>`}`;
}
