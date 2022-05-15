import { API_KEY } from '$lib/_env';
const uuid = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ url }) {
	const logger = false;
	if (logger) {
		console.log(`===============`);
		console.log(`[GET] => /api`, 'params:', url.search);
	}

	// get params
	const params = url.searchParams;
	const search = params.has('s') ? params.get('s') : false;
	const page = params.has('page') ? params.get('page') : false;
	const type = params.has('type') ? params.get('type') : false;

	// create URL object for get resource
	const API_URL = new URL('https://www.omdbapi.com');
	try {
		if (search) API_URL.searchParams.set('s', search);
		else throw new Error("Query must contain an 's' query param.");

		if (page) {
			const n = +page;
			if (!isNaN(n) || n > 0) API_URL.searchParams.set('page', n);
			else throw new Error("'page' param must be an integer positive >= 1");
		}

		if (type) {
			if (type === 'movie' || type === 'series' || type === 'episode')
				API_URL.searchParams.set('type', type);
			else throw new Error("'type' param only accept { 'movie'|'series'|'episode' } value.");
		}
	} catch (error) {
		return {
			status: 404,
			body: { message: error.message }
		};
	}

	API_URL.searchParams.set('apikey', API_KEY);

	// create URL object for get resource
	try {
		const data = await fetch(API_URL.href);
		// console.log('api/index.js endpoint => fetch: ', data ? true : false);
		const json = await data.json();
		// console.log('api/index.js endpoint => response.json: ', json.Search.length);

		if (json.Response === 'False') {
			// console.log('endpoint => json.Response: ', json.Response);
			throw new Error(json.Error);
		}

		json.Search = json.Search.map((m) => {
			let obj = {};
			for (const key in m) {
				if (key === 'Year' && m[key].endsWith('–')) obj[key.toLowerCase()] = m[key].slice(0, -1);
				else obj[key.toLowerCase()] = m[key];
			}
			return {
				...obj,
				uuid: uuid()
			};
		});
		if (logger) {
			console.log(`res => status:`, data.status);
			console.log(`{ ...movies }`);
			console.log(`===============`);
		}

		return {
			status: data.status,
			body: { results: json.Search, totalResults: +json.totalResults, search: search }
		};
	} catch (error) {
		if (logger) {
			console.log(`res => error:`, error.message);
			console.log(`===============`);
		}
		return {
			status: 404,
			body: { message: error.message }
		};
	}
}
