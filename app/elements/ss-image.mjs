/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { aspect_ratio, description, fullsize_url, preview_url } = state.attrs;
	return html`<style>
			picture {
				width: 100%;
				height: auto;
				overflow: hidden;
			}
			img {
				width: 100%;
				height: auto;
				object-fit: cover;
			}
			dialog {
				margin: auto;
			}
			dialog::backdrop {
				background: rgba(0, 0, 0, 0.5);
				backdrop-filter: blur(1em);
			}
		</style>
		<picture
			onclick="event.currentTarget.nextElementSibling.showModal();"
			style="aspect-ratio: ${aspect_ratio}"
		>
			<source media="(min-width: 600px)" srcset="${fullsize_url}" />
			<img
				alt="${description || 'no description'}"
				loading="lazy"
				src="${preview_url}"
				style="aspect-ratio: ${aspect_ratio}"
			/>
		</picture>
		<dialog onclick="if (event.target === this) this.close();">
			<picture style="aspect-ratio: ${aspect_ratio}">
				<source media="(min-width: 600px)" srcset="${fullsize_url}" />
				<img
					alt="${description || 'no description'}"
					loading="lazy"
					src="${preview_url}"
					style="aspect-ratio: ${aspect_ratio}"
				/>
			</picture>
		</dialog>`;
}
