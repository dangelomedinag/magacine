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
	// import NavbarTop from '$lib/components/ui/NavbarTop.svelte';
	import SearchMovies from '$lib/components/ui/searchMovies.svelte';
	import Tabs from '$lib/components/ui/tabs.svelte';
	import Toast from '$lib/components/ui/toast.svelte';

	export let avengers, flash, batman, tahm, got;

	// let tab = 'movies';
	let tabs = ['Movies', 'Series'];
	let results = [];
	let value;
</script>

<!-- <NavbarTop>
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
</NavbarTop> -->

<!-- <SearchMovies bind:results bind:value>
	<CarouselMovies movies={results} title={value} priority="small" />
	<div slot="suggest" class="content">
		<Toast warn>
			Opps! parece que no se encontraron resultados para <span>"{value}"</span>
		</Toast>
	</div>
</SearchMovies> -->

<!-- <div class="content">
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
		<CarouselMovies movies={got} title="Game of thrones" priority="large" />
		<CarouselMovies movies={tahm} title="Top rated" priority="medium" />
	{/if}
</div> -->

<Tabs {tabs}>
	<svelte:fragment let:active>
		<!-- <SearchMovies bind:results bind:value>
			<CarouselMovies movies={results} title={value} priority="small" />
			<div slot="suggest" class="content">
				<Toast warn>
					Opps! parece que no se encontraron resultados para <span>"{value}"</span>
				</Toast>
			</div>
		</SearchMovies> -->

		<div class="content">
			{#if active == tabs[0]}
				<CarouselMovies movies={avengers} title="The Avengers" priority="large" />
				<CarouselMovies
					movies={flash.map((m) => ({ ...m, progress: Math.floor(Math.random() * 100) + 1 }))}
					title="Continue watching"
					priority="medium"
					progress
				/>
				<CarouselMovies movies={batman} title="Top rated" priority="small" />
			{/if}

			{#if active == tabs[1]}
				<CarouselMovies movies={got} title="Game of thrones" priority="large" />
				<CarouselMovies movies={tahm} title="Top rated" priority="medium" />
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
		/* padding-bottom: ; */
	}
</style>
