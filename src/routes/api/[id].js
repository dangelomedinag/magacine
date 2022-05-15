import { API_KEY } from './_env';

function logHours() {
	const date = new Date();
	return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(event) {
	console.log(`=======[${logHours()}]=======`);
	console.log(`[id] === ${event.params.id}]`);

	// get params
	const id = event.params.id;

	// create URL object for get resource
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

		clearTimeout(id);

		const json = await data.json();

		if (json.Response === 'False') {
			throw new Error(json.Error);
		}

		let obj = {};

		for (const key in json) {
			let value = json[key];

			if (value === 'N/A' || value === '') {
				value = null;
			}
			if (key === 'Response') {
				value = json[key] === 'True';
			}

			if (value) {
				if (key === 'Year') {
					if (value.trim().endsWith('–')) value = value.slice(0, -1);
				}

				if (key === 'Genre') {
					if (value.includes(',')) value = json[key].split(',').map((e) => e.trim());
					else value = [];
				}

				if (key === 'Language') {
					if (value.includes(',')) value = json[key].split(',').map((e) => e.trim());
					else value = [value];
				}
			} else {
				if (key === 'Genre') {
					value = [];
				}
				if (key === 'Language') {
					value = [];
				}
			}

			obj[key.toLowerCase()] = value;
		}

		// console.log(`res => status:`, data.status);
		// console.log(`{ ...movie, response: ${obj.response} }`);
		// console.log(`===============`);

		return {
			status: data.status,
			body: obj
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
