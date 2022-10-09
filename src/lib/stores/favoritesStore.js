import { writable } from 'svelte/store';

function customStore() {
	const { subscribe, update, set } = writable([]);

	return {
		subscribe,
		update,
		set,
		toogleFav: (selectedMovie) => {
			return update((c) => {
				const has = c.filter((m) => m.imdbid === selectedMovie.imdbid);
				if (has.length > 0) {
					return c.filter((movie) => movie.imdbid !== selectedMovie.imdbid);
				}

				return [...c, selectedMovie];
			});
		}
	};
}
export const FavMovies = customStore();
