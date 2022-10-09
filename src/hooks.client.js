/**@type {import("@sveltejs/kit").handleClientError} */
export function handleError({ error }) {
	console.log('hooks.client.js', { error });
	return {
		message: error.message
	};
}
