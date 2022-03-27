<script>
	import AsideNav from '$lib/components/ui/AsideNav.svelte';
	let hidden = true;
</script>

<div class="wrapper">
	<button on:click={() => (hidden = !hidden)}
		><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
			<path
				fill-rule="evenodd"
				d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
				clip-rule="evenodd"
			/>
		</svg></button
	>
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
		bottom: 5%;
		right: 5%;
		z-index: 110;
		border-radius: 50vh;
		width: 50px;
		height: 50px;
		background-color: rgba(165, 42, 42, 0.8);
		color: white;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		box-shadow: 5px 5px 30px -5px black;
	}

	button:hover {
		background-color: brown;
	}

	button:active {
		transform: translateY(5%);
	}

	button svg {
		height: 25px;
		width: 25px;
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
		z-index: 100;
		background-color: #1a171e;
		transition: transform 0.4s cubic-bezier(0.83, 0, 0.25, 0.99);
	}
	.hidden {
		transform: translateX(-100%);
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

		button {
			display: none;
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
