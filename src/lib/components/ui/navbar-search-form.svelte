<script>
	import { createEventDispatcher } from 'svelte';
	import Icon from '$components/ui/icons/icon.svelte';
	const dispatch = createEventDispatcher();

	function focus(node) {
		node.focus();
	}
</script>

<form on:submit|preventDefault>
	<input
		use:focus
		class="searchBox"
		type="search"
		name="x"
		id="x"
		autocomplete="off"
		value="suspense"
	/>
	<button type="button" class="btn-close" on:click={() => dispatch('close')} style="">
		<Icon name="x" type="solid" />
	</button>
</form>

<style>
	/* search box */

	form {
		padding: 0.7em;
		margin: 0;
		display: flex;
		flex-wrap: nowrap;

		width: 100%;
	}

	.searchBox {
		padding: 0.3em 0.5em;
		/* line-height: 1rem; */
		font-size: 1rem;
		/* padding: 0.2em; */
		font-weight: bold;
		width: 100%;
		color: var(--c-text-base);
		background-color: transparent;
		border: 1px solid var(--c-divider);
		border-radius: 50vh;
		text-align: center;
		outline: none;
		/* font-size: 1rem; */
		/* line-height: 1rem; */
		/* height: 100%; */
	}

	.searchBox:focus {
		background-color: var(--c-divider);
		/* outline: 2px solid var(--c-divider); */
	}

	.btn-close {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		border: none;
		color: var(--c-text-base);
	}
</style>
