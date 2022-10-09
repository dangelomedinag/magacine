import { error } from '@sveltejs/kit';

/**  @type {import("./$types").PageLoad}*/
export const load = async ({ fetch, params }) => {
	try {
		const req = await fetch('/api/' + params.id);
		if (!req.ok) throw req;
		const movie = await req.json();

		return {
			movie: movie
		};
	} catch ($error) {
		const msg = await $error.json();
		throw error($error.status, `${params.id} - ${msg.message}`);
	}
};
