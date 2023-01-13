/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { access_token, error, statuses } = state.store;
	console.debug('⌛', { access_token, error, statuses: statuses.length });

	return html`<ol>
			${statuses
				.map((/** @type {{ content: any; }} */ status) => `<li>${status.content}</li>`)
				.join('\n')}
		</ol>
		${error && `<div class="error">${error}</div>`}`;
}
