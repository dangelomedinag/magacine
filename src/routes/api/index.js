import 'dotenv/config';
const API_KEY = process.env.OMDB_API_KEY;
const uuid = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ url }) {
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
		console.log('api/index.js endpoint => fetch: ', data ? true : false);
		const json = await data.json();
		console.log('api/index.js endpoint => response.json: ', json.Search.length);

		if (json.Response === 'False') {
			console.log('endpoint => json.Response: ', json.Response);
			throw new Error(json.Error);
		}

		json.Search = await Promise.all(
			json.Search.map(async (e) => {
				let obj = {};
				// const xxx = new URL(url.origin + '/api/' + e.imdbID);
				// console.log(xxx.href);

				const _url = new URL(API_URL.origin);
				_url.searchParams.set('i', e.imdbID);
				_url.searchParams.set('apikey', API_KEY);
				// console.log(_url.href);
				const d = await fetch(_url.href);
				const j = await d.json();
				// console.log(j);

				for (const key in j) {
					obj[key.toLowerCase()] = j[key];
				}
				// console.log(obj);

				return {
					...obj,
					uuid: uuid()
				};
			})
		);

		// console.log('list: ', json.Search);

		return {
			status: data.status,
			body: { results: json.Search, totalResults: json.totalResults }
		};
	} catch (error) {
		return {
			status: 404,
			body: { message: error.message }
		};
	}
}
