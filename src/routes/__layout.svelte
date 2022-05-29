<script context="module">
	/** @type {import("@sveltejs/kit").LoadEvent}*/
	export const load = async ({ fetch, session }) => {
		if (!session.user) {
			return {
				status: 303,
				redirect: '/login'
			};
		}

		const url = '/api?s=marvel';

		const req = await fetch(url);
		if (!req.ok) {
			return {
				stuff: {
					suggest: []
				}
			};
		}
		const movies = await req.json();

		return {
			stuff: {
				suggest: movies
			}
		};
	};
</script>

<script>
	import Footer from '$components/Footer.svelte';
	import AsideNav from '$components/ui/AsideNav.svelte';
	import NProgress from 'nprogress';
	import ButtonToTop from '$components/ui/buttonToTop.svelte';
	import MediaQueries from '$components/mediaQueries.svelte';

	import { dev } from '$app/env';
	import { navigating } from '$app/stores';
	import 'nprogress/nprogress.css';
	let toggle = false;

	// NProgress css
	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			// console.log($navigating.from.pathname, $navigating.to.pathname);
			if ($navigating.from.pathname !== $navigating.to.pathname) {
				NProgress.start();
			}
		}
		if (!$navigating) {
			NProgress.done();
		}
	}

	function openAside() {
		toggle = true;
	}
	function closeAside() {
		toggle = false;
	}
	function toggleAside() {
		toggle = !toggle;
	}

	function matchMobile() {
		return matchMedia('(min-width: 992px)').matches;
	}
</script>

<svelte:head>
	<title>Magacine - movies, series & all, in one place</title>
</svelte:head>

{#if dev}
	<MediaQueries left="50%" />
{/if}
<div class="wrapper">
	<ButtonToTop
		on:click={() => {
			toggleAside();
		}}
	/>
	<aside class="sidebar" class:toggle>
		<AsideNav
			on:tap={() => {
				if (!matchMobile()) closeAside();
			}}
		/>
	</aside>
	<main
		class="main"
		on:click={() => {
			if (!matchMobile()) closeAside();
		}}
	>
		<div class="container">
			<slot />
		</div>
		<Footer />
	</main>
</div>

<style>
	:global(#nprogress .bar) {
		background-color: var(--c-front);
	}

	.container {
		display: flex;
		flex-direction: column;
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
	.toggle + .main::after {
		content: '';
		height: 100%;
		width: 100%;
		user-select: none;
		cursor: pointer;
		/* opacity: 0.5; */
		backdrop-filter: blur(3px);
		background-color: rgba(0, 0, 0, 0.6);
		/* background-color: var(--c-front); */
		position: fixed;
		top: 0;
		left: 0;
		z-index: 95;
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
		.toggle + .main::after {
			/* content: ''; */
			display: none;
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
