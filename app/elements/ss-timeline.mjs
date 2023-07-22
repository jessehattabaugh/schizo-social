/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { error, statusIds = [] } = state.store;
	/** @type {import('../types').StatusIds} */
	const StatusIds = statusIds;
	// get the last id
	const lastId = StatusIds[StatusIds.length - 1];
	// console.debug('⌛', { error, lastId });
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
				text-align: right;
			}
		</style>
		<ol class="h-feed">
			${StatusIds.map((id) => html`<li><ss-status id="${id}"></ss-status></li>`).join('\n')}
		</ol>
		<nav>
			<a class="button" href="?from=${lastId}">Next</a>
		</nav
		${error && html`<div class="error">${error}</div>`}`;
}
