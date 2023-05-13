<script>
	// icons
	import Icon from '$icons/icon.svelte';
	import MenuAlt2 from '$icons/outline/menu-alt-2.svelte';
	import X from '$icons/outline/x.svelte';

	export let active = false;
</script>

<button title="close navbar" on:click>
	<Icon>
		<div class="menu">
			<MenuAlt2 />
		</div>
		<Icon>
			<div class="x">
				<X />
			</div>
		</Icon>
	</Icon>
</button>

<style>
	button {
		--icon-size: 1.5rem;

		position: fixed;
		bottom: 5%;
		right: 5%;
		z-index: 999;
		border-radius: 50vh;
		width: 50px;
		height: 50px;
		background-color: var(--c-front);
		color: white;
		border: none;
		/* display: none; */
		justify-content: center;
		align-items: center;
		cursor: pointer;
		box-shadow: 5px 5px 30px -5px black;
	}

	button:hover {
		opacity: 1;
		background-color: var(--c-front-dark);
	}

	button:active {
		transform: translateY(5%);
	}

	:global(nav) ~ button .x {
		display: none;
	}
	:global(nav.open) ~ button .x {
		display: flex;
	}
	:global(nav.open) ~ button .menu {
		display: none;
	}

	@media (min-width: 768px) {
		button {
			display: none;
		}
	}
</style>
