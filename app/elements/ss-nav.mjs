/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { access_token } = state.store;
	const { active } = state.attrs;
	return html` <style>
			nav {
				text-align: right;
			}
		</style>
		<nav>
			${access_token
				? `<a href="/home" class="${active == 'home' && 'active'}">home</a>
						<a href="/public" class="${active == 'public' && 'active'}">public</a>`
				: `<a href="/login">login</a>`}
		</nav>`;
}
