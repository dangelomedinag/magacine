<script context="module">
	export function load({ stuff }) {
		return {
			props: {
				movies: stuff.movies
			}
		};
	}
</script>

<script>
	// @ts-nocheck
	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';
	import NavbarTop from '$lib/components/ui/NavbarTop.svelte';
	export let movies;
</script>

<NavbarTop>
	<a class="active" href={'#'}>Movies</a>
	<a href={'#'}>Series</a>
</NavbarTop>

<div class="content">
	<CarouselMovies {movies} title="Trending movies" priority="large" />
	<CarouselMovies movies={[]} title="Continue watching" priority="medium" progress />
	<CarouselMovies movies={movies.reverse()} title="Continue watching" priority="medium" progress />
	<CarouselMovies
		movies={movies.sort((a, b) => a.title.length - b.title.length)}
		title="Top rated"
		priority="small"
	/>
</div>

<style>
	/* @media (min-width: 576px) {}
	@media (min-width: 768px) {}
	@media (min-width: 992px) {}
	@media (min-width: 1200px) {} */
</style>
