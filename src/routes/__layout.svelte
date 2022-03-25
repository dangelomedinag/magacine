<script>
	import AsideNav from '$lib/components/ui/AsideNav.svelte';
	let hidden = true;
</script>

<div class="wrapper">
	<button on:click={() => (hidden = !hidden)}>menu</button>
	<aside class="sidebar" class:hidden>
		<AsideNav on:click={() => (hidden = true)} />
	</aside>
	<main class="main">
		<slot />
	</main>
</div>

<style>
	button {
		position: fixed;
		bottom: 0;
		right: 0;
		z-index: 100;
	}
	/* button:hover + .sidebar {
		transform: translateX(0);
	} */

	.wrapper {
		display: flex;
		justify-content: center;
		max-width: 1400px;
		margin: 0 auto;
	}

	.main {
		width: 100%;
		height: 100%;
	}

	.sidebar {
		height: 100vh;
		/* display: none; */
		width: 80%;
		position: fixed;
		/* position: -webkit-sticky;
		position: sticky; */
		top: 0;
		left: 0;
		z-index: 90;
		background-color: #1a171e;
		transition: transform 0.4s cubic-bezier(0.83, 0, 0.25, 0.99);
	}
	.hidden {
		transform: translateX(-100%);
	}

	@media (min-height: 500px) {
		.main {
			width: 100%;
			height: 100%;
		}

		.sidebar {
			height: 100vh;
			/* display: none; */
			width: 80%;
			position: fixed;
			/* position: -webkit-sticky;
		position: sticky; */
			top: 0;
			left: 0;
			z-index: 90;
			background-color: #1a171e;
			transition: transform 0.4s cubic-bezier(0.83, 0, 0.25, 0.99);
		}
	}

	@media (min-width: 576px) {
		.main {
			width: 90%;
		}
		.sidebar {
			display: block;
			position: -webkit-sticky;
			position: sticky;
			top: 0;
			width: 10%;
		}
		.hidden {
			transform: translateX(0);
			width: 10%;
		}
	}

	@media (min-width: 768px) {
	}
	@media (min-width: 992px) {
		.main {
			width: 80%;
		}
		.sidebar {
			display: block;
			width: 20%;
		}
	}
	@media (min-width: 1200px) {
	}
	@media (min-width: 992px) {
	}
</style>
