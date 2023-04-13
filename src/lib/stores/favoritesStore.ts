import { writable } from 'svelte/store';
import type { MovieItem } from '$lib/types';

function customStore() {
	const { subscribe, update, set } = writable<MovieItem[]>([]);

	return {
		subscribe,
		update,
		set,
		toogleFav: (movie: MovieItem) => {
			return update((currentMovies) => {
				// const hasIndex = currentMovies.findIndex((m) => m.imdbid === selectedMovie.imdbid);
				// if (hasIndex) {
				// 	return currentMovies.filter((movie) => movie.imdbid !== selectedMovie.imdbid);
				// }
				const oldlength = currentMovies.length;
				const filter = currentMovies.filter((m) => m.imdbid !== movie.imdbid);
				// const has = c.filter((m) => m.imdbid === selectedMovie.imdbid);

				// if (has.length > 0) {
				// 	return c.filter((movie) => movie.imdbid !== selectedMovie.imdbid);
				// }
				// if (has.length > 0) {
				// 	return c.filter((movie) => movie.imdbid !== selectedMovie.imdbid);
				// }

				return oldlength !== filter.length ? filter : [...currentMovies, movie];
			});
		}
	};
}
export const FavMovies = customStore();
