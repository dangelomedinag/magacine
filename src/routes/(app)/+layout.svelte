<script lang="ts">
	import Footer from '$components/footer.svelte';
	import Aside from '$components/aside.svelte';

	import ButtonToTop from '$components/buttonToTop.svelte';
	import PriceTable from '$components/ui/priceTable.svelte';
	import Modal from '$components/ui/modal.svelte';

	import { pricePlans } from '$lib/stores/plans-store';
	import { onMount } from 'svelte';
	import Layout from '$components/Layout.svelte';
	import NavbarTop from '$components/navbar/navbarTop.svelte';
	import { page } from '$app/stores';

	let toggle = false;
	let modal: Modal;

	onMount(() => {
		if (!$pricePlans) return;
		modal.open();
	});

	// let modal: Modal;

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

{#if $pricePlans}
	<Modal
		bind:this={modal}
		on:close={() => {
			pricePlans.set(false);
			pricePlans.saveLocalStorage();
		}}
	>
		<svelte:fragment slot="header">¡Wellcome!</svelte:fragment>
		<PriceTable />
	</Modal>
{/if}

<Layout open={toggle} on:close-menu={toggleAside}>
	<svelte:fragment slot="header">
		<NavbarTop search={$page.data.layout?.search ?? true}>
			<!-- <button on:click={toggleAside}>click</button> -->
		</NavbarTop>
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
</Layout>

<ButtonToTop active={toggle} on:click={toggleAside} />

<!-- 

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
		on:keydown
		on:click={() => {
			if (!matchMobile()) closeAside();
		}}
	>
		<div class="container">
			<slot />
		</div>
		<Footer />
	</main>
</div> -->

<style>
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
