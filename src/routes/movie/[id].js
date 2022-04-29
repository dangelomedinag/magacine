/**@type {import("./[id]").RequestHandler} */
export async function get({ params, url }) {
	// console.log(url);
	const req = await fetch(url.origin + '/api/' + params.id);
	const details = await req.json();

	return {
		body: {
			// id: params.id,
			movie: details
		}
	};
}
