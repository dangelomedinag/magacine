import 'dotenv/config';
const API_KEY = process.env.OMDB_API_KEY;

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ url }) {
	const params = url.search;
	try {
		let data = await fetch(`https://www.omdbapi.com/${params}&apikey=${API_KEY}`).then((r) =>
			r.json()
		);

		const newdata = data.Search.map((e) => ({
			...e,
			uuid: Date.now().toString(36) + Math.random().toString(36).substring(2)
		}));

		data.Search = newdata;

		// console.log(newdata);

		return {
			status: data.status,
			body: data
		};
	} catch (error) {
		return {};
	}
}
