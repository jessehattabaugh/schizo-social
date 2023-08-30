import { getNothing, redirectToLogin } from '../middleware.mjs';

export const get = [redirectToLogin, getNothing];

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function post(request) {
	const { session, body } = request;
	const { themeColor } = body;
	console.debug('🍊 POST /settings', { themeColor });
	return { location: '/settings', session: { ...session, themeColor } };
}
