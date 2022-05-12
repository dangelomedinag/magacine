import 'dotenv/config';
const API_KEY = process.env.OMDB_API_KEY;

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(event) {
	console.log(`=======[${new Date(Date.now())}]=======`);
	// console.log(event);
	console.log(`[GET] => /api/[id=${event.params.id}]`);

	// get params
	const id = event.params.id;

	// create URL object for get resource
	const API_URL = new URL('https://www.omdbapi.com');
	API_URL.searchParams.set('i', id);
	API_URL.searchParams.set('apikey', API_KEY);

	try {
		const data = await fetch(API_URL.href);
		// console.log('api/[id].js endpoint => fetch: ', data.ok, data.status);
		const json = await data.json();
		// console.log('api/[id].js endpoint => response.json: ', json);

		if (json.Response === 'False') {
			// console.log('api/[id].js endpoint => json.Response: ', json.Response);
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

		console.log(`res => status:`, data.status);
		console.log(`{ ...movie, response: ${obj.response} }`);
		console.log(`===============`);

		return {
			status: data.status,
			body: obj
		};
	} catch (error) {
		console.log(`res => error:`, error.message);
		console.log(`===============`);
		return {
			status: 404,
			body: { message: error.message }
		};
	}
}
