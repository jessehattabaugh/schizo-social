/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { header, display_name, avatar, note } = state.attrs;
	return html`<style></style>
		<header class="h-card">
			<details style="background-image: url('${header}')">
				<summary>
					<img
						alt="${display_name}"
						class="u-photo"
						height="10%"
						loading="lazy"
						src="${avatar}"
						width="10%"
					/>
					<h3 class="p-name">${display_name}</h3>
				</summary>
				${note}
			</details>
		</header> `;
}
