<script context="module">
	/** @type {import("@sveltejs/kit").Load}*/
	export const load = async ({ url, fetch, stuff }) => {
		const search = url.searchParams.has('search');
		const type = url.searchParams.has('type');

		if (!search) {
			return { status: 200 };
		}

		const searchParams = new URLSearchParams();
		searchParams.set('s', url.searchParams.get('search'));
		if (type) searchParams.set('type', url.searchParams.get('type'));

		const data = await fetch('/api?' + searchParams.toString());
		const json = await data.json();

		return {
			stuff: {
				...stuff,
				search: json
			}
		};
	};
</script>

<script>
	import { page } from '$app/stores';

	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';
	import NavbarTop from '$lib/components/ui/NavbarTop.svelte';

	import SearchMovies from '$lib/components/ui/searchMovies.svelte';
	import Toast from '$lib/components/ui/toast.svelte';
	let results = [];
	let value;
</script>

<NavbarTop><a href="/">home</a></NavbarTop>

<SearchMovies bind:results bind:value>
	<CarouselMovies movies={results} title={value} priority="small" />

	<div slot="suggest" class="content">
		<Toast warn>
			Opps! parece que no se encontraron resultados para <span>"{value}"</span>
		</Toast>
		<div>
			<CarouselMovies
				details={false}
				movies={$page.stuff?.suggest.results}
				title="sugesst ({$page.stuff.suggest.totalResults})"
				priority="small"
			/>
		</div>
	</div>
</SearchMovies>

<style>
	.content {
		padding-bottom: var(--gap-content);
	}
</style>
