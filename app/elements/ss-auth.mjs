/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { store } = state;
	/** @type {import('../types').Authorizations} */
	const auths = store.authorizations;
	console.debug('🧼', { auths });
	return html`<style>
			:host {
				display: block;
				margin: 1em auto;
				max-width: 50em;
				width: 100%;
			}
			ol {
				margin: 1em;
			}
			li {
				list-style: number;
				margin: 1em;
			}
		</style>
		<h2>Accounts</h2>
		<ol>
			${auths
				? auths
						.map(({ host }) => html`<li><a href="https://${host}">${host}</a></li>`)
						.join('')
				: ''}
		</ol>
		<nav>
			<a class="button" href="/login">add an account</a>
			${auths && html`<a class="button" href="/timelines/home">Go to your Home Timeline</a>`}
		</nav>`;
}
