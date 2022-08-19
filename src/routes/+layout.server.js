/**@type {import("./$types").LayoutServerLoad} */
export async function load({ locals }) {
	console.log('layout.server.js', locals.user);
	return {
		user: locals.user
	};
}
