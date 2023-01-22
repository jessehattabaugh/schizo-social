/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
	const { access_token, error, statuses } = state.store;
	const statusIds = Object.keys(statuses);
	console.debug('⌛', { access_token, error, statusIds });

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
		</style>
		<div class="h-feed">
			${statusIds
				.map((statusId) => `<ss-status status_id="${statusId}"></ss-status>`)
				.join('\n')}
		</div>
		${error && `<div class="error">${error}</div>`}`;
}
