import { json as json$1 } from '@sveltejs/kit';
import * as cookie from 'cookie';

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function PUT({ request }) {
	const { theme } = await request.json();

	if (!theme) {
		return json$1({ message: 'invalid theme' }, {
			status: 403
		});
	}

	let cookieOpts = {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7
	};

	return json$1({ message: 'ok' }, {
		status: 303,
		headers: {
			'set-cookie': cookie.serialize('mc_theme', theme, cookieOpts)
		}
	});
}
