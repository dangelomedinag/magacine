import 'dotenv/config';
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ url }) {
	const API_KEY = process.env.OMDB_API_KEY;
	const params = url.search;
	try {
		const data = await fetch(`https://www.omdbapi.com/${params}&apikey=${API_KEY}`).then((r) =>
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
