<script>
	import { browser } from '$app/env';

	import Icon from '$components/ui/icons/icon.svelte';
	import {
		quintInOut,
		bounceInOut,
		bounceIn,
		bounceOut,
		elasticIn,
		elasticOut,
		quintIn,
		quintOut
	} from 'svelte/easing';
	import { scale, slide, fly } from 'svelte/transition';
	let theme;

	if (browser) {
		theme = document.body.dataset.theme;
	}
</script>

{#key theme}
	<button
		in:fly|local={{ duration: 1000, y: 6, delay: 300, easing: quintOut }}
		out:fly|local={{ duration: 300, y: -6, easing: quintIn }}
		on:click={() => {
			if (document.body.dataset.theme === 'light') {
				document.body.dataset.theme = 'dark';
				theme = document.body.dataset.theme;
			} else {
				document.body.dataset.theme = 'light';
				theme = document.body.dataset.theme;
			}
		}}
	>
		{#if theme === 'light'}
			<Icon name="moon" type="solid" style="color:purple;" />
		{:else}
			<Icon name="sun" type="solid" style="color:yellow;" shadow />
		{/if}
	</button>
{/key}

<style>
	button {
		font-size: 1rem;
		width: 60px;
	}

	span {
	}
</style>
