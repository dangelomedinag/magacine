<script context="module" lang="ts">
	import { writable } from 'svelte/store';
	import { onMount, onDestroy } from 'svelte';
	export const ActiveTab = writable<string>('');
	export const Tabs = writable<string[]>([]);
</script>

<script lang="ts">
	export let name: string;

	onMount(() => {
		Tabs.update((v) => (v.includes(name) ? v : [...v, name]));
		console.log('mounted', { name });
	});
	onDestroy(() => {
		Tabs.update((v) => v.filter((r) => r !== name));
		console.log('destroyed', { name });
	});

	$: active = $ActiveTab === name;
</script>

{#if active}
	<slot />
{/if}
