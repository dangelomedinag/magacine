// /** @type {import('@sveltejs/kit').Handle} */
// export function handle({ event, resolve }) {
// 	for (const param in event.params) {
// 		const value = event.params[param];
// 		if (value === 'favicon.png') {
// 			console.log('src/hooks.js', value);
// 			new Response('Ugg!  One of those extra requests again!', { status: 400 });
// 		}
// 	}

// 	return resolve(event);
// }
