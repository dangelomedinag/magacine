<script context="module">
	export async function load({ fetch }) {
		const urls = [
			'https://www.omdbapi.com/?s=shrek&type=movie&apikey=eedc324b',
			'https://www.omdbapi.com/?s=friends&type=series&apikey=eedc324b',
			'https://www.omdbapi.com/?s=fast&type=movie&apikey=eedc324b'
		];
		let promises = [];

		urls.forEach((url) => {
			promises.push(fetch(url).then((res) => res.json()));
		});

		const movies = await Promise.all(promises).then((values) => values);

		return {
			stuff: {
				shrek: movies[0].Search,
				friends: movies[1].Search,
				fast: movies[2].Search
			}
		};
	}
</script>

<script>
	import Footer from '$lib/components/Footer.svelte';
	import AsideNav from '$lib/components/ui/AsideNav.svelte';
	import { dev } from '$app/env';
	let toggle = false;
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { navigating } from '$app/stores';
	import ButtonToTop from '$lib/components/ui/buttonToTop.svelte';
	import MediaQueries from '$lib/components/mediaQueries.svelte';

	// NProgress css

	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}
</script>

{#if dev}
	<MediaQueries />
{/if}
<div class="wrapper">
	<ButtonToTop on:click={() => (toggle = !toggle)} />
	<aside class="sidebar" class:toggle>
		<AsideNav on:click={() => (toggle = false)} />
	</aside>
	<main class="main">
		<div class="container">
			<slot />
		</div>
		<Footer />
	</main>
</div>

<style>
	:global(#nprogress .bar) {
		background-color: brown;
	}

	.container {
		display: flex;
		flex-direction: column;
	}

	button {
		position: fixed;
		bottom: 5%;
		right: 5%;
		z-index: 110;
		border-radius: 50vh;
		width: 50px;
		height: 50px;
		background-color: rgba(165, 42, 42, 0.8);
		color: white;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		box-shadow: 5px 5px 30px -5px black;
	}

	button:hover {
		background-color: brown;
	}

	button:active {
		transform: translateY(5%);
	}

	button svg {
		height: 25px;
		width: 25px;
	}

	.wrapper {
		display: flex;
		justify-content: center;
		max-width: 1400px;
		margin: 0 auto;
	}

	.main {
		width: 100%;
		height: 100%;
		background-color: var(--c-main-content);
	}

	.sidebar {
		height: 100vh;
		width: auto;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		/* backdrop-filter: blur(20px); */
		background-color: var(--c-main);
		/* background-color: #1a171e; */
		transition: transform 0.4s cubic-bezier(0.83, 0, 0.25, 0.99);
		transform: translateX(-100%);
		border-right: 1px solid rgba(255, 255, 255, 0.1);
	}
	.toggle {
		transform: translateX(0);
	}

	@media (min-width: 576px) {
		/* button {
			display: none;
		} */
	}

	@media (min-width: 768px) {
	}
	@media (min-width: 992px) {
		.main {
			width: 95%;
		}
		.sidebar {
			transform: translateX(0);
			display: block;
			position: -webkit-sticky;
			position: sticky;
			top: 0;
			width: 5%;
		}
		.toggle {
			/* transform: translateX(0); */
			width: 20%;
		}
		.toggle + main {
			width: 80%;
		}
		/* .main {
			width: 80%;
		}
		.sidebar {
			display: block;
			width: 20%;
		} */
	}
	@media (min-width: 1200px) {
	}
	@media (min-width: 992px) {
	}
</style>
