<script>
	import { onMount } from 'svelte';

	// components
	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import NavbarTop from '$components/navbar/navbarTop.svelte';
	import Hero from '$components/ui/hero.svelte';

	export let data;
	/* let movies = [];
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
		// imgs = data.map((r) => r.results.map((m) => m.poster).slice(0, 4));
	}); */

	let act = 'Suspense';

	const setTab = (tab) => (act = tab);
</script>

<svelte:head>
	<title>Magacine - Discovery</title>
</svelte:head>

<NavbarTop>
	<button on:click={() => setTab('Suspense')} class:active={act === 'Suspense'}>Suspense</button>
	<button on:click={() => setTab('Terror')} class:active={act === 'Terror'}>Terror</button>
	<button on:click={() => setTab('Comedy')} class:active={act === 'Comedy'}>Comedy</button>
</NavbarTop>

{#if act === 'Suspense'}
	<Hero
		words={[
			{ word: act, imgs: data.images },
			{ word: 'Blood', imgs: data.images }
		]}
		copy="all, in Magacine"
	/>
	<CarouselMovies movies={data.movies[0]} full title={act} />

	<CarouselMovies
		movies={data.movies[1]}
		title="{act} {data.movies[1]?.totalResults ?? 'loading'} results"
	/>
{/if}

{#if data.defer}
	{#await data.defer.movies then movies}
		{#if act === 'Terror'}
			{@const images = movies.map((r) => r.results.map((m) => m.poster).slice(0, 4))}
			<Hero words={[{ word: act, imgs: images[0] }]} />
			<CarouselMovies
				movies={movies[0]}
				full
				title="{act} {movies[0]?.totalResults ?? 'loading'} results"
				--card-w="240px"
				--card-h="390px"
			/>
			<CarouselMovies
				movies={movies[1]}
				title="{act} {movies[1]?.totalResults ?? 'loading'} results"
			/>
		{/if}
		{#if act === 'Comedy'}
			{@const images = movies.map((r) => r.results.map((m) => m.poster).slice(0, 4))}
			<Hero words={[{ word: act, imgs: images[2] }]} />
			<CarouselMovies
				movies={movies[2]}
				full
				title="{act} {movies[2]?.totalResults ?? 'loading'} results"
				--card-w="240px"
				--card-h="370px"
			/>
			<CarouselMovies
				movies={movies[3]}
				title="{act} {movies[3]?.totalResults ?? 'loading'} results"
			/>
		{/if}
	{/await}
{/if}
