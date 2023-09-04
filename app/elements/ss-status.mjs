/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { attrs, store } = state;

	/** @type {import('../types').Authorizations} */
	const auths = store.authorizations;

	/** @type {import('../types').Status} */
	const Details = store.details;

	/** @type {import('../types').StatusMap} */
	const Statuses = store.statuses;

	/** @type {string} */
	const id = attrs?.id || Details?.id;

	const status = Details || Statuses[id];
	const [firstAuth] = status.authorizations;
	const authIndex = auths
		.findIndex(({ access_token }) => access_token === firstAuth.access_token)
		.toString();
	console.debug('🛻 ss-status', { authIndex, auths, firstAuth, id, status });

	const { authorizations } = status;
	// if status is a reblog, use the reblogged status
	const {
		content,
		created_at,
		filtered,
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

	return html`<style>
			.h-entry {
				block-size: max-content;
				border-radius: 0.25em;
				border: 1px inset grey;
				margin: auto;
				overflow-x: hidden;
			}
			@keyframes scale {
				from {
					transform: scale(1);
				}
				to {
					transform: scale(0);
				}
			}
			.h-card {
				border-bottom: 1px outset grey;
			}
			.u-photo {
				box-shadow: 0.1em 0.1em 0.02em black;
				aspect-ratio: 1;
				object-fit: scale-down;
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
			.attachments > :nth-of-type(2n + 1):last-of-type {
				grid-column: 1 / -1;
			}
			.spoiler_text {
				font-family: var(--font-family-heading);
			}
			.h-card details {
				background-position: center;
				background-size: cover;
				font-family: var(--font-family-heading);
				font-weight: bold;
				padding: 0.5em;
				text-shadow: 0.05em 0.05em 0.02em black;
			}
			.h-card summary > * {
				vertical-align: middle;
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
				flex: 1;
			}
			h5 > *:last-child {
				text-align: right;
			}
			.note {
				margin-top: 1em;
			}
			pre {
				display: none;
			}
			dl {
				align-items: center;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-evenly;
				width: 100%;
			}
			dt,
			dd {
				margin: 0.5em;
				white-space: nowrap;
			}
			dt {
				flex: 0;
				text-align: right;
			}
			dd {
				flex: 1;
				text-align: left;
			}
			.filtered {
				color: #666;
			}
		</style>
		${filtered.length
			? html`<details class="filtered">
					<summary>
						${filtered
							.map(({ filter }) => html`<code>${filter.title}</code>`)
							.join(', ')}
					</summary>
					${filtered
						.map(
							({ filter, keyword_matches }) =>
								html`<p>
									<code>${filter.title}</code> matched
									"${keyword_matches.join('", "')}"
								</p>`,
						)
						.join('')}
					<button
						onclick="
						this.parentElement.nextElementSibling.style.display = 'block';
						this.nextElementSibling.style.display = 'block';
						this.style.display = 'none'"
					>
						show anyway
					</button>
					<button
						onclick="
						this.parentElement.nextElementSibling.style.display = 'none';
						this.previousElementSibling.style.display = 'block';
						this.style.display = 'none';"
						style="display: none;"
					>
						hide again
					</button>
			  </details>`
			: ''}
		<article
			class="h-entry"
			style="view-transition-name: status-${id}; display: ${filtered.length
				? 'none'
				: 'block'};"
		>
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
			${spoiler_text ? html`<section class="spoiler_text">${spoiler_text}</section>` : ''}
			<section class="e-content">${content}</section>
			${media_attachments.length
				? html`<section class="attachments">
						${media_attachments
							.map((attachment) => {
								const {
									type,
									url: fullsize_url,
									description,
									meta,
									preview_url,
								} = attachment;
								const aspect = meta?.small?.aspect || meta?.original?.aspect || 1;
								return type == 'image'
									? html`<ss-image
											description=${description}
											fullsize_url=${fullsize_url}
											preview_url=${preview_url}
											aspect_ratio=${aspect.toString()}
									  ></ss-image>`
									: '[attachment cannot be displayed, yet]';
							})
							.join('\n')}
				  </section>`
				: ''}
			<h5>
				${Details
					? html`<dl>
							<dt>from</dt>
							<dd>
								${authorizations
									.map(({ host }) => html`<a href="https://${host}">${host}</a>`)
									.join('')}
							</dd>
							<dt>by</dt>
							<dd>
								<a class="p-author u-url" href="${account_url}">${username}</a>
							</dd>
							${reblogger &&
							html`<dt>&lt; reblogged by</dt>
								<dd>
									<a class="p-author u-url" href="${reblogger.url}">
										${reblogger.username}
									</a>
								</dd>`}
							<dt>at</dt>
							<dd>
								<a class="u-url" href="${status_url}" style="text-align: right;">
									<time class="dt-published" datetime="${created_at}">
										${new Date(created_at).toLocaleString()}</time
									>
								</a>
							</dd>
					  </dl>`
					: html`<a href="/status?${new URLSearchParams({ id, authIndex }).toString()}"
							>details &gt;</a
					  >`}
			</h5>
			<pre>${JSON.stringify(status, null, 2)}</pre>
		</article>`;
}
