// import type { MoviesResponse } from '$lib/types';
// import type { MovieItem } from '$lib/types';

type Base = {
	MOVIES: string;
	MOVIE: string;
	[index: string]: string;
};

const BASE: Base = {
	MOVIES: '/api',
	MOVIE: '/api/'
};

type Endpoint = 'MOVIES' | 'MOVIE';

type ApiParams = {
	endpoint: Endpoint;
	params: URLSearchParams | string;
};

export const get = async <T>(fetch: typeof globalThis.fetch, { endpoint, params }: ApiParams) => {
	const response = await fetch(`${BASE[endpoint]}${params.toString()}`);
	const json = (await response.json()) as T;
	return json;
};

// test api funcitons
// const api = { get };

// const request: ApiParams = {
// 	endpoint: 'MOVIE',
// 	params: new URLSearchParams('?s=spider-man&type=movie')
// };
// api.get<MoviesResponse>(fetch, request);
