/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { error, statusIds = [], nextIds = [], prevIds = [], scrollToBottom } = state.store;
	/** @type {import('../types').StatusIds} */
	const StatusIds = statusIds;
	// console.debug('⌛', { error, nextIds, prevIds, scrollToBottom });
	return html`<style>
			.h-feed {
				column-count: 1;
				column-gap: 0.25em;
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
			@media (min-width: 2400px) {
				.h-feed {
					column-count: 5;
				}
			}
			@media (min-width: 3000px) {
				.h-feed {
					column-count: 6;
				}
			}
			nav {
				text-align: center;
			}
		</style>
		<nav>
			<a
				class="button"
				href="?${new URLSearchParams({
					prevIds: prevIds.join(','),
				}).toString()}"
				>Previous/Newer</a
			>
		</nav>
		<ol class="h-feed">
			${StatusIds.map((id) => html`<li><ss-status id="${id}"></ss-status></li>`).join('\n')}
		</ol>
		<nav>
			<a
				class="button"
				href="?${new URLSearchParams({
					nextIds: nextIds.join(','),
				}).toString()}"
				>Next/Older</a
			>
		</nav>
		${error && html`<div class="error">${error}</div>`}
		${scrollToBottom
			? html`<script>
					window.onload = function () {
						window.scrollTo(0, document.body.scrollHeight);
					};
			  </script>`
			: ''}`;
}
