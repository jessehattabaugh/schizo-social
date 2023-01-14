// @ts-nocheck
/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { access_token, error, statuses } = state.store;
	console.debug('⌛', { access_token, error, statuses: statuses.length });

	return html`<style>
			.h-entry {
				padding: 0.5em;
				overflow-x: hidden;
				border-bottom: 1px solid grey;
			}
			.u-photo {
				float: left;
				max-width: 3em;
				margin: 0.5em;
			}
			.attachment {
				max-width: 100%;
			}
			.p-name {
				float: left;
			}
			.timestamp {
				text-align: right;
			}
		</style>
		<ol class="h-feed">
			${statuses
				.map(
					(status) =>
						`<li class="h-entry">
							<pre style="display: none;">${JSON.stringify(status)}</pre>
							<aside class="h-card">
								<a class="p-author u-url" href="${status.account.url}">
									<img class="u-photo" src="${status.account.avatar}" />
									<h4 class="p-name">${status.account.display_name}</h4>
									<h5>(${status.account.acct})</h5>
								</a>
							</aside>
							<article class="e-content">${status.content}</article>
							${status.media_attachments
								.map(
									(attachment) =>
										attachment.type == 'image' &&
										`<img class="attachment" src="${attachment.url}" alt="${attachment.description}" />`,
								)
								.join('\n')}
							<h6 class="timestamp">
								<a class="u-url" href="${status.url}">
								<time class="dt-published" datetime="${status.created_at}">
								${new Date(status.created_at).toLocaleString()}</time>
								</a>
							</h6>
						</li>`,
				)
				.join('\n')}
		</ol>
		${error && `<div class="error">${error}</div>`}`;
}
