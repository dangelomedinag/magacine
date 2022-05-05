<script>
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
</script>

<nav class="navbar-content">
	<div class="items-wrapper">
		<slot />
	</div>
	<div class="tools-wrapper">
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
					d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</button>
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
		position: sticky;
		top: 0;
		z-index: 51;
		width: 100%;
		display: flex;
		justify-content: space-between;
		background-color: var(--c-main);
		border-bottom: 1px solid rgba(128, 128, 128, 0.1);
		padding: var(--gap-content);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			0 32px 64px rgba(0, 0, 0, 0.07);
	}

	.items-wrapper :global(a),
	.items-wrapper :global(button),
	.tools-wrapper a,
	.tools-wrapper button {
		cursor: pointer;
		background-color: transparent;
		/* background-color: var(--c-front); */
		text-decoration: none;
		padding-left: var(--navbar-item-gap);
		padding-right: var(--navbar-item-gap);
		margin: 0;
		border: 1px solid transparent;
		color: white;
		font-size: 0.9em;
		/* font-weight: bold; */
		opacity: 0.5;
	}

	.items-wrapper :global(button:first-child) {
		/* background-color: greenyellow; */
		padding-left: 0;
	}

	.navbar-content :global(.active) {
		opacity: 1;
		/* color: var(--c-front) */
	}

	/* .navbar-content :global(button) {
		font-size: 0.9em;
		background-color: transparent;
		text-decoration: none;
		padding: 0 1em;
		color: white;
		opacity: 0.5;
	} */

	.items-wrapper,
	.tools-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.tools-wrapper {
	}

	.tool-btn {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.bell-svg {
		height: 1.2rem;
		width: 1.2rem;
	}
</style>
