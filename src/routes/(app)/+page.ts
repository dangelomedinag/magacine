export async function load({ fetch }) {
	const movies = async () => {
		const res = await fetch('/api?s=marvel&type=movie');
		const json = await res.json();
		return json;
	};

	const series = async () => {
		const res = await fetch('/api?s=city&type=series');
		const json = await res.json();
		return json;
	};

	return {
		stream: {
			movies: movies(),
			series: series()
		}
	};
}
