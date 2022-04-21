<script>
	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';
	import NavbarTop from '$lib/components/ui/NavbarTop.svelte';
	import SearchMovies from '$lib/components/ui/searchMovies.svelte';
	import { page } from '$app/stores';
	import Toast from '$lib/components/ui/toast.svelte';
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
	<div slot="suggest" class="content">
		<Toast warn>
			Opps! parece que no se encontraron resultados para <span>"{value}"</span>
		</Toast>
		<CarouselMovies movies={stuff.fast} title="suggest" priority="small" />
	</div>
	<CarouselMovies movies={results} title={value} priority="small" />
</SearchMovies>
<div class="content">
	<CarouselMovies movies={stuff.fast} title="top releases" priority="small" />
</div>
