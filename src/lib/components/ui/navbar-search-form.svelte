<script>
	/* icons */
	import Icon from '$icons/icon.svelte';
	import X from '$icons/solid/x.svelte';
	import ArrowNarrowUp from '$icons/solid/arrow-narrow-up.svelte';
	import Search from '$icons/solid/search.svelte';
	/* icons */

	import { createEventDispatcher } from 'svelte';

	import { quintOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	const dispatch = createEventDispatcher();
	let value = '';
	function handleEsc(e) {
		if (e.key === 'Escape') {
			e.preventDefault();
			console.log('escape');
			dispatch('esc');
		}
	}

	function removeKeyListener() {
		window.removeEventListener('keydown', handleEsc);
	}

	function keydownScape() {
		window.addEventListener('keydown', handleEsc);
	}

	function focus(node) {
		// window.addEventListener('keydown', handleEsc);
		// node.addEventListener('focus', keydownScape);
		// node.addEventListener('blur', removeKeyListener);
		node.focus();
		// return {
		// 	destroy() {
		// 		window.removeEventListener('keydown', handleEsc);
		// 		node.removeEventListener('focus', keydownScape);
		// 		node.removeEventListener('blur', removeKeyListener);
		// 	}
		// };
	}

	function reset(e) {
		e.target.x.focus();
		value = '';
	}
</script>

<form on:submit|preventDefault on:reset={reset} in:scale={{ easing: quintOut }}>
	{#if value?.length > 0}
		<button class="btn" type="reset">
			<Icon>
				<X />
			</Icon>
		</button>
	{:else}
		<button class="btn" type="reset" on:click={() => dispatch('close')}>
			<Icon>
				<ArrowNarrowUp />
			</Icon>
		</button>
	{/if}
	<input
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
			<Search />
		</Icon>
	</button>
</form>

<style>
	/* search box */

	form {
		/* position: relative; */
		padding: 0.7em;
		margin: 0;
		display: flex;
		flex-wrap: nowrap;

		width: 100%;
		gap: 1em;
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
