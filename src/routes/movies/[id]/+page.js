import { error } from '@sveltejs/kit';

/**  @type {import("./$types").PageLoad}*/
export const load = async ({ fetch, params }) => {
	try {
		const req = await fetch('/api/' + params.id);
		if (!req.ok) throw req;
		const movie = await req.json();
		console.log({ movie });

		return {
			movie: movie
		};
	} catch ($error) {
		const msg = await $error.json();
		throw error(404, `${params.id} - ${msg.message}`);
	}
};
