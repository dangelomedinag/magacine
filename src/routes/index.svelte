<script>
	import { page, session } from '$app/stores';
	import CarouselMovies from '$components/ui/CarouselMovies.svelte';
	import Hero from '$components/ui/hero.svelte';
	import NavbarTop from '$components/ui/NavbarTop.svelte';
	import { scrollToTarget } from '$lib/helpers';
	import { onMount } from 'svelte';

	let movies;

	onMount(async () => {
		const req = await fetch('/api?s=got');
		if (!req.ok) {
			const res = await req.json();
			return { status: req.status, error: new Error(res.message) };
		}

		movies = await req.json();
	});

	let act = 'movies';

	const setTab = (tab) => {
		act = tab;
	};
</script>

<svelte:head>
	<title>Magacine - home</title>
</svelte:head>
<!-- use:smoothScroll={{ href: '#index-movies', tab: 'movies' }} -->
<!-- use:smoothScroll={{ href: '#index-movies', tab: 'series' }} -->

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

<div class="content">
	{#if $session.user}
		<h1>¡Welcome again, <span>{$session.user.name}</span>!</h1>
	{/if}
	<div id="index-movies">
		{#if act === 'movies'}
			<CarouselMovies
				details={false}
				movies={$page.stuff.suggest}
				title="Our pick for {$session.user.name}"
			/>
		{/if}

		{#if act === 'series'}
			<CarouselMovies details={false} {movies} title="Our pick for {$session.user.name}" />
		{/if}
	</div>
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
