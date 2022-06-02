<script>
	// import { page, session } from '$app/stores';
	import { onDestroy } from 'svelte';
	// import { quintOut } from 'svelte/easing';
	// import { fly } from 'svelte/transition';
	import SessionModal from '$components/ui/navbar/sessionModal.svelte';
	import Icon from '$components/ui/icons/icon.svelte';

	// import { onMount, createEventDispatcher, onDestroy } from 'svelte';
	// const dispatch = createEventDispatcher();
	// let tabsBox;
	// let items;

	// function handle(e) {
	// 	dispatch('tab', e.target.dataset.tab);
	// }

	// onMount(() => {
	// 	items = tabsBox.querySelectorAll('button');

	// 	items.forEach((btn) => {
	// 		btn.addEventListener('click', handle);
	// 	});
	// });

	export let search = true,
		bell = false,
		profile = true;

	let showPopup = false;

	function tooglePopup() {
		showPopup = !showPopup;
		blockScroll();
	}

	function blockScroll() {
		if (document.body) {
			if (showPopup) document.body.style.overflow = 'hidden';
			else document.body.style.overflow = 'auto';
		}
	}

	onDestroy(() => {
		if (showPopup) {
			tooglePopup();
		}
	});
</script>

<nav class="navbar-content">
	<!-- <div class="home-wrapper">
		<a href="/" class="backhome">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="bell-svg"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
				/>
			</svg>
		</a>
	</div>
	<div class="items-wrapper">
		<slot />
	</div>
	<div class="tools-wrapper">
		{#if search}
			<a href="/search" class="tool-btn">
				<svg
					class="bell-svg"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</a>
		{/if}
		{#if bell}
			<button class="tool-btn">
				<svg
					class="bell-svg"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					/>
				</svg>
			</button>
		{/if}
	</div> -->

	<div class="left">
		<button>
			<Icon icon="search" />
		</button>
		<button>
			<Icon icon="search2" />
		</button>
	</div>
	<div class="center">
		<button>xx</button>
	</div>
	<div class="right">
		<SessionModal />
	</div>
</nav>

<!-- {#if searching}
	<div class="filter-sticky">
		<SearchMovies bind:results bind:value>
			<CarouselMovies movies={results} title={value} priority="small" />

			<div slot="suggest" class="content">
				<Toast warn>
					Opps! parece que no se encontraron resultados para <span>"{value}"</span>
				</Toast>
				<div>
					<CarouselMovies movies={stuff.shrek} title="sugesst" priority="small" />
				</div>
			</div>
		</SearchMovies>
	</div>
{/if} -->
<style>
	:root {
		--navbar-item-gap: 0.5em;
	}

	.navbar-content {
		/* font-size: 1.5rem; */

		position: sticky;
		top: 0;
		z-index: 51;
		width: 100%;
		/* height: 50px; */
		display: flex;
		justify-content: space-between;
		background-color: var(--c-main);
		border-bottom: 1px solid rgba(128, 128, 128, 0.1);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			0 32px 64px rgba(0, 0, 0, 0.07);
	}

	.left > :global(button),
	.right > :global(button),
	.center > :global(button) {
		background-color: brown;
		height: 100%;
		padding: 0;
		margin: 0;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		/* font-size: 2rem; */
	}
</style>
