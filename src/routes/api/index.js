/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ url }) {
	const API_key = 'eedc324b';
	const params = url.search;
	try {
		const data = await fetch(`https://www.omdbapi.com/${params}&apikey=${API_key}`).then((r) =>
			r.json()
		);
		return {
			status: data.status,
			body: data
		};
	} catch (error) {
		return {};
	}
}
