<script>
	import Icon from '$components/ui/icons/icon.svelte';
	export let active = false;
</script>

<button on:click>
	{#if !active}
		<Icon name="menu-alt-2" />
	{:else}
		<Icon name="x" />
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
		/* opacity: 0.5; */
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

	/* button svg {
		height: 25px;
		width: 25px;
	} */
</style>
