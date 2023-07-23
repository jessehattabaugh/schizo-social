/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { authorizations, timeline } = state.store;
	/** @type {import('../types').Authorizations} */
	const auths = authorizations;
	return html` <style>
			nav {
				display: flex;
			}
			.active {
				background-color: var(--theme);
				color: white;
			}
		</style>
		<nav>
			${auths
				? html`<a href="/timelines/home" class="button ${timeline == 'home' && 'active'}"
							>home</a
						>
						<a
							href="/timelines/public"
							class="button ${timeline == 'public' && 'active'}"
							>public</a
						>
						<a href="/settings" class="button">settings</a>`
				: html`<a href="/login">login</a>`}
		</nav>`;
}
