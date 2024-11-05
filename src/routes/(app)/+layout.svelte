<script lang="ts">
	import { self, createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import Footer from '$components/footer.svelte';
	import Navbar from '$components/navbar/Navbar.svelte';

	import ButtonToTop from '$components/buttonToTop.svelte';
	import PriceTable from '$components/ui/priceTable.svelte';
	import Modal from '$components/ui/modal.svelte';

	import { pricePlans } from '$lib/stores/plans-store';
	import { onMount } from 'svelte';
	import BackgroundFlares from '$components/BackgroundFlares.svelte';
	import Header from '$components/header/Header.svelte';
	import { page } from '$app/stores';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let modal: Modal = $state();

	onMount(() => {
		if (!$pricePlans) return;
		modal.open();
	});

	// let modal: Modal;

	function closeNavbar() {
		document.querySelector('.app > nav')?.classList.remove('open');
	}
	function toggleNavbar() {
		document.querySelector('.app > nav')?.classList.toggle('open');
	}

	// function matchMobile() {
	// 	return matchMedia('(min-width: 992px)').matches;
	// }
</script>

<svelte:head>
	<title>Magacine - movies, series & all, in one place</title>
</svelte:head>

{#if $pricePlans}
	<Modal
		bind:this={modal}
		on:close={() => {
			pricePlans.set(false);
			pricePlans.saveLocalStorage();
		}}
	>
		{#snippet header()}
			¡Wellcome!
		{/snippet}
		<PriceTable />
	</Modal>
{/if}

<!-- <Layout open={toggle} on:close-menu={toggleAside}>
	<svelte:fragment slot="header">
		<Header search={$page.data.layout?.search ?? true} />
	</svelte:fragment>
	<svelte:fragment slot="nav">
		<Aside
			on:tap={() => {
				if (!matchMobile()) closeAside();
			}}
		/>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="aside">aside</svelte:fragment>
	<svelte:fragment slot="footer">
		<Footer />
	</svelte:fragment>
</Layout> -->
<BackgroundFlares />
<div class="app">
	<header>
		<Header search={$page.data.layout?.search ?? true} />
	</header>
	<nav>
		<Navbar />
	</nav>
	<main>
		{@render children?.()}
	</main>
	<aside>aside</aside>
	<footer>
		<Footer />
	</footer>
	<ButtonToTop onclick={toggleNavbar} />
</div>

<style>
	/* @media (min-width: 576px) {} */
	/* @media (min-width: 768px) {} */
	/* @media (min-width: 992px) {} */
	/* @media (min-width: 1200px) {} */

	.app {
		display: grid;
		grid-template-rows: min-content minmax(100vh, 1fr) min-content;
	}

	header {
		position: sticky;
		top: 0;
		left: 0;
		z-index: 100;
	}

	nav {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 110;
		will-change: backdrop-filter;
		pointer-events: none;
	}

	:global(nav.open) {
		pointer-events: initial;
		backdrop-filter: blur(3px);
	}

	aside {
		display: none;
	}
	main {
		overflow: hidden;
	}

	/* @media (min-width: 640px) {
	} */

	/* @media (min-width: 720px) {
	} */

	@media (min-width: 768px) {
		.app {
			grid-template-columns: min-content 1fr;
			grid-template-rows: min-content minmax(100vh, 1fr) min-content;
		}

		nav {
			grid-row: 2 / 3;
			position: initial;
			display: block;
			pointer-events: initial;
			z-index: 1;
			/* border-right: 1px solid transparent;
			backdrop-filter: none;
			visibility: visible; */
		}

		/* :global(nav.open) {
		} */

		header {
			grid-column: 1 / -1;
		}

		main {
			grid-column: 2 / -1;
		}

		footer {
			grid-column: 1 / -1;
		}
	}

	@media (min-width: 1024px) {
		main {
			grid-column: auto;
		}
	}

	@media (min-width: 1280px) {
	}
</style>
