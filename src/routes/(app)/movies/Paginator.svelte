<script lang="ts">
	import Icon from '$components/icons/icon.svelte';
	import ChevronRight from '$icons/solid/chevron-right.svg?raw';
	import ChevronLeft from '$icons/solid/chevron-left.svg?raw';
	import type { MoviesResponse } from '$lib/types';
	import { goto } from '$app/navigation';
	import { tick } from 'svelte';
	import Spinner from '$components/ui/spinner.svelte';

	interface Props {
		active: number;
		arr: MoviesResponse;
		setPage: (page: number, cb: () => Promise<void>) => void;
		url: URL;
		showPaginator: boolean;
	}

	let { active, arr, setPage, url, showPaginator }: Props = $props();
	let pages = $derived(Math.round(arr.results.length / 10));
	async function updateUrl() {
		await tick();
		url.searchParams.set('page', (active + 1).toString());
		await goto(url, { noScroll: true, keepFocus: true });
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}
</script>

<div class="pages-wrapper">
	{#if showPaginator}
		<button class="nav button" onclick={() => setPage(active - 1, updateUrl)} disabled={active == 0}
			><Icon>{@html ChevronLeft}</Icon></button
		>
		<div class="wrapper">
			{#each { length: pages } as _, i}
				<button class:active={i === active} class="button" onclick={() => setPage(i, updateUrl)}
					>{i + 1}</button
				>
			{/each}
		</div>
		<button
			class="nav button"
			onclick={() => setPage(active + 1, updateUrl)}
			disabled={active >= pages - 1}><Icon>{@html ChevronRight}</Icon></button
		>
	{:else}
		<div class="wrapper">
			<button class="loading" disabled={true}
				>loading...<Spinner position="relative" size="2.5rem" /></button
			>
		</div>
	{/if}
</div>

<style>
	.pages-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
	}
	.wrapper {
		border: 1px solid var(--c-divider);
		border-radius: 50vh;
		padding: 0.5em;
		position: relative;
	}

	button {
		background-color: transparent;
		border: 1px solid transparent;
		border-radius: 100%;
		padding: 0;
		height: 2em;
	}

	.button {
		width: 2em;
	}

	.loading {
		display: inline-flex;
		padding-inline: 1em;
		justify-content: center;
		align-items: center;
		gap: 1em;
	}

	.nav {
		font-size: 1.2rem;
	}

	.nav:not(:disabled):hover {
		background-color: var(--c-front);
		color: white;
	}
	button:not(:disabled):focus {
		outline: 1px dashed grey;
	}
	.active {
		color: white;
		background-color: var(--c-front);
	}
</style>
