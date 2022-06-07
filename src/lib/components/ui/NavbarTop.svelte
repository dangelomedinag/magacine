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

<nav class="navbar">
	<div class="content navbar-wrapper">
		<div class="left">
			<a href="/">
				<Icon name="home" type="solid" />
			</a>
		</div>
		<div class="center">
			<slot />
		</div>
		<div class="right">
			{#if search}
				<a href="/search">
					<Icon name="search" type="solid" />
				</a>
			{/if}
			{#if profile}
				<SessionModal />
			{/if}
		</div>
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

	.navbar {
		--icon-size: 1.2rem;

		position: sticky;
		top: 0;
		z-index: 51;
		width: 100%;
		background-color: var(--c-main-content);
		border-bottom: 1px solid rgba(128, 128, 128, 0.1);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			0 32px 64px rgba(0, 0, 0, 0.07);
	}

	.navbar-wrapper {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.left > :global(button),
	.right > :global(button),
	.center > :global(button),
	.left > :global(a),
	.right > :global(a),
	.center > :global(a) {
		background-color: transparent;
		color: inherit;
		border: 1px solid transparent;
		/* background-color: brown; */
		opacity: 0.5;
		max-height: 100%;
		padding: 0;
		margin: 0;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: 0.7em 0.5em;
		line-height: 1em;
		text-decoration: none;
		cursor: pointer;
	}

	.left > :global(button:hover),
	.right > :global(button:hover),
	.center > :global(button:hover),
	.left > :global(a:hover),
	.right > :global(a:hover),
	.center > :global(a:hover),
	.center > :global(button.active),
	.center > :global(a.active) {
		background-color: rgba(255 255 255 / 7%);
		border-bottom: 1px solid var(--c-front);
		opacity: 1;
	}

	.center {
		order: 3;
		/* position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%); */
		/* display: none; */
		width: 100%;
		/* max-width: 15%; */
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.center > :global(button) {
		/* font-size: 0.9rem; */
		flex: 1 1 100%;
		/* width: 100%; */
		/* width: 70px; */
	}

	@media (min-width: 576px) {
		.navbar-wrapper {
			flex-wrap: nowrap;
		}
		.center {
			order: initial;
			width: auto;
		}

		.center > :global(button) {
			/* font-size: 0.9rem; */
			flex: 0 1 auto;
			/* width: 70px; */
		}
	}
</style>
