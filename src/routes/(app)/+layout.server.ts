import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(307, '/login');
	}

	return {
		user: locals.user
	};
}
