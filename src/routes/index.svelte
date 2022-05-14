<script context="module">
	export async function load({ fetch }) {
		const req = await fetch('/api?s=got');
		// console.log('index => fetch: ', req.ok, req.status);
		if (!req.ok) {
			const res = await req.json();
			return { status: req.status, error: new Error(res.message) };
		}

		const res = await req.json();
		// console.log('index => response.json: ', res.results.length);

		return {
			props: {
				movies: res
			}
		};
	}
</script>

<script>
	import { page } from '$app/stores';

	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';
	import Hero from '$lib/components/ui/hero.svelte';
	import NavbarTop from '$lib/components/ui/NavbarTop.svelte';

	export let movies;
	let act = 'series';

	const setTab = (tab) => (act = tab);
</script>

<NavbarTop>
	<button on:click={() => setTab('series')} class:active={act === 'series'}>Series</button>
	<button on:click={() => setTab('movies')} class:active={act === 'movies'}>Movies</button>
</NavbarTop>

<Hero />
<div class="content">
	<!-- tab 1 -->
	{#if act === 'series'}
		<CarouselMovies
			details={false}
			movies={$page.stuff.suggest}
			title="Top rated ({$page.stuff.suggest.totalResults} results)"
			priority="small"
		/>
	{/if}
	<!-- tab 2 -->
	{#if act === 'movies'}
		<CarouselMovies {movies} title="Top rated  ({movies.totalResults} results)" priority="small" />
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
