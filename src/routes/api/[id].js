import 'dotenv/config';
const API_KEY = process.env.OMDB_API_KEY;

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
	const API_URL = 'https://www.omdbapi.com';
	const id = params.id;

	// GET resource url
	const url = new URL(API_URL);
	url.searchParams.set('i', id);
	url.searchParams.set('apikey', API_KEY);

	try {
		const data = await fetch(url.href);
		const json = await data.json();
		// console.log(json);

		let obj = {};

		for (const key in json) {
			let value = json[key];

			if (value === 'N/A' || value === '') {
				value = null;
			}
			if (key === 'Response') {
				value = json[key] === 'True';
			}

			if (value) {
				if (key === 'Year') {
					if (value.endsWith('-')) value = value.slice(-1);
				}

				if (key === 'Genre') {
					if (value.includes(',')) value = json[key].split(',').map((e) => e.trim());
					else value = [];
				}

				if (key === 'Language') {
					if (value.includes(',')) value = json[key].split(',').map((e) => e.trim());
					else value = [value];
				}
			}

			obj[key.toLowerCase()] = value;
			// console.log(obj);
		}
		// console.log(obj);

		return {
			status: data.status,
			body: obj
		};
	} catch (error) {
		console.log(error);
		return {};
	}
}
