<script context="module">
	export async function load({ fetch }) {
		const req = await fetch('/api?s=america&year=2022');
		if (!req.ok) {
			const res = await req.json();
			return { status: req.status, error: new Error(res.message) };
		}

		const res = await req.json();

		return {
			props: {
				movies: res
			}
		};
	}
</script>

<script>
	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import NavbarTop from '$components/navbar/navbarTop.svelte';

	export let movies;
</script>

<NavbarTop />

<div class="content">
	<h1>Next Releases</h1>

	<CarouselMovies {movies} title="comming soom" />
</div>

<style>
	h1 {
		font-size: 2rem;
	}
</style>
