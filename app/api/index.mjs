import { applyTheme } from '../middleware.mjs';

/** @type {import('@enhance/types').EnhanceApiFn} */
async function redirectToHome(request) {
	const { session } = request;
	/** @type {import('../types').Authorizations} */
	const auths = session.authorizations;
	if (auths) return { location: '/timelines/home' };
	else return {};
}

export const get = [applyTheme, redirectToHome];
