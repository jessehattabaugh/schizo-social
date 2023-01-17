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
			div {
				padding: 0.5em;
			}
			label {
				margin: 1em;
			}
			input {
				font-size: calc(max(5vw, 1.5em));
			}
		</style>
		<datalist id="hosts">
			<option value="counter.social"></option>
			<option value="mas.to"></option>
			<option value="mastodon.cloud"></option>
			<option value="mastodon.online"></option>
			<option value="mastodon.social"></option>
			<option value="mastodon.world"></option>
			<option value="mstdn.jp"></option>
			<option value="mstdn.social"></option>
			<option value="pawoo.net"></option>
			<option value="home.social"></option></datalist
		><label for="host">Your Mastodon host:</label>
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
