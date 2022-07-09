<script>
	// icons
	import Icon from '$icons/icon.svelte';
	import MenuAlt2 from '$icons/outline/menu-alt-2.svelte';
	import X from '$icons/outline/x.svelte';

	export let active = false;
</script>

<button title="scroll to top" on:click>
	{#if !active}
		<Icon>
			<MenuAlt2 />
		</Icon>
	{:else}
		<Icon>
			<X />
		</Icon>
	{/if}
</button>

<style>
	button {
		--icon-size: 1.5rem;

		position: fixed;
		bottom: 5%;
		right: 5%;
		z-index: 110;
		border-radius: 50vh;
		width: 50px;
		height: 50px;
		background-color: var(--c-front);
		color: white;
		border: none;
		display: flex;
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
</style>
