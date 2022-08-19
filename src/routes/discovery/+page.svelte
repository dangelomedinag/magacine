<script>
	import { onMount } from 'svelte';

	// components
	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import NavbarTop from '$components/navbar/navbarTop.svelte';
	import Alert from '$components/ui/alert.svelte';
	import Hero from '$components/ui/hero.svelte';

	let movies = [];
	let imgs;
	onMount(async () => {
		const reqs = [
			fetch('/api?s=saw').then((r) => {
				// if (!r.ok) throw r;
				return r.json();
			}),
			fetch('/api?s=blood').then((r) => {
				// if (!r.ok) throw r;
				return r.json();
			}),
			fetch('/api?s=horror').then((r) => {
				// if (!r.ok) throw r;
				return r.json();
			}),
			fetch('/api?s=horror&page=2').then((r) => {
				// if (!r.ok) throw r;
				return r.json();
			}),
			fetch('/api?s=comedy').then((r) => {
				// if (!r.ok) throw r;
				return r.json();
			}),
			fetch('/api?s=comedy&page=2').then((r) => {
				// if (!r.ok) throw r;
				return r.json();
			})
		];

		const res = await Promise.all(reqs);
		const data = res.map((e) => (e.message ? new Error(e.message) : e));

		movies = data;
		imgs = data.map((r) => r.results.map((m) => m.poster).slice(0, 4));
	});

	let act = 'suspense';

	const setTab = (tab) => (act = tab);
</script>

<svelte:head>
	<title>Magacine - Discovery</title>
</svelte:head>

<NavbarTop>
	<button on:click={() => setTab('suspense')} class:active={act === 'suspense'}>Suspense</button>
	<button on:click={() => setTab('terror')} class:active={act === 'terror'}>Terror</button>
	<button on:click={() => setTab('comedy')} class:active={act === 'comedy'}>Comedy</button>
</NavbarTop>

<div class="wrapper">
	{#if act === 'suspense'}
		<CarouselMovies movies={movies[0]} full title="Suspense" --card-w="240px" --card-h="390px" />
		{#if imgs}
			<Hero
				words={[{ word: 'Suspense', imgs: imgs[0] }, { word: 'Blood' }]}
				copy="all, in Magacine"
				paragraph=""
			/>
		{/if}
		<CarouselMovies
			movies={movies[1]}
			title="Suspense  {movies[1]?.totalResults ?? 'loading'} results"
		/>
	{/if}
	{#if act === 'terror'}
		<Hero words={[{ word: 'Terror', imgs: imgs[2] }]} />
		<CarouselMovies
			movies={movies[2]}
			full
			title="Terror  {movies[2]?.totalResults ?? 'loading'} results"
			--card-w="240px"
			--card-h="390px"
		/>
		<CarouselMovies
			movies={movies[3]}
			title="Terror  {movies[3]?.totalResults ?? 'loading'} results"
		/>
	{/if}
	{#if act === 'comedy'}
		<CarouselMovies
			movies={movies[4]}
			full
			title="Comedy  {movies[4]?.totalResults ?? 'loading'} results"
			--card-w="240px"
			--card-h="370px"
		/>
		<Hero words={[{ word: 'Comedy', imgs: imgs[4] }]} />
		<CarouselMovies
			movies={movies[5]}
			title="Comedy  {movies[5]?.totalResults ?? 'loading'} results"
		/>
	{/if}
</div>

<style>
	.wrapper {
		/* padding-top: 2em; */
	}
</style>
