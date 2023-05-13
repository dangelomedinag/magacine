import { randomInt } from '$helpers';
import type { MovieItem } from '$lib/types';

export function extractWordFromPlot(movie: MovieItem) {
	const { genre, plot } = movie;
	let selected: string = '';

	if (plot) {
		const plotArr = plot.split(' ');
		const plotArrFilter = plotArr.filter((word) => word.length > 4 && !word.includes('-'));
		selected = plotArrFilter[randomInt(plotArrFilter.length - 1)];
	} else {
		if (genre.length > 0) selected = genre[randomInt(genre.length - 1)];
	}

	if (selected !== '') selected.toLowerCase().replace(/\.|\(|\)|"|'|,|\$|-/g, '');

	return selected;
}
