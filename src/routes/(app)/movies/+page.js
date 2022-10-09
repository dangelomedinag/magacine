import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad}*/
export async function load({ url, fetch }) {
	try {
		const req = await fetch('/api' + url.search.toString());
		if (!req.ok) throw req;
		const res = await req.json();
		return {
			movies: res
		};
	} catch (err) {
		const res = await err.json();
		error(err.status, res.message);
	}
}
