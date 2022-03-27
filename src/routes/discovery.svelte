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
	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';
	import NavbarTop from '$lib/components/ui/NavbarTop.svelte';

	export let movies;
</script>

<!-- <h1>Discovery</h1> -->

<NavbarTop>
	<a class="active" href={'#'}>Suspense</a>
	<a href={'#'}>Terror</a>
	<a href={'#'}>Comedy</a>
</NavbarTop>
<div class="content">
	<CarouselMovies {movies} title="Trends movies" priority="medium" />
</div>
