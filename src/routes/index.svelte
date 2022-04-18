<script context="module">
	export async function load({ fetch }) {
		const API_URL = '/api?';
		const queries = [
			's=avengers&type=movie',
			's=flash&type=movie',
			's=batman&type=movie',
			's=two and half men&type=series',
			's=game of thrones&type=series'
		];
		let promises = [];

		queries.forEach((query) => {
			promises.push(fetch(API_URL + query).then((res) => res.json()));
		});

		const movies = await Promise.all(promises).then((values) => values);

		return {
			props: {
				avengers: movies[0].Search,
				flash: movies[1].Search,
				batman: movies[2].Search,
				tahm: movies[3].Search,
				got: movies[4].Search
			}
		};
	}
</script>

<script>
	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';
	import NavbarTop from '$lib/components/ui/NavbarTop.svelte';
	export let avengers, flash, batman, tahm, got;

	let tab = 'movies';
</script>

<NavbarTop>
	<a
		class:active={tab === 'movies'}
		href={'#'}
		on:click={(e) => {
			tab = 'movies';
		}}>Movies</a
	>
	<a
		class:active={tab === 'series'}
		href={'#'}
		on:click={(e) => {
			tab = 'series';
		}}>Series</a
	>
</NavbarTop>

<div class="content">
	{#if tab === 'movies'}
		<CarouselMovies movies={avengers} title="The Avengers" priority="large" />
		<CarouselMovies
			movies={flash.map((m) => ({ ...m, progress: Math.floor(Math.random() * 100) + 1 }))}
			title="Continue watching"
			priority="medium"
			progress
		/>
		<CarouselMovies movies={batman} title="Top rated" priority="small" />
	{:else}
		<CarouselMovies movies={got} title="game of thrones" priority="large" />
		<CarouselMovies movies={tahm} title="Top rated" priority="medium" />
	{/if}
</div>

<style>
	/* @media (min-width: 576px) {}
	@media (min-width: 768px) {}
	@media (min-width: 992px) {}
	@media (min-width: 1200px) {} */
</style>
