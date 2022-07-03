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
<script>
	// import { goto } from '$app/navigation';
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

	let act = 'movies';

	const setTab = (tab) => {
		// goto('#index-movies');
		act = tab;
	};

	function smoothScroll(node, target) {
		// console.log(target);
		let hash;
		if (node.href) hash = node.href;
		else if (target) hash = target;

		// console.log(hash);

		const url = new URL(location);
		url.hash = hash;

		function scrollToTarget(e) {
			if (!target) e.preventDefault();
			// console.log(url.hash);
			const ele = document.getElementById(url.hash.substring(1));

			if (ele) {
				const navbar = document.querySelector('nav.navbar');
				const navbarHeight = navbar.clientHeight;
				// const isExpand = navbar.querySelector('div.center.block');

				// console.log({ navbarHeight });
				// console.log({ isExpand });

				try {
					let n = ele.offsetTop - navbarHeight - 52;
					// if (isExpand) n = n + 52;
					scrollTo({ behavior: 'smooth', top: n });
				} catch (error) {}
			}
		}

		// function scrollToPosition(e) {
		// 	if (!target) {
		// 		e.preventDefault();
		// 	}
		// 	scrollToTarget(url.hash);
		// }

		// if (url.host === location.host && url.pathname === location.pathname) {

		if (url.hash.length > 1) {
			// console.log('que lo q');
			node.addEventListener('click', scrollToTarget);
		}
		// }

		return {
			destroy() {
				node.removeEventListener('click', scrollToTarget);
			}
		};
	}
</script>

<svelte:head>
	<title>Magacine - home</title>
</svelte:head>
<!-- use:smoothScroll={{ href: '#index-movies', tab: 'movies' }} -->
<!-- use:smoothScroll={{ href: '#index-movies', tab: 'series' }} -->

<NavbarTop>
	<button
		use:smoothScroll={'#index-movies'}
		on:click={() => setTab('movies')}
		class:active={act === 'movies'}>Movies</button
	>
	<button
		use:smoothScroll={'#index-movies'}
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
