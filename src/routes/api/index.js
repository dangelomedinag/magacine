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
	const year = params.has('year') ? params.get('year') : false;

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
		if (year) {
			let currentYear = new Date().getFullYear();
			const n = +year;
			if (!isNaN(n) || n <= currentYear) API_URL.searchParams.set('y', n);
			else throw new Error("'year' param must be an integer positive <= " + currentYear);
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
		const json = await data.json();

		if (json.Response === 'False') {
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

		return {
			status: data.status,
			body: {
				results: json.Search,
				totalResults: +json.totalResults,
				search: search,
				query: url.searchParams.toString()
			}
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
