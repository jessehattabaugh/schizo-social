/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { themeColor } = state.store;
	return html`
		<h2>Colors</h2>
		<form action="/settings" method="post">
			<label
				>Theme
				<input
					name="themeColor"
					onchange="this.form.submit();"
					type="color"
					value="${themeColor}"
			/></label>
		</form>
	`;
}
