// import { json as json$1 } from '@sveltejs/kit';
// import { env } from '$env/static/private';
import { transform } from '../_transformContract';

// const { OMDB_API_KEY, OMDB_API_URL } = env;

/** @type {import('./$types').RequestHandler} */
async function getResource({ params }) {
	const id = params.id;
	if (!id || !id.startsWith('tt') || id.length < 5) throw { message: 'Not valid id request' };

	const api = new URL('https://www.omdbapi.com');
	api.searchParams.set('i', id);
	api.searchParams.set('plot', 'full');
	api.searchParams.set('apikey', 'eedc324b');

	const timeout = 8000;
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeout);

	const data = await fetch(api.href, {
		signal: controller.signal
	});

	if (!data.ok) throw { message: 'Error fetch data. code ' + data.statusText };

	const json = await data.json();
	clearTimeout(timer);

	if (!json) throw { message: 'item movie not found.' };
	if (json.Response === 'False') throw { message: json.Error };

	// transform response
	const body = transform(json);
	return new Response(JSON.stringify(body), { headers: { 'content-type': 'application/json' } });
}

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
	try {
		const response = await getResource(event);
		// throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
		return response;
	} catch (error) {
		// throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
		// Suggestion (check for correctness before using):
		// return json$1(error, {
		// 	status: 404
		// });
		return new Response(JSON.stringify(error), { headers: { 'content-type': 'application/json' } });
	}
}
