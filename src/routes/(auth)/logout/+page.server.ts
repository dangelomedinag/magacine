import { redirect } from '@sveltejs/kit';

export const actions = {
	default: ({ cookies, locals }) => {
		if (!locals.user) {
			throw redirect(301, '/login');
		}

		const opts = {
			path: '/',
			expires: new Date(0)
		};

		cookies.delete('token', opts);
		cookies.delete('refresh_token', opts);
		cookies.delete('mc_theme', opts);

		throw redirect(303, '/login');
	}
};
