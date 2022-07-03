import * as cookie from 'cookie';
export async function put({ request }) {
	const { theme } = await request.json();

	let cookieOpts = {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7
	};

	return {
		status: 303,
		headers: {
			'set-cookie': cookie.serialize('mc_theme', theme, cookieOpts)
		}
	};
}
