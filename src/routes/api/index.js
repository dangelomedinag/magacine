import { API_KEY, API_URL } from '$lib/_env';
import { uuid } from '$lib/helpers';

async function getResource({ url }) {
	// get params
	const params = url.searchParams;
	const search = params.has('s') ? params.get('s') : false;
	if (!search) throw { message: 'Query must contain an <s> query param.' };

	const page = params.has('page') ? params.get('page') : false;
	const type = params.has('type') ? params.get('type') : false;
	const year = params.has('year') ? params.get('year') : false;

	// create URL object of resource
	const api = new URL(API_URL);

	if (search.length > 2) api.searchParams.set('s', search);
	else throw { message: 'Too namy results' };

	if (page) {
		const n = +page;
		if (!isNaN(n) && n > 0) api.searchParams.set('page', n);
		else throw { message: '<page> param must be an integer positive >= 1' };
	}
	if (year) {
		let currentYear = new Date().getFullYear();
		const n = +year;
		if (!isNaN(n) && n <= currentYear) api.searchParams.set('y', n);
		else throw { message: '<year> param must be an integer positive <= ' + currentYear };
	}

	if (type) {
		if (type === 'movie' || type === 'series' || type === 'episode')
			api.searchParams.set('type', type);
		else throw { message: "<type> param only accept { 'movie'|'series'|'episode' } value." };
	}

	api.searchParams.set('apikey', API_KEY);

	const data = await fetch(api.href);
	const json = await data.json();

	if (!json) throw { message: 'Movies or Series not found.' };
	if (json.Response === 'False') throw { message: json.Error };

	json.Search = json.Search.filter((m) => m.Poster !== 'N/A');
	if (json.Search.length < 1) throw { message: `${type ? type : 'Movie o Series'} not found.` };

	const rest = +json.totalResults <= 10 ? +json.totalResults - json.Search.length : false;

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
			totalResults: !rest ? +json.totalResults : +json.totalResults - rest,
			search: search,
			query: url.searchParams.toString()
		}
	};
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(event) {
	try {
		const response = await getResource(event);
		return response;
	} catch (error) {
		const params = event.url.searchParams;
		const search = params.has('s') ? params.get('s') : false;
		return {
			status: 404,
			body: { ...error, search, query: params.toString() }
		};
	}
}
