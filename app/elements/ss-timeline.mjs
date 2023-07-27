/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { error, statusIds = [], nextIds = [], prevIds = [] } = state.store;
	/** @type {import('../types').StatusIds} */
	const StatusIds = statusIds;
	// console.debug('⌛', { error, nextIds, prevIds, scrollToBottom });
	return html`<style>
			.h-feed {
				column-count: 1;
				gap: 0.5em;
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
			li {
				margin-top: 0.5em;
			}
			@supports (grid-template-rows: masonry) {
				.h-feed {
					column-count: none;
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
					grid-template-rows: masonry;
					masonry-auto-flow: ordered;
					place-items: center;
				}
				li {
					margin-top: 0 !important; /* until enhance transforms @supports*/
					width: 100%;
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
				}).toString()}#bottom"
				>^^ Previous/Newer ^^</a
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
				name="bottom"
				>⌄⌄ Next/Older ⌄⌄</a
			>
		</nav>
		${error && html`<div class="error">${error}</div>`}`;
}
