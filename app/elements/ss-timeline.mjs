// @ts-nocheck
/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { access_token, error, statuses } = state.store;
	console.debug('⌛', { access_token, error, statuses: statuses.length });

	return html`<style>
			.h-feed {
				align-items: center;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-evenly;
			}
			.h-entry {
				border-bottom: 1px solid grey;
				max-width: 600px;
				overflow-x: hidden;
			}
			.h-card {
				margin-bottom: 1em;
			}
			.u-photo {
				min-width: 3em;
				vertical-align: middle;
				box-shadow: 0.1em 0.1em 0.1em black;
			}
			.attachment {
				max-width: 100%;
			}
			section {
				clear: both;
				padding: 0.5em;
			}
			.spoiler_text {
				font-family: var(--font-family-heading);
			}
			details {
				background-size: cover;
				background-position: center;
				font-family: var(--font-family-heading);
				margin-bottom: 0.5em;
				padding: 0.5em;
				text-shadow: 0.05em 0.05em 0.04em black;
			}
			.p-name {
				display: inline;
				font-size: calc(max(200%, 1.3em));
				text-shadow: 0.04em 0.04em 0.01em white, -0.04em -0.04em 0.01em white,
					-0.04em 0.04em 0.01em white, 0.04em -0.04em 0.01em white, 0 0.04em 0.01em white,
					0 -0.04em 0.01em white, 0.04em 0 0.01em white, -0.04em 0 0.01em white;
			}
			picture {
				margin-bottom: 1em;
			}
			
			h5 {
				display: flex;
				justify-content: space-between;
			}
			h5 > * {
				padding: 0.5em;
			}
		</style>
		<div class="h-feed">
			${statuses
				.map((status) =>
					status.language === 'en'
						? `<article class="h-entry">
								<header class="h-card">
									<details
										style="background-image: url('${status.account.header}')"
									>
										<summary>
											<img
												alt="${status.account.display_name}"
												class="u-photo"
												height="10%"
												loading="lazy"
												src="${status.account.avatar}"
												width="10%"
											/>
											<h3 class="p-name">${status.account.display_name}</h3>
										</summary>
										${status.account.note}
									</details>
								</header>

								<h5>
									<a class="p-author u-url" href="${status.account.url}">
										${status.account.username}
									</a>
									<a class="u-url" href="${status.url}">
										<time class="dt-published" datetime="${status.created_at}">
											${new Date(status.created_at).toLocaleString()}</time
										>
									</a>
								</h5>
								${
									status.spoiler_text &&
									`<section class="spoiler_text">
										${status.spoiler_text}
									</section>`
								}
								<section class="e-content">${status.content}</section>
								${status.media_attachments
									.map(
										(attachment) =>
											attachment.type == 'image' &&
											`<picture>
												<source
													media="(min-width: 600px)"
													srcset="${attachment.url}" />
												<img
													alt="${attachment.description || 'no description'}"
													class="attachment"
													loading="lazy"
													src="${attachment.preview_url}"
													width="100%"
											/></picture>`,
									)
									.join('\n')}
						  </article>`
						: ``,
				)
				.join('\n')}
		</div>
		${error && `<div class="error">${error}</div>`}`;
}
