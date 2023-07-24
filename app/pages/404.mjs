/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { error } = state.attrs;
	return html`<article>
		<h1>404 Not Found</h1>
		<h2>The server cannot find the requested resource.</h2>
		<p>${error && error}</p>
	</article>`;
}
