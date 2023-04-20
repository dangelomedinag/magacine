<script>
	import { createEventDispatcher } from 'svelte';

	export let open = false;
	const toggle = () => (open = !open);
	const dispatch = createEventDispatcher();
	function closeMenu() {
		dispatch('close-menu');
	}
</script>

<section>
	<div class="w">
		<img src="/bg-flares.png" alt="sda" />
	</div>
</section>

<div class="app">
	<header>
		<slot name="header" />
	</header>
	<nav class:open on:click|self={closeMenu} on:keydown>
		<div class="foreground">
			<slot name="nav" />
		</div>
	</nav>
	<main>
		<slot />
	</main>
	<aside>
		<slot name="aside" />
	</aside>
	<footer>
		<slot name="footer" />
	</footer>
</div>

<style>
	section {
		position: absolute;
		top: 0;
		inset-inline: 0;
		overflow: hidden;
		display: flex;
		justify-content: center;
		pointer-events: none;
		width: 100%;
		filter: blur(50px) opacity(0.5);
		z-index: -1;
	}

	.w {
		width: 300rem;
		display: flex;
		overflow: hidden;
		justify-content: end;
		flex: 0 0 auto;
		flex: none;
		height: auto;
	}

	img {
		display: block;
		width: 230rem;
		flex: none;
		max-width: none;
	}

	.app {
		display: grid;
		grid-template-rows: min-content 1fr min-content;
		min-height: 100dvh;
		margin-inline: auto;
		/* column-gap: 0.5em; */
	}

	header {
		text-align: right;
		position: sticky;
		top: 0;
		left: 0;

		z-index: 100;
		/* border-bottom: 1px solid rgba(255, 255, 255, 0.2); */
	}

	.foreground {
		width: 80%;
		height: 100%;
		max-width: 500px;
		background-color: var(--c-main);
	}

	nav {
		display: none;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		/* max-width: 500px; */
		height: 100%;
		transform: translateX(-100%);
		background-color: var(--bg-navbar);
		backdrop-filter: blur(3px);
		--webkit-backdrop-filter: blur(3px);
		/* background-color: var(--c-main-content); */

		z-index: 800;
		border-right: 1px solid var(--c-divider);
		transition: transform 0.3s ease-in-out;
	}
	nav.open {
		display: block;
		transform: translateX(0);
	}
	/* .open ~ main::after {
		content: '';
		height: 100%;
		width: 100%;
		user-select: none;
		cursor: pointer;
		backdrop-filter: blur(3px);
		--webkit-backdrop-filter: blur(3px);
		background-color: rgba(0, 0, 0, 0.6);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 780;
	} */

	aside {
		display: none;
		/* border-left: 1px solid rgba(255, 255, 255, 0.2); */
	}
	main {
		overflow: hidden;
		/* max-width: 100%; */
	}
	footer {
		/* border-top: 1px solid rgba(255, 255, 255, 0.2); */
	}

	@media screen and (min-width: 640px) {
	}

	@media screen and (min-width: 720px) {
	}

	@media (min-width: 768px) {
		.app {
			grid-template-columns: min-content 1fr;
			grid-template-rows: min-content 1fr min-content;
		}

		.foreground {
			width: auto;
			/* height: 100%; */
			max-width: initial;
			background-color: transparent;
		}

		/* .open ~ main::after {
			display: none;
		} */

		nav {
			display: block;
			position: initial;
			width: auto;
			height: auto;
			min-width: auto;
			transform: initial;
			z-index: 1;
			background-color: transparent;
			grid-row: 1 / 3;
			/* z-index: initial; */
		}

		header {
			grid-column: 2 / -1;
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

		/* aside {
			display: block;
		} */
	}

	@media (min-width: 1280px) {
	}
</style>
