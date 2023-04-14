// import type { PageLoad } from './$types';

export async function load({ fetch }) {
	const essecial = [
		fetch('/api?s=saw').then((r) => r.json()),
		fetch('/api?s=blood').then((r) => r.json())
	];

	const defer = [
		fetch('/api?s=horror').then((r) => r.json()),
		fetch('/api?s=horror&page=2').then((r) => r.json()),
		fetch('/api?s=comedy').then((r) => r.json()),
		fetch('/api?s=comedy&page=2').then((r) => r.json())
	];

	const getMovies = async (arr_movies: Promise<any>[]) => {
		const res = await Promise.all(arr_movies);
		return res;
	};

	const movies = await getMovies(essecial);
	const images = movies.map((r) => r.results.map((m) => m.poster).slice(0, 4));

	return {
		movies,
		images: images[0],
		defer: {
			movies: getMovies(defer)
		}
	};
}
