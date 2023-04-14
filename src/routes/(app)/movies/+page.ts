import { error } from '@sveltejs/kit';

const getMore = async ({ totalResults, query, search }, fetch) => {
	const arrPages = Array(5)
		.fill('')
		.map((_, i) => fetch(`/api?${query}&page=${i + 2}`).then((r) => r.json()));

	const res = await Promise.all(arrPages);
	const res_filter = res.filter((e) => e.results);

	return res_filter;
};

export async function load({ url, fetch, setHeaders }) {
	if (url.searchParams.has('s')) {
		try {
			const req = await fetch('/api' + url.search.toString());
			if (!req.ok) throw req;
			const cacheControl = req.headers.get('cache-control');
			if (cacheControl) setHeaders({ 'cache-control': cacheControl });
			const res = await req.json();

			const response = {
				movies: res
			};

			const pages = Math.ceil(res.totalResults / 10);
			if (pages > 5) {
				response.stream = { data: getMore(res, fetch) };
			}

			return response;
		} catch (err) {
			const res = await err.json();
			throw error(err.status, res.message);
		}
	}
}
