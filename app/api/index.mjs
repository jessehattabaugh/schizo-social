/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(request) {
	const { session } = request;
	/** @type {import('../types').Authorizations} */
	const auths = session.authorizations;
	if (auths) return { location: '/timelines/home' };
	else return {};
}
