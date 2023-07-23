/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { store } = state;
	/** @type {import('../types').Authorizations} */
	const auths = store.authorizations;
	// console.debug('🧼', { auths });
	return html`<style>
			ol {
				margin: 1em;
			}
			li {
				list-style: number;
				margin: 1em;
			}
		</style>
		<h2>Authorizations</h2>
		<ol>
			${auths
				? auths
						.map(({ host }) => html`<li><a href="https://${host}">${host}</a></li>`)
						.join('')
				: ''}
		</ol>
		<nav>
			<a class="button" href="/login">add an account</a>
		</nav>`;
}
