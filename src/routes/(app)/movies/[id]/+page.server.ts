import { error } from '@sveltejs/kit';
import type { MovieItem, MoviesResponse } from '$lib/types.js';
import { extractWordFromPlot } from './index.js';

type Response = {
	movie: MovieItem;
	stream?: {
		suggestions: Promise<MoviesResponse>;
	};
	error?: string;
};

async function getSuggest(word: string, fetch: typeof globalThis.fetch): Promise<MoviesResponse> {
	const req = await fetch('/api?s=' + word);

	if (!req.ok) throw Error('bad request');
	return await req.json();
}

export async function load({ fetch, params, setHeaders, locals }) {
	try {
		const req = await fetch('/api/' + params.id);
		if (!req.ok) throw req;

		// if (locals.user) {
		// 	const cacheControl = req.headers.get('cache-control');
		// 	if (cacheControl) setHeaders({ 'cache-control': cacheControl });
		// }

		const movie = await req.json();

		const response: Response = {
			movie
		};

		const word = extractWordFromPlot(movie);

		if (word.length > 0) {
			response.stream = {
				suggestions: getSuggest(word, fetch)
			};
		} else {
			response.error = '<span>No content related</span> to your last search';
		}

		return response;
	} catch (err) {
		throw error(404, `${params.id} - ${err.message}`);
	}
}
