<script>
	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import NavbarTop from '$components/navbar/navbarTop.svelte';
	/** @type {import("./$types").PageData}*/
	export let data;

	
</script>

<NavbarTop />

<div class="wrapper content">
	<h1>Next Releases</h1>
</div>

<CarouselMovies movies={data.movies} title="comming soom" />

<style>
	.wrapper {
		padding-top: 1em;
	}

	h1 {
		font-size: 2rem;
	}
</style>
