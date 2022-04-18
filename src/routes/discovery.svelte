<script>
	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';
	import NavbarTop from '$lib/components/ui/NavbarTop.svelte';
	import SearchMovies from '$lib/components/ui/searchMovies.svelte';
	import { page } from '$app/stores';
	$: stuff = $page.stuff;

	let results = [];
	// $: console.log(results);
</script>

<!-- <h1>Discovery</h1> -->

<NavbarTop>
	<a class="active" href={'#'}>Suspense</a>
	<a href={'#'}>Terror</a>
	<a href={'#'}>Comedy</a>
</NavbarTop>

<div class="content">
	<SearchMovies bind:results>
		<CarouselMovies movies={results} title="Search" priority="small" />
		<div slot="suggest">
			Opps! parece que no esta disponible lo que busca...
			<div>quizas quieras echar un vistazo a:</div>
			<CarouselMovies movies={stuff.shrek} priority="small" />
		</div>
	</SearchMovies>
	<CarouselMovies movies={stuff.fast} title="top releases" priority="small" />
</div>
