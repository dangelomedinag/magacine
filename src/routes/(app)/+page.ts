import type { MoviesResponse } from '$lib/types.js';

export async function load({ fetch }) {
	const getMovies = async (endpoint: string): Promise<MoviesResponse> => {
		const res = await fetch(endpoint);
		return res.json();
	};

	const movies = getMovies('/api?s=marvel&type=movie');
	const series = getMovies('/api?s=city&type=series');

	// const series = async () => {
	// 	const res = await fetch('/api?s=city&type=series');
	// 	const json = await res.json();
	// 	return json;
	// };
	// const movies = async (): Promise<MoviesResponse> => {
	// 	const res = await fetch('/api?s=marvel&type=movie');
	// 	const json: MoviesResponse = await res.json();
	// 	return json;
	// };

	// const series = async () => {
	// 	const res = await fetch('/api?s=city&type=series');
	// 	const json = await res.json();
	// 	return json;
	// };

	return {
		stream: {
			movies,
			series
		}
	};
}
