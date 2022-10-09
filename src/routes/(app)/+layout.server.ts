import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, parent }) => {
	if (!locals.user) {
		throw redirect(307, '/login');
	}

	return {
		user: locals.user
	};
};
