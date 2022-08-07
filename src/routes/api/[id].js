import { env } from '$env/dynamic/private';
import { transform } from './_transformContract';

const { OMDB_API_KEY, OMDB_API_URL } = env;

/** @type {import('@sveltejs/kit').RequestHandler} */
async function getResource({ params }) {
	const id = params.id;
	if (!id || !id.startsWith('tt') || id.length < 5) throw { message: 'Not valid id request' };

	const api = new URL(OMDB_API_URL);
	api.searchParams.set('i', id);
	api.searchParams.set('plot', 'full');
	api.searchParams.set('apikey', OMDB_API_KEY);

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

	return {
		status: data.status,
		body
	};
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET(event) {
	try {
		const response = await getResource(event);
		return response;
	} catch (error) {
		return {
			status: 404,
			body: error
		};
	}
}
