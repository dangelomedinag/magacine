import { uuid } from '$helpers';
import { env } from '$env/dynamic/private';
import type { RequestEvent } from './$types.js';
import type { MoviesResponse, OMDBMoviesResponse } from '$lib/types.js';

const { OMDB_API_KEY, OMDB_API_URL } = env;

async function getResource({ url, setHeaders, fetch }: RequestEvent) {
	const params = url.searchParams;
	const search = params.get('s');
	if (!search || search.trim().length < 1)
		throw { message: 'Query must contain an <s> query param.' };

	const page = params.get('page');
	const type = params.get('type');
	const year = params.get('year');
	const limit = params.get('limit');

	// create URL object of resource
	const api = new URL(OMDB_API_URL);
	const errors: {
		status: number;
		message: string;
	} = {
		status: 200,
		message: ''
	};

	if (search.length > 2) api.searchParams.set('s', search);
	else {
		errors.message = 'Too namy results';
		throw errors;
	}

	if (page) {
		const n = +page;
		if (!isNaN(n) && n > 0) api.searchParams.set('page', n.toString());
		else {
			errors.message = '<page> param must be an integer positive >= 1';
			throw errors;
		}
	}

	if (year) {
		const currentYear = new Date().getFullYear();
		const n = +year;
		if (!isNaN(n) && n <= currentYear) api.searchParams.set('y', n.toString());
		else {
			errors.message = '<year> param must be an integer positive <= ' + currentYear;
			throw errors;
		}
	}

	if (type) {
		if (type === 'movie' || type === 'series' || type === 'episode')
			api.searchParams.set('type', type);
		else {
			errors.message = "<type> param only accept { 'movie'|'series'|'episode' } value.";
			throw errors;
		}
	}

	api.searchParams.set('apikey', OMDB_API_KEY);

	const data = await fetch(api.href);
	if (!data.ok) {
		errors.message = data.statusText;
		errors.status = data.status;
		throw errors;
	}

	const json = (await data.json()) as OMDBMoviesResponse;

	if (!json) throw { message: 'Movies or Series not found.' };
	if (json.Response === 'False') {
		errors.message = json.Error ?? '';
		throw errors;
	}

	if (json.Search) json.Search = json.Search?.filter((m) => m.Poster !== 'N/A');
	if (json.Search.length < 1) {
		errors.message = `${type ? type : 'Movie o Series'} not found.`;
		throw errors;
	}

	const rest = +json.totalResults <= 10 ? +json.totalResults - json.Search.length : false;

	const results = json.Search.map((m) => {
		const obj: Partial<OMDBMoviesResponse> = {};
		for (const key in m) {
			if (key === 'Year' && m[key].endsWith('–')) obj[key.toLowerCase()] = m[key].slice(0, -1);
			else obj[key.toLowerCase()] = m[key];
		}
		return {
			...obj,
			uuid: uuid()
		};
	});

	if (limit) {
		const n = +limit;
		if (!isNaN(n) && n > 0 && json.Search.length > n) json.Search.length = n;
	}

	setHeaders({
		'content-type': 'application/json; charset=utf-8',
		'cache-control': data.headers.get('cache-control') ?? ''
	});

	return new Response(
		JSON.stringify({
			results: results,
			totalResults: !rest ? +json.totalResults : +json.totalResults - rest,
			search: search,
			query: url.searchParams.toString()
		})
	);
}

export async function GET(event) {
	try {
		const response = await getResource(event);
		return response;
	} catch (err) {
		const params = event.url.searchParams;
		const search = params.has('s') ? params.get('s') : false;
		return new Response(
			JSON.stringify({ ...(err as { message: string }), search, query: params.toString() }),
			{
				headers: {
					'content-type': 'application/json; charset=utf-8;'
				},
				status: err.status as number
			}
		);
	}
}
