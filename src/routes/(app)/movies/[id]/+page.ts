import { randomInt } from '$helpers';
import { error } from '@sveltejs/kit';

const getWord = (movie) => {
	const { genre, plot } = movie;
	let selected: string = '';

	if (plot) {
		const plotArr = plot.split(' ');
		const plotArrFilter = plotArr.filter((word) => word.length > 4 && !word.includes('-'));
		selected = plotArrFilter[randomInt(plotArrFilter.length - 1)];
	} else {
		if (genre.length > 0) {
			selected = genre[randomInt(genre.length - 1)];
		}
	}

	return selected;
};

async function getSuggest(word, fetch) {
	try {
		const req = await fetch('/api?s=' + word.toLowerCase().replace(/\.|\(|\)|"|'|,|\$|-/g, ''));

		if (!req.ok) throw Error('bad request');

		return await req.json();
	} catch (error) {
		return Error(error.message);
	}
}

export async function load({ fetch, params, setHeaders }) {
	try {
		const req = await fetch('/api/' + params.id);

		if (!req.ok) throw req;

		const cacheControl = req.headers.get('cache-control');
		if (cacheControl) {
			setHeaders({ 'cache-control': cacheControl });
		}

		const movie = await req.json();

		const response = {
			movie
		};
		const word = getWord(movie);
		console.log(word);

		if (word.length > 0) {
			response.stream = { suggestions: getSuggest(word, fetch) };
		} else {
			response.error = Error('No content for now');
		}

		console.log(response);

		return response;
	} catch (err) {
		const msg = await err.json();
		throw error(err.status, `${params.id} - ${msg.message}`);
	}
}
