import * as cookie from 'cookie';

/**@type {import("@sveltejs/kit").RequestHandler} */
export function get() {
	return {
		status: 303,
		headers: {
			'set-cookie': [
				cookie.serialize('mc_sessionid', '', {
					path: '/',
					expires: new Date(0)
				}),
				cookie.serialize('mc_username', '', {
					path: '/',
					expires: new Date(0)
				}),
				cookie.serialize('mc_theme', '', {
					path: '/',
					expires: new Date(0)
				})
			],
			location: '/login'
		}
	};
}
