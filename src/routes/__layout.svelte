<script context="module">
	/** @type {import("@sveltejs/kit").LoadEvent}*/
	export const load = async ({ fetch, session }) => {
		if (!session.user) {
			return {
				status: 303,
				redirect: '/login'
			};
		}

		return { status: 200 };
	};
</script>

<script>
	import { dev } from '$app/env';
	import { navigating } from '$app/stores';

	import Footer from '$components/footer.svelte';
	import Aside from '$components/aside.svelte';
	import NProgress from 'nprogress';
	import ButtonToTop from '$components/buttonToTop.svelte';
	import MediaQueries from '$components/dev/mediaQueries.svelte';
	import PriceTable from '$components/ui/priceTable.svelte';
	import Modal from '$components/ui/modal.svelte';

	import { pricePlans } from '$lib/stores/plans-store';
	import 'nprogress/nprogress.css';
	import { onMount } from 'svelte';

	let toggle = false;

	onMount(() => {
		let timeout = setTimeout(() => {
			modal.open();
		}, 300);

		return () => clearTimeout(timeout);
	});
	let modal;

	// NProgress css
	NProgress.configure({
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			if ($navigating.from.pathname !== $navigating.to.pathname) {
				NProgress.start();
			}
		}
		if (!$navigating) {
			NProgress.done();
		}
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
	<MediaQueries bottom="0" />
{/if}

<Modal
	bind:this={modal}
	on:close={() => {
		pricePlans.update((v) => !v);
	}}
>
	<svelte:fragment slot="header">¡Wellcome!</svelte:fragment>
	<PriceTable />
</Modal>

<div class="wrapper">
	<ButtonToTop active={toggle} on:click={toggleAside} />
	<aside class="sidebar" class:toggle>
		<Aside
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
	:root {
		/* colors */
		--c-main: #1f1c23;
		--c-main-content: hsl(273, 13%, 16%);
		--c-perl: #f1faee;
		--c-text-base: #f1faee;
		--c-front: #e63946;
		--c-front-dark: hsl(355, 63%, 35%);
		--gap-content: 1em;
		--c-divider: rgba(255, 255, 255, 0.1);

		/* utilities */
		--shadow-long: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			0 32px 64px rgba(0, 0, 0, 0.07);
		--shadow-short: 0 1px 20px rgba(0, 0, 0, 0.2);

		/* aside */
		--aside-bg: var(--c-main-content);
		--aside-link: var(--c-text-base);
		--aside-link-opacity: 0.3;
		--aside-link-active: green;
		--aside-link-hover: yellow;
		--aside-link-icon: white;
		--aside-link-label: black;
		--aside-link-label-bg: white;
		--aside-link-bubble: white;
		--aside-link-bubble-bg: var(--c-front);

		/* navbar */
		--navbar-bg: var(--c-main-content);
		--navbar-item-opacity: 0.5;
		--navbar-item-hover: inherit;

		/* transition color theme */
		--transition-theme: background-color 0.2s linear;

		/* card Movie */
		--card-w: 500px;
		--card-h: 350px;
	}

	:global(body[data-theme='light']) {
		--c-main: #ffffff;
		--c-main-content: hsl(0, 0%, 90%);
		--c-perl: #f1faee;
		--c-text-base: #161616;
		/* --c-front: #e63946; */
		/* --c-front-dark: hsl(302, 63%, 35%); */
		/* --gap-content: 0.5em; */
		--c-divider: rgba(0, 0, 0, 0.1);

		/* aside */
		--aside-bg: var(--c-main-content);
		--aside-link: var(--c-text-base);
		--aside-link-opacity: 0.6;
		--aside-link-active: green;
		--aside-link-hover: yellow;
		--aside-link-icon: black;
		--aside-link-label: black;
		--aside-link-label-bg: white;
		--aside-link-bubble: white;
		--aside-link-bubble-bg: var(--c-front);

		/* navbar */
		--navbar-bg: var(--c-main-content);
		/* --navbar-item: var(--c-main-content); */
		--navbar-item-opacity: 1;
		--navbar-item-hover: var(--c-front);

		/* card Movie */
		--card-w: 200px;
		--card-h: 350px;
	}

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
		min-height: 100vh;
		background-color: var(--c-main);
		transition: var(--transition-theme);
	}
	.toggle + .main::after {
		content: '';
		height: 100%;
		width: 100%;
		user-select: none;
		cursor: pointer;
		/* opacity: 0.5; */
		backdrop-filter: blur(3px);
		--webkit-backdrop-filter: blur(3px);
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
		background-color: var(--c-main-content);
		/* background-color: #1a171e; */
		transition: transform 0.4s cubic-bezier(0.83, 0, 0.25, 0.99), var(--transition-theme);
		transform: translateX(-100%);
		border-right: 1px solid var(--c-divider);
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
