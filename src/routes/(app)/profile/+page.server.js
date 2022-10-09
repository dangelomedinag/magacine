import { redirect } from '@sveltejs/kit';

/**@type {import("./$types").Actions} */
export const actions = {
	default: async ({ cookies, locals, request }) => {
		if (!locals.user) {
			throw redirect(404, '/login');
		}
		const fields = await request.formData();

		const typeTheme = fields.get('theme');
		console.log(typeTheme);

		const opts = {
			path: '/',
			expires: new Date(0)
		};

		let cookieOpts = {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7
		};

		cookies.set('mc_theme', typeTheme ?? '', typeTheme === 'system' ? opts : cookieOpts);

		// throw redirect(303, url.pathname);
	}
};
