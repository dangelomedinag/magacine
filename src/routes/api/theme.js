import * as cookie from 'cookie';

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function PUT({ request }) {
	const { theme } = await request.json();

	if (!theme) {
		return {
			status: 403,
			body: { message: 'invalid theme' }
		};
	}

	let cookieOpts = {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7
	};

	return {
		status: 303,
		body: { message: 'ok' },
		headers: {
			'set-cookie': cookie.serialize('mc_theme', theme, cookieOpts)
		}
	};
}
