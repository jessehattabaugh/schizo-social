/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { active } = state.attrs;
	return html`<style>
			header {
				border-bottom: solid 0.5em var(--theme);
				display: flex;
				justify-content: space-around;
				vertical-align: middle;
			}
			h1 a:active,
			h1 a:focus,
			h1 a:link,
			h1 a:visited {
				padding: 0.1em;
				text-decoration: none;
			}
			nav a:active,
			nav a:focus,
			nav a:link,
			nav a:visited {
				padding: 0.5em;
			}
			.active {
				text-decoration: underline;
			}
		</style>
		<header>
			<h1><a href="/">😾schizo.social</a></h1>
		</header>
		<ss-nav active=${active}></ss-nav>`;
}
