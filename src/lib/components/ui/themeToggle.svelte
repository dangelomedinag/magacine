<script>
	import Icon from '$components/ui/icons/icon.svelte';
	import { onMount } from 'svelte';
	import { quintIn, quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { themeStore } from '$lib/stores/theme-store';
	// let theme;
	let active = false;

	// onMount(() => {});

	function toogleTheme() {
		console.log('before', $themeStore);

		themeStore.toogleTheme();

		console.log('after', $themeStore);
	}
</script>

{#if $themeStore}
	<button on:click={themeStore.toogleTheme} disabled={active}>
		{#key $themeStore}
			<div
				in:fly|local={{ duration: 1000, x: 6, delay: 300, easing: quintOut }}
				out:fly|local={{ duration: 300, x: -6, easing: quintIn }}
				on:outrostart={() => {
					active = true;
				}}
				on:introend={() => {
					active = false;
				}}
			>
				{#if $themeStore === 'light'}
					<Icon name="sun" type="solid" style="color: #ffae17;" />
				{:else}
					<Icon name="moon" type="solid" style="color: darkslateblue;" />
				{/if}
				{$themeStore}
			</div>
		{/key}
	</button>
{/if}

<!-- <button on:click={toogleTheme}>x</button> -->
<style>
	button {
		/* font-size: 1rem; */
		background-color: transparent !important;
		border: none;
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
