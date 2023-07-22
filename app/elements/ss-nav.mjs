/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { authorizations } = state.store;
	const { active } = state.attrs;
	return html` <style>
			nav {
				text-align: left;
			}
			.active {
				background-color: var(--theme);
				color: white;
			}
		</style>
		<nav>
			${authorizations
				? html`<a href="/home" class="button ${active == 'home' && 'active'}">home</a>
						<a href="/public" class="button ${active == 'public' && 'active'}"
							>public</a
						>`
				: html`<a href="/login">login</a>`}
		</nav>`;
}
