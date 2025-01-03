import { json } from '@sveltejs/kit';

export async function PUT({ request, cookies }) {
	const { theme } = await request.json();

	if (!theme) {
		return json(
			{ message: 'invalid theme' },
			{
				status: 403
			}
		);
	}

	const cookieOpts = {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7
	};

	cookies.set('mc_theme', theme, cookieOpts);

	return json(
		{ message: 'ok' },
		{
			status: 200
		}
	);
}
