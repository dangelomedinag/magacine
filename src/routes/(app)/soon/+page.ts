import type { MoviesResponse } from '$lib/types.js';
import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
	const req = await fetch('/api?s=america&year=2022');

	if (!req.ok) {
		const res = await req.json();
		error(500, res.message);
	}

	const res: Promise<MoviesResponse> = req.json();

	return {
		movies: res
	};
}
