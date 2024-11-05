<script module lang="ts">
	import { writable } from 'svelte/store';
	import { onMount, onDestroy } from 'svelte';
	export const ActiveTab = writable<string>('');
	export const Tabs = writable<string[]>([]);
</script>

<script lang="ts">
	interface Props {
		name: string;
		children?: import('svelte').Snippet;
	}

	let { name, children }: Props = $props();

	onMount(() => {
		Tabs.update((v) => (v.includes(name) ? v : [...v, name]));
		console.log('mounted', { name });
	});
	onDestroy(() => {
		Tabs.update((v) => v.filter((r) => r !== name));
		console.log('destroyed', { name });
	});

	let active = $derived($ActiveTab === name);
</script>

{#if active}
	{@render children?.()}
{/if}
