<!-- <script context="module">
	/** @type {import("@sveltejs/kit").LoadEvent} */
	export async function load({ fetch }) {
		const req = await fetch('/api?s=got');
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
</script> -->
<script context="module">
	export const prerender = true;
</script>

<script>
	import { goto } from '$app/navigation';
	import { page, session } from '$app/stores';

	import CarouselMovies from '$components/ui/CarouselMovies.svelte';
	import Hero from '$components/ui/hero.svelte';
	import NavbarTop from '$components/ui/NavbarTop.svelte';
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

	let act = 'series';

	const setTab = (tab) => {
		goto('#index-movies');
		act = tab;
	};
</script>

<svelte:head>
	<title>Magacine - home</title>
</svelte:head>

<NavbarTop>
	<button on:click={() => setTab('series')} class:active={act === 'series'}>Series</button>
	<button on:click={() => setTab('movies')} class:active={act === 'movies'}>Movies</button>
</NavbarTop>

<Hero />
<div class="content">
	{#if $session.user}
		<h1>¡Welcome again, <span>{$session.user.name}</span>!</h1>
	{/if}

	<div id={'index-movies'}>
		<!-- tab 1 -->
		{#if act === 'series'}
			<CarouselMovies
				details={false}
				movies={$page.stuff.suggest}
				title="Top rated ({$page.stuff.suggest.totalResults} results)"
				priority="small"
			/>
		{/if}
		<!-- tab 2 -->
		{#if act === 'movies'}
			<CarouselMovies
				details={false}
				{movies}
				title="Top rated  ({movies.totalResults} results)"
				priority="small"
			/>
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
	}

	span {
		font-weight: normal;
	}
</style>
