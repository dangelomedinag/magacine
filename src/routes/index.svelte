<script context="module">
	export async function load({ fetch }) {
		const data = await fetch('/api?s=got');
		console.log('index => fetch: ', data.ok, data.status);
		if (!data.ok) {
			const json = await data.json();
			return { status: data.status, error: new Error(json.message) };
		}

		const json = await data.json();
		console.log('index => response.json: ', json.results.length);

		return {
			props: {
				movies: json
			}
		};
	}
</script>

<script>
	import { page } from '$app/stores';

	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';
	import Hero from '$lib/components/ui/hero.svelte';
	import NavbarTop from '$lib/components/ui/NavbarTop.svelte';
	// import Tabs from '$lib/components/ui/tabs.svelte';

	export let movies;
	let act = 'movies';

	const setTab = (tab) => (act = tab);
</script>

<NavbarTop>
	<button on:click={() => setTab('movies')} class:active={act === 'movies'}>Movies</button>
	<button on:click={() => setTab('series')} class:active={act === 'series'}>Series</button>
	<a href="/search">link</a>
</NavbarTop>

<Hero />
<div class="content">
	<!-- tab 1 -->
	{#if act === 'movies'}
		<CarouselMovies
			movies={movies.results}
			title="Top rated  ({movies.totalResults} results)"
			priority="small"
		/>
	{/if}

	<!-- tab 2 -->
	{#if act === 'series'}
		<CarouselMovies
			details={false}
			movies={$page.stuff.suggest.results}
			title="Top rated ({$page.stuff.suggest.totalResults} results)"
			priority="small"
		/>
	{/if}
</div>

<style>
	/* @media (min-width: 576px) {}
	@media (min-width: 768px) {}
	@media (min-width: 992px) {}
	@media (min-width: 1200px) {} */

	.content {
		padding-top: 1em;
	}
</style>
