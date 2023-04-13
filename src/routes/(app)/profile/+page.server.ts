import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies, locals, request }) => {
		if (!locals.user) {
			throw redirect(307, '/login');
		}
		const fields = await request.formData();

		const typeTheme = fields.get('theme') as string;

		const opts = {
			path: '/',
			expires: new Date(0)
		};

		let cookieOpts = {
			path: '/',
			httpOnly: true,
			sameSite: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7
		};

		cookies.set('mc_theme', typeTheme ?? '', typeTheme === 'system' ? opts : cookieOpts);
	}
};
