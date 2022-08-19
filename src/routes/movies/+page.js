
/** @type {import('@sveltejs/kit').PageLoad}*/
export async function load({ url, fetch }) {
	const query = new URLSearchParams(url.search);

	const req = await fetch('/api?' + query.toString());
	const res = await req.json();

	return {
		movies: res
	};
}
