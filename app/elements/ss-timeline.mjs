// @ts-nocheck
/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { access_token, error, statuses } = state.store;
	console.debug('⌛', { access_token, error, statuses: statuses.length });

	return html`<style>
			.h-feed {
				column-count: 1;
				column-gap: 0.25em;
			}
			.h-entry {
				border: 1px inset grey;
				border-radius: 0.25em;
				margin: 0.5em 0.1em;
				overflow-x: hidden;
				width: 100%;
			}
			@media (min-width: 600px) {
				.h-feed {
					column-count: 2;
				}
			}
			@media (min-width: 1200px) {
				.h-feed {
					column-count: 3;
				}
			}
			@media (min-width: 1800px) {
				.h-feed {
					column-count: 4;
				}
			}
			.u-photo {
				box-shadow: 0.1em 0.1em 0.02em black;
				min-width: 3em;
				vertical-align: middle;
			}
			.attachment {
				max-width: 25%;
			}
			section {
				clear: both;
				padding: 0.5em;
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
					-0.04em 0.04em 0.01em white, 0.04em -0.04em 0.01em white, 0 0.04em 0.01em white,
					0 -0.04em 0.01em white, 0.04em 0 0.01em white, -0.04em 0 0.01em white;
			}
			h5 {
				align-items: center;
				display: flex;
				justify-content: space-between;
			}
			h5 > a {
				padding: 1em;
			}
			h5 > a:first-of-type {
				flex: 1;
			}
			.note {
				margin-top: 1em;
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
										<div class="note">
											${status.account.note}
										</div>
									</details>
								</header>
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
								<h5>
									<span>^ by</span>
									<a class="p-author u-url" href="${status.account.url}">
										${status.account.username}
									</a>
									<span>at</span>
									<a class="u-url" href="${status.url}">
										<time class="dt-published" datetime="${status.created_at}">
											${new Date(status.created_at).toLocaleString()}</time
										>
									</a>
								</h5>
						  </article>`
						: ``,
				)
				.join('\n')}
		</div>
		${error && `<div class="error">${error}</div>`}`;
}
