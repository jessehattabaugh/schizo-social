/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { description, fullsize_url, preview_url } = state.attrs;
	return html`<style>
			picture {
				max-height: 30em;
				overflow: hidden;
			}
			img {
				width: 100%;
				height: auto;
			}
			dialog {
				margin: auto;
			}
			dialog::backdrop {
				background: rgba(0, 0, 0, 0.5);
				backdrop-filter: blur(1em);
			}
		</style>
		<picture onclick="event.currentTarget.nextElementSibling.showModal();">
			<source media="(min-width: 600px)" srcset="${fullsize_url}" />
			<img alt="${description || 'no description'}" loading="lazy" src="${preview_url}" />
		</picture>
		<dialog onclick="if (event.target === this) this.close();">
			<picture>
				<source media="(min-width: 600px)" srcset="${fullsize_url}" />
				<img alt="${description || 'no description'}" loading="lazy" src="${preview_url}" />
			</picture>
		</dialog>`;
}
