<script>
	import { browser } from '$app/env';

	import Icon from '$components/ui/icons/icon.svelte';
	import { onMount } from 'svelte';
	import { quintIn, quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	let theme;
	let button;
	let active = false;

	onMount(() => {
		theme = document.body.dataset.theme;
	});
</script>

{#if theme}
	<button
		bind:this={button}
		on:click={() => {
			if (document.body.dataset.theme === 'light') {
				document.body.dataset.theme = 'dark';
				theme = document.body.dataset.theme;
			} else {
				document.body.dataset.theme = 'light';
				theme = document.body.dataset.theme;
			}
		}}
		disabled={active}
	>
		{#key theme}
			<div
				in:fly|local={{ duration: 1000, y: 6, delay: 300, easing: quintOut }}
				out:fly|local={{ duration: 300, y: -6, easing: quintIn }}
				on:outrostart={(e) => {
					active = true;
				}}
				on:introend={(e) => {
					active = false;
				}}
			>
				{#if theme === 'light'}
					<Icon name="sun" type="solid" style="color: #ffae17;" />
				{:else}
					<Icon name="moon" type="solid" style="color: darkslateblue;" />
				{/if}
				<!-- {theme === 'light' ? 'dark' : 'light'} -->
				{theme}
			</div>
		{/key}
	</button>
{/if}

<style>
	button {
		/* font-size: 1rem; */
		/* background-color: var(--c-front) !important; */
		opacity: 1 !important;

		/* width: 60px; */
	}
	button:disabled {
		opacity: 0.5 !important;
	}

	div {
		display: flex;
		font-size: 0.9rem;
		justify-content: center;
		align-items: center;
		background-color: var(--c-main);
		border: 1px solid var(--c-divider);
		/* box-shadow: var(--shadow-short); */
		/* color: #ffae17;
		color: darkslateblue; */
		color: var(--c-text-base);
		/* color: black; */
		border-radius: 50vh;
		padding: 0 0.5em;
	}
</style>
