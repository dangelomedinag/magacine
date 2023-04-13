import { transform } from '../transformContract';
import { OMDB_API_KEY } from '$env/static/private';
import { PUBLIC_OMDB_API_URL } from '$env/static/public';

async function getResource({ params }) {
	const id = params.id;
	if (!id || !id.startsWith('tt') || id.length < 5) throw { message: 'Not valid id request' };

	const api = new URL(PUBLIC_OMDB_API_URL);
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

	const cacheControl = data.headers.get('cache-control');

	const json = await data.json();
	clearTimeout(timer);

	if (!json) throw { message: 'item movie not found.' };
	if (json.Response === 'False') throw { message: json.Error };

	// transform response
	const body = transform(json);
	return new Response(JSON.stringify(body), {
		headers: {
			'content-type': 'application/json',
			'cache-control': cacheControl ?? 'unknowk'
		}
	});
}

export async function GET(event) {
	try {
		const response = await getResource(event);
		return response;
	} catch (err) {
		return new Response(JSON.stringify(err), {
			headers: { 'content-type': 'application/json; charset=utf-8;' },
			status: 404
		});
	}
}
