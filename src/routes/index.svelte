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
	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';
	import Tabs from '$lib/components/ui/tabs.svelte';

	export let movies;
	// export let avengers, flash, batman, tahm, got;

	let tabs = ['Movies', 'Series'];
</script>

<Tabs {tabs}>
	<svelte:fragment let:active>
		<div class="content">
			{#if active == tabs[0]}
				<CarouselMovies
					movies={movies.results}
					title="Top rated  ({movies.totalResults} results)"
					priority="small"
				/>
			{/if}

			{#if active == tabs[1]}
				<!-- <CarouselMovies movies={got} title="Game of thrones" priority="large" />
				<CarouselMovies movies={tahm} title="Top rated" priority="medium" /> -->
			{/if}
		</div>
	</svelte:fragment>
</Tabs>

<style>
	/* @media (min-width: 576px) {}
	@media (min-width: 768px) {}
	@media (min-width: 992px) {}
	@media (min-width: 1200px) {} */

	.content {
		padding-top: 1em;
	}
</style>
