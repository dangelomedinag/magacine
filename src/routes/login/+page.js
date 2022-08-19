// import { redirect } from '@sveltejs/kit';

/**@type {import("./$types").PageLoad} */
export async function load({ data }) {
	const { user } = data;
	// if (user) {
	// 	throw redirect(303, '/');
	// }
	console.log('login', { user });

	return data;

	// throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
	// return {
	// 	status: 200,
	// 	props
	// };
}
