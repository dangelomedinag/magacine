import { redirect } from '@sveltejs/kit';

/** @type {import("./$types").LayoutLoad} */
export const load = async ({ data }) => {
	console.log(data);
	// const data = await parent();
	// console.log(data);
	if (!data.user) {
		throw redirect(303, '/login');
	}

	return data;
};
