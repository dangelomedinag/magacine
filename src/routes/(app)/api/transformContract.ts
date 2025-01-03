import { uuid } from '$helpers';
import type { OMDBMovie, MovieItem } from '$lib/types';

export function transform(movie: OMDBMovie) {
	const obj: Partial<MovieItem> = {};
	obj.uuid = uuid();

	for (const key in movie) {
		let value = movie[key];

		if (value === 'N/A' || value === '') {
			value = null;
		}

		if (key === 'Response') {
			value = movie[key] === 'True';
		}

		if (key === 'Ratings' && Array.isArray(movie[key]) && movie[key].length > 0) {
			let newArray = [];

			newArray = movie[key].map((e) => {
				const newRatings: { [index: string]: any } = {};

				if (!Array.isArray(e) && typeof e === 'object') {
					for (const k in e) {
						newRatings[k.toLowerCase()] = e[k];
					}
				}
				return { ...newRatings };
			});

			value = newArray;
		}

		if (value) {
			if (key === 'Year') {
				if (value.trim().endsWith('–')) value = value.slice(0, -1);
			}

			if (key === 'Genre') {
				if (value.includes(',')) value = movie[key].split(',').map((e) => e.trim());
				else value = [];
			}

			if (key === 'Language') {
				if (value.includes(',')) value = movie[key].split(',').map((e) => e.trim());
				else value = [value];
			}
		} else {
			if (key === 'Genre') {
				value = [];
			}
			if (key === 'Language') {
				value = [];
			}
		}

		obj[key.toLowerCase()] = value;
	}

	return obj;
}
