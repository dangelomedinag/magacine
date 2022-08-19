

<script>
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import NavbarTop from '$components/navbar/navbarTop.svelte';

	export let movies;
</script>

<NavbarTop />

<div class="wrapper content">
	<h1>Next Releases</h1>
</div>

<CarouselMovies {movies} title="comming soom" />

<style>
	.wrapper {
		padding-top: 1em;
	}

	h1 {
		font-size: 2rem;
	}
</style>
