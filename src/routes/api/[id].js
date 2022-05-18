import { API_KEY } from '$lib/_env';
import { logHours } from '$lib/helpers/logs';
import { transform } from './_transformContract';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(event) {
	console.log(`=======[${logHours()}]=======`);
	console.log(`[id] === ${event.params.id}]`);

	// get params
	const id = event.params.id;

	if (id === 'favicon.png') {
		return {
			status: 403
		};
	}

	const API_URL = new URL('https://www.omdbapi.com');
	API_URL.searchParams.set('i', id);
	API_URL.searchParams.set('apikey', API_KEY);

	try {
		const timeout = 8000;
		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), timeout);

		const data = await fetch(API_URL.href, {
			signal: controller.signal
		});
		const json = await data.json();

		clearTimeout(id);

		if (json.Response === 'False') {
			throw new Error(json.Error);
		}

		// transform response
		const body = transform(json);

		return {
			status: data.status,
			body
		};
	} catch (error) {
		console.log(`res => error:`, error.message);
		console.log(`===============`);
		return {
			status: 404,
			body: { message: error.message }
		};
	}
}
