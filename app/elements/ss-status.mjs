/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { attrs, store } = state;
	const { status_id } = attrs;
	const { statuses } = store;
	const status = store?.status || statuses[status_id];
	// console.debug('🛻 ss-status', status);
	const {
		content,
		created_at,
		media_attachments,
		spoiler_text,
		url: status_url,
	} = status.reblog || status;
	const {
		avatar,
		display_name,
		header,
		note,
		url: account_url,
		username,
	} = status.reblog?.account || status.account;
	const reblogger = status.reblog && status.account;
	return (
		status &&
		html`<style>
				.h-entry {
					border: 1px inset grey;
					border-radius: 0.25em;
					margin: 1em 0;
					overflow-x: hidden;
					width: 100%;
				}
				.h-card {
					border-bottom: 1px outset grey;
				}
				.u-photo {
					box-shadow: 0.1em 0.1em 0.02em black;
					min-width: 3em;
					vertical-align: middle;
				}
				section {
					clear: both;
					padding: 0.5em;
				}
				.attachments {
					display: grid;
					grid-gap: 0.5em;
					grid-template-columns: repeat(auto-fit, minmax(calc(50% - 0.5em), 1fr));
				}
				.spoiler_text {
					font-family: var(--font-family-heading);
				}
				details {
					background-position: center;
					background-size: cover;
					font-family: var(--font-family-heading);
					font-weight: bold;
					padding: 0.5em;
					text-shadow: 0.05em 0.05em 0.02em black;
				}
				.p-name {
					display: inline;
					font-size: calc(max(200%, 1.3em));
					text-shadow: 0.04em 0.04em 0.01em white, -0.04em -0.04em 0.01em white,
						-0.04em 0.04em 0.01em white, 0.04em -0.04em 0.01em white,
						0 0.04em 0.01em white, 0 -0.04em 0.01em white, 0.04em 0 0.01em white,
						-0.04em 0 0.01em white;
				}
				h5 {
					align-items: center;
					display: flex;
					justify-content: space-between;
				}
				h5 > a {
					padding: 1em;
					flex: 1;
				}
				h5 > *:last-child {
					text-align: right;
				}
				.note {
					margin-top: 1em;
				}
			</style>
			<article class="h-entry">
				<header class="h-card">
					<details style="background-image: url('${header}')">
						<summary>
							<img
								alt="${display_name}"
								class="u-photo"
								fetchpriority="high"
								height="10%"
								loading="lazy"
								src="${avatar}"
								width="10%"
							/>
							<h3 class="p-name">${display_name}</h3>
						</summary>
						<div class="note">${note}</div>
					</details>
				</header>
				${spoiler_text &&
				`<section class="spoiler_text">
					${spoiler_text}
				</section>`}
				<section class="e-content">${content}</section>
				<section class="attachments">
					${media_attachments
						.map((/** @type {import('../types').Attachment} */ attachment) => {
							const {
								type,
								url: fullsize_url,
								description,
								preview_url,
							} = attachment;
							return (
								type == 'image' &&
								html`<ss-image
									description=${description}
									fullsize_url=${fullsize_url}
									preview_url=${preview_url}
								></ss-image>`
							);
						})
						.join('\n')}
				</section>
				<h5>
					<a class="p-author u-url" href="${account_url}"> ^ by ${username} </a>
					${reblogger &&
					`<a class="p-author u-url" href="${reblogger.url}">
						&lt; reblogged by ${reblogger.username}
					</a>`}
					<a class="u-url" href="${status_url}" style="text-align: right;">
						<time class="dt-published" datetime="${created_at}">
							at ${new Date(created_at).toLocaleString()}</time
						>
					</a>
				</h5>
			</article>`
	);
}
