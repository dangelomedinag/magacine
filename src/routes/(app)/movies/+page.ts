import type { MoviesResponse } from '$lib/types.js';
import { error } from '@sveltejs/kit';

type Res = {
	movies: MoviesResponse;
	page?: number;
	stream?: {
		data: Promise<MoviesResponse[]>;
	};
};

const getMore = async ({ query }: MoviesResponse, fetch: typeof globalThis.fetch, baseURL: URL) => {
	const url = new URL(baseURL.origin + '/api?' + baseURL.searchParams.toString());
	url.searchParams.delete('page');
	const API_REQUEST_URL = (n: number) => {
		url.searchParams.set('page', (n + 2).toString());
		return url;
	};

	// console.log(API_REQUEST_URL(2));
	const arrPages: Promise<MoviesResponse>[] = Array(5)
		.fill('')
		.map((_, i) => fetch(API_REQUEST_URL(i)).then((r) => r.json()));
	// .map((_, i) => fetch(`/api?${query}&page=${i + 2}`).then((r) => r.json()));

	const res = await Promise.all(arrPages);
	const res_filter = res.filter((e) => e.results);

	return res_filter;
};

export async function load({ url, fetch, setHeaders }) {
	// console.log(url);
	try {
		const searchParams = new URL(url).searchParams;
		searchParams.delete('page');
		const req = await fetch(url.origin + '/api?' + searchParams.toString());
		if (!req.ok) throw req;
		const cacheControl = req.headers.get('cache-control');
		if (cacheControl) setHeaders({ 'cache-control': cacheControl });
		const res: MoviesResponse = await req.json();
		const page = url.searchParams.has('page');
		const response: Res = {
			movies: res,
			page: page ? +page : undefined
		};

		const pages = Math.ceil(res.totalResults / 10);
		if (pages > 5) {
			response.stream = { data: getMore(res, fetch, url) };
		}

		return response;
	} catch (err) {
		// @ts-ignore
		const res = await err.json();
		// @ts-ignore
		throw error(err.status, res.message);
	}
	// }
}
