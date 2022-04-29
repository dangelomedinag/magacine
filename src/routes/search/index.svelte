<script context="module">
	/** @type {import("@sveltejs/kit").Load}*/
	export const load = async ({ url, fetch, stuff }) => {
		const search = url.searchParams.has('search');
		const type = url.searchParams.has('type');

		if (!search) {
			return { status: 200 };
		}

		const api_url = new URL(`${url.origin}/api`);
		api_url.searchParams.set('s', url.searchParams.get('search'));
		if (type) api_url.searchParams.set('type', url.searchParams.get('type'));
		const data = await fetch(api_url.href);
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
	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';

	import SearchMovies from '$lib/components/ui/searchMovies.svelte';
	import Toast from '$lib/components/ui/toast.svelte';
	import { page } from '$app/stores';
	let results = [];
	let value;
</script>

<SearchMovies bind:results bind:value>
	<CarouselMovies movies={results} title={value} priority="small" />

	<div slot="suggest" class="content">
		<Toast warn>
			Opps! parece que no se encontraron resultados para <span>"{value}"</span>
		</Toast>
		<div>
			<CarouselMovies movies={$page.stuff.shrek} title="sugesst" priority="small" />
		</div>
	</div>
</SearchMovies>
