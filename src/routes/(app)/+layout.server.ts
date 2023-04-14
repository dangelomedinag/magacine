import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	if (!locals.user) {
		throw redirect(307, '/login');
	}

	console.log({ locals });

	return {
		user: locals.user
	};
}
