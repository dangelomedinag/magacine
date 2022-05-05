import 'dotenv/config';
const API_KEY = process.env.OMDB_API_KEY;

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
	// get params
	const id = params.id;

	// create URL object for get resource
	const API_URL = new URL('https://www.omdbapi.com');
	API_URL.searchParams.set('i', id);
	API_URL.searchParams.set('apikey', API_KEY);

	// create URL object for get resource

	try {
		const data = await fetch(API_URL.href);
		console.log('api/[id].js endpoint => fetch: ', data.ok, data.status);
		const json = await data.json();
		// console.log('api/[id].js endpoint => response.json: ', json);

		if (json.Response === 'False') {
			console.log('api/[id].js endpoint => json.Response: ', json.Response);
			throw new Error(json.Error);
		}

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
					if (value.trim().endsWith('–')) value = value.slice(0, -1);
				}

				if (key === 'Genre') {
					if (value.includes(',')) value = json[key].split(',').map((e) => e.trim());
					else value = [];
				}

				// if (key === 'Year') {
				// 	if (m[key]?.endsWith('–')) obj[key.toLowerCase()] = m[key].slice(0, -1);
				// 	else obj[key.toLowerCase()] = m[key];
				// }

				// if (key === 'imdbRating') {
				// 	const n = Number(json[key]) / 2;
				// 	value = n.toFixed(1);
				// }

				if (key === 'Language') {
					if (value.includes(',')) value = json[key].split(',').map((e) => e.trim());
					else value = [value];
				}
			} else {
				if (key === 'Genre') {
					value = [];
				}
				if (key === 'Language') {
					value = [];
				}
			}

			obj[key.toLowerCase()] = value;
		}

		console.log(obj);

		return {
			status: data.status,
			body: obj
		};
	} catch (error) {
		return {
			status: 404,
			body: { message: error.message }
		};
	}
}
