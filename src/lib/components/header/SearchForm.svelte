<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	// icons
	import Icon from '$icons/icon.svelte';
	import X from '$icons/solid/x.svg?raw';
	import Search from '$icons/solid/search.svg?raw';
	import Trash from '$icons/solid/trash.svg?raw';

	let { inputRef = $bindable(null), onesc, onclose, submit } = $props();

	let value = $state('');

	function handleEsc(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			onesc();
		}
	}

	function removeKeyListener() {
		window.removeEventListener('keydown', handleEsc);
	}

	function keydownScape() {
		window.addEventListener('keydown', handleEsc);
	}

	function focus(node: HTMLInputElement) {
		window.addEventListener('keydown', handleEsc);
		node.addEventListener('focus', keydownScape);
		node.addEventListener('blur', removeKeyListener);
		node.focus();
		return {
			destroy() {
				window.removeEventListener('keydown', handleEsc);
				node.removeEventListener('focus', keydownScape);
				node.removeEventListener('blur', removeKeyListener);
			}
		};
	}

	function reset() {
		inputRef.focus();
		value = '';
	}
</script>

<form onsubmit={submit} onreset={() => reset()} in:scale|global={{ easing: quintOut }}>
	{#if value?.length > 0}
		<button class="btn" type="reset">
			<Icon>
				{@html Trash}
			</Icon>
		</button>
	{:else}
		<button class="btn" type="reset" onclick={() => onclose()}>
			<Icon>
				{@html X}
			</Icon>
		</button>
	{/if}
	<input
		bind:this={inputRef}
		bind:value
		use:focus
		class="searchBox"
		type="text"
		name="x"
		id="x"
		autocomplete="off"
		placeholder="search"
		minlength="3"
		required
	/>
	<button class="btn btn-submit">
		<Icon>
			{@html Search}
		</Icon>
	</button>
</form>

<style>
	form {
		padding: 0.7em 0;
		margin: 0;
		display: flex;
		flex-wrap: nowrap;
		width: 100%;
		gap: 1em;
	}

	.searchBox {
		padding: 0.3em 0.5em;
		font-size: 1rem;
		font-weight: bold;
		width: 100%;
		color: var(--c-text-base);
		background-color: transparent;
		border: 1px solid var(--c-divider);
		border-radius: 50vh;
		text-align: center;
		outline: none;
	}

	.searchBox:focus {
		background-color: var(--c-divider);
	}

	.btn {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		border: none;
		color: var(--c-text-base);
	}
	.btn-submit {
		background-color: var(--c-divider);
		border-radius: 50vh;
	}

	.btn-submit:hover {
		background-color: var(--c-front);
	}
</style>
