import * as cookie from 'cookie';

/**@type {import("@sveltejs/kit").RequestHandler} */
export function get() {
	return {
		status: 303,
		headers: {
			'set-cookie': cookie.serialize('sessionid', '', {
				path: '/',
				expires: new Date(0)
			}),
			location: '/login'
		}
	};
}
