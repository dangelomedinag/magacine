<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import Hero from '$components/ui/hero.svelte';
	import NavbarTop from '$components/navbar/navbarTop.svelte';

	import { scrollToTarget } from '$helpers';

	let movies = [];

	onMount(async () => {
		const reqs = [
			fetch('/api?s=marvel&type=movie').then((r) => {
				// if (!r.ok) throw r;
				return r.json();
			}),
			fetch('/api?s=city&type=series').then((r) => {
				// if (!r.ok) throw r;
				return r.json();
			})
		];

		const res = await Promise.all(reqs);
		const data = res.map((e) => (e.message ? new Error(e.message) : e));
		console.log(data);
		movies = data;
	});

	let act = 'movies';

	const setTab = (tab) => {
		act = tab;
	};

	console.log($page.data.user);
</script>

<svelte:head>
	<title>Magacine - home</title>
</svelte:head>

<NavbarTop>
	<button
		use:scrollToTarget={{ target: '#index-movies' }}
		on:click={() => setTab('movies')}
		class:active={act === 'movies'}>Movies</button
	>
	<button
		use:scrollToTarget={{ target: '#index-movies' }}
		on:click={() => setTab('series')}
		class:active={act === 'series'}>Series</button
	>
</NavbarTop>

<Hero />

<!-- <div class="content">
	{#if $session.user}
		<h1>¡Welcome again, <span>{$session.user.name}</span>!</h1>
	{/if}
</div> -->

<div id="index-movies">
	{#if act === 'movies'}
		<CarouselMovies
			details={false}
			movies={movies[0]}
			title="Our pick for {$page.data.user.name}"
			--card-w="220px"
			--card-h="370px"
		/>
	{/if}

	{#if act === 'series'}
		<CarouselMovies
			details={false}
			movies={movies[1]}
			title="Our pick for {$page.data.user.name}"
		/>
	{/if}
</div>

<style>
	/* @media (min-width: 576px) {}
	@media (min-width: 768px) {}
	@media (min-width: 992px) {}
	@media (min-width: 1200px) {} */

	.content {
		padding-top: 1em;
	}

	h1 {
		font-size: 2rem;
		margin-top: 0;
		font-weight: lighter;
		text-align: center;
	}

	span {
		font-weight: normal;
	}
</style>
