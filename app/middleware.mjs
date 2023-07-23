/** @type {import('@enhance/types').EnhanceApiFn} */
export async function isAuthorized(request) {
	const { session } = request;
	/** @type {import('./types').Authorizations} */
	const authorizations = session.authorizations || [];
	if (!authorizations) return { location: '/login' };
	/** @todo store the path they were trying to view in the session so they can be returned */
}
