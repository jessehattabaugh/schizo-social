/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { authorizations, timeline } = state.store;
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
				? html`<a href="/timelines/home" class="button ${timeline == 'home' && 'active'}"
							>home</a
						>
						<a
							href="/timelines/public"
							class="button ${timeline == 'public' && 'active'}"
							>public</a
						>`
				: html`<a href="/login">login</a>`}
		</nav>`;
}
