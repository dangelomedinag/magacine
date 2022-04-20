<script>
	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';
	import NavbarTop from '$lib/components/ui/NavbarTop.svelte';
	import SearchMovies from '$lib/components/ui/searchMovies.svelte';
	import { page } from '$app/stores';
	$: stuff = $page.stuff;

	let results = [];
	let value;
	// $: console.log(results);
</script>

<!-- <h1>Discovery</h1> -->

<NavbarTop>
	<a class="active" href={'#'}>Suspense</a>
	<a href={'#'}>Terror</a>
	<a href={'#'}>Comedy</a>
</NavbarTop>

<SearchMovies bind:results bind:value>
	<CarouselMovies movies={results} title="Search" priority="small" />
	<div slot="suggest">
		<CarouselMovies movies={stuff.fast} title="suggest" priority="small" />
	</div>
</SearchMovies>
<div class="content">
	<CarouselMovies movies={stuff.fast} title="top releases" priority="small" />
</div>
