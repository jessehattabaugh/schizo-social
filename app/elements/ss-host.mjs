/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { error, host } = state.store;
	console.debug('📝', { error, host });
	return html`<style>
			:not(.clean):invalid {
				border: 2px dashed var(--error);
			}
			.error {
				color: var(--error);
			}
		</style>
		<datalist id="hosts">
			<option value="mas.to"></option>
			<option value="quo.to"></option></datalist
		><label for="host">Your ActivityPub host:</label>
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
				title="The hostname of your ActivityPub server."
				type="text"
				value="${host}"
			/>
		</div>
		${error && `<div class="error">${error}</div>`}`;
}
