/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { access_token, error, statuses = {} } = state.store;
	const statusIds = Object.keys(statuses);
	const [lastId] = statusIds.slice(-1);
	console.debug('⌛', { access_token, error, statusIds, lastId });

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
			li {
				list-style: none;
			}
			#nextLink {
				font-size: larger;
				padding: 0.5em;
			}
		</style>
		<ol class="h-feed">
			${statusIds
				.map((statusId) => `<li><ss-status status_id="${statusId}"></ss-status></li>`)
				.join('\n')}
		</ol>
		<a id="nextLink" href="?from=${lastId}">Next</a>
		${error && `<div class="error">${error}</div>`}`;
}
