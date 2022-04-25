<script>
	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';
	import NavbarTop from '$lib/components/ui/NavbarTop.svelte';
	import { page } from '$app/stores';
	$: stuff = $page.stuff;
</script>

<NavbarTop>
	<a class="active" href={'#'}>Suspense</a>
	<a href={'#'}>Terror</a>
	<a href={'#'}>Comedy</a>
</NavbarTop>

<div class="content">
	<CarouselMovies movies={stuff.fast} title="top releases" priority="small" />
</div>
