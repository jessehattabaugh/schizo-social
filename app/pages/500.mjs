/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { error } = state.attrs;
	return html`<main>
		<h1>500 Internal Server Error</h1>
		<h2>
			The server encountered an unexpected condition that prevented it from fulfilling the
			request.
		</h2>
		<p>${error && error}</p>
	</main>`;
}
