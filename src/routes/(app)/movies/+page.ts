import { error } from '@sveltejs/kit';

const getMore = async ({ totalResults, query, search }, fetch) => {
	// const pages = Math.ceil(totalResults / 10)
	// if (pages < 5) return

	const arrPages = Array(5)
		.fill('')
		.map((_, i) => fetch(`/api?${query}&page=${i + 2}`).then((r) => r.json()));

	console.log({ arrPages });

	// const arr = [
	// 	fetch('/api?s=marvel&page=2').then((r) => r.json()),
	// 	fetch('/api?s=marvel&page=3').then((r) => r.json()),
	// 	fetch('/api?s=marvel&page=4').then((r) => r.json()),
	// 	fetch('/api?s=marvel&page=5').then((r) => r.json()),
	// 	fetch('/api?s=marvel&page=6').then((r) => r.json()),
	// 	fetch('/api?s=marvel&page=7').then((r) => r.json())
	// ];

	const res = await Promise.all(arrPages);
	const res_filter = res.filter((e) => e.results);
	console.log(res_filter);

	// const json = pagesRes.reduce(
	// 	(acc, curr) => {
	// 		acc.results = [...acc.results, ...curr.results];
	// 		return acc;
	// 	},
	// 	{ results: [], totalResults, query, search }
	// );

	// await new Promise((res) => {
	// 	return setTimeout(res, 1500);
	// });

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

	// try {
	// 	const req = await fetch('/api?s=marvel');
	// 	if (!req.ok) throw req;
	// 	const cacheControl = req.headers.get('cache-control');
	// 	if (cacheControl) setHeaders({ 'cache-control': cacheControl });

	// 	const res = await req.json();

	// 	return {
	// 		movies: res
	// 	};
	// } catch (err) {
	// 	const res = await err.json();
	// 	throw error(err.status, res.message);
	// }

	// console.log(url.searchParams.get('type'));
}
