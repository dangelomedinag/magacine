<script>
	import { page, session } from '$app/stores';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

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
	}
</script>

<nav class="navbar-content">
	<div class="home-wrapper">
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
		{#if $session.user}
			<button class="tool-btn" on:click={tooglePopup}>
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
			{#if showPopup}
				<div class="popup" in:fly={{ y: 20, easing: quintOut }}>
					<div style="display: flex; justify-content: center ;align-items: center;">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="bell-svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
						<span>
							{$session.user.name}
						</span>
					</div>
					<hr />

					<ul class="list-actions">
						<li>
							<a href="/profile">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="bell-svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/>
								</svg>
								<span>Profile</span></a
							>
						</li>
						<li>
							<a href="/settings">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="bell-svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
										clip-rule="evenodd"
									/>
								</svg>
								<span>Settings</span></a
							>
						</li>
						<li>
							<a href="/auth/logout">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="bell-svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
										clip-rule="evenodd"
									/>
								</svg>
								<span>logout</span></a
							>
						</li>
					</ul>
				</div>
			{/if}
		{/if}
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
		/* padding: var(--gap-content); */
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			0 32px 64px rgba(0, 0, 0, 0.07);
	}

	.home-wrapper {
		padding-left: var(--gap-content);
	}

	.backhome {
		color: var(--c-front) !important;
		opacity: 1 !important;
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}
	.navbar-content :global(a),
	.navbar-content :global(button),
	.navbar-content a,
	.navbar-content button {
		text-align: center;
		cursor: pointer;
		background-color: transparent;
		/* background-color: var(--c-front); */
		text-decoration: none;
		padding-left: var(--navbar-item-gap);
		padding-right: var(--navbar-item-gap);
		padding-top: var(--gap-content);
		padding-bottom: var(--gap-content);
		margin: 0;
		border: 1px solid transparent;
		color: white;
		font-size: 0.9em;
		/* font-weight: bold; */
		/* opacity: 0.5; */
	}

	/* .items-wrapper :global(button:first-child) {
		padding-left: 0;
	} */

	.navbar-content :global(.active) {
		opacity: 1;
		border-bottom: 1px solid var(--c-front);
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

	.home-wrapper,
	.items-wrapper,
	.tools-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.tools-wrapper {
		position: relative;
		padding-right: var(--gap-content);
	}

	.popup {
		border: 1px solid rgba(255, 255, 255, 0.1);
		position: absolute;
		right: 30px;
		top: 75px;
		width: 200px;
		/* height: 250px; */
		background-color: var(--c-main-content);
		border-radius: 10px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			0 32px 64px rgba(0, 0, 0, 0.07);
		padding: 1em;
	}

	.list-actions {
		list-style: none;
		padding: 0;
		text-align: left;
	}

	.list-actions li {
		padding: 0.4em 0;
		margin: 0;
	}
	.list-actions li:hover a {
		color: var(--c-front);
	}

	.list-actions li a {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 0;
		margin: 0;
	}

	.list-actions span {
		padding-left: 0.5em;
		margin: 0;
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

	hr {
		border: 1px solid rgba(255, 255, 255, 0.1);
	}
</style>
