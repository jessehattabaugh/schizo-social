/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { error, host } = state.store;
	// console.debug('📝', { error, host });
	return html`<style>
			:not(.clean):invalid {
				border: 2px dashed var(--error);
			}
			.error {
				color: var(--error);
			}
			div {
				padding: 0.5em;
			}
			label {
				margin: 1em;
			}
			input {
				background-color: black;
				border: 1px solid currentColor;
				color: currentColor;
				font-size: 1.5em;
			}
		</style>
		<datalist id="hosts">
			<option value="mastodon.social"></option>
			<option value="mas.to"></option>
		</datalist>
		<label for="host">Your Mastodon host:</label>
		<div>
			http://
			<input
				class="clean"
				id="host"
				list="hosts"
				name="host"
				oninput="this.classList.remove('clean');"
				pattern=".*\\..+"
				placeholder="your.host.here"
				required
				title="The hostname of your Mastodon server."
				type="text"
				value="${host}"
			/>
		</div>
		${error && html`<div class="error">${error}</div>`}`;
}
