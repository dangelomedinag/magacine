import type { MoviesResponse } from '$lib/types.js';

type SearchLoadResponse<T = MoviesResponse> = {
	movies?: Promise<T>;
	suggest: {
		movies: null | Promise<T>;
	};
	layout: { search: boolean };
};

const get = async (request: Promise<Response>): Promise<MoviesResponse> => {
	const res = await request;
	const json = await res.json();
	return json;
};

export function load({ fetch, url, depends }) {
	depends('search:load');

	let data: SearchLoadResponse = {
		movies: undefined,
		suggest: {
			movies: null
		},
		layout: { search: false }
	};

	const searchParams = url.searchParams;
	const searchText = searchParams.has('s');
	searchParams.toString();
	if (searchText) {
		const request = fetch('/api?' + searchParams.toString());
		const response = get(request);
		data.movies = response;
	}

	const requestSuggest = fetch('/api?s=marvel');
	const responseSuggest = get(requestSuggest);
	data.suggest.movies = responseSuggest;

	return data;
}
