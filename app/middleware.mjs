/** @type {import('@enhance/types').EnhanceApiFn} */
export async function redirectToLogin(request) {
	const { session } = request;
	/** @type {import('./types').Authorizations} */
	const auths = session.authorizations;
	if (!auths) return { location: '/login' };
	/** @todo store the path they were trying to view in the session so they can be returned */
}
