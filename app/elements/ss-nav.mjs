/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { access_token } = state.store;
	const { active } = state.attrs;
	return html` <style>
			nav {
				text-align: right;
			}
			a {
				border: outset 1px grey;
				display: inline-block;
				font-size: larger;
				padding: 1em;
			}
		</style>
		<nav>
			${access_token
				? html`<a href="/home" class="${active == 'home' && 'active'}">home</a>
						<a href="/public" class="${active == 'public' && 'active'}">public</a>`
				: html`<a href="/login">login</a>`}
		</nav>`;
}
