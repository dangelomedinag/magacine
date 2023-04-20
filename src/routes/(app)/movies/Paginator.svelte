<script lang="ts">
	import Icon from '$components/icons/icon.svelte';
	import ChevronRight from '$icons/solid/chevron-right.svg?raw';
	import ChevronLeft from '$icons/solid/chevron-left.svg?raw';
	import type { MoviesResponse } from '$lib/types';

	type streamResponse = { data: Promise<MoviesResponse[]> };
	export let stream: streamResponse | undefined;
	export let active: number;
	export let setPage: (page: number, movies: MoviesResponse) => void;
</script>

{#if stream}
	{#await stream.data then value}
		{#if Array.isArray(value)}
			<div class="pages-wrapper">
				<button
					class="nav"
					on:click={() => setPage(active - 1, value[active - 1])}
					disabled={active == 0}><Icon>{@html ChevronLeft}</Icon></button
				>
				<div class="wrapper">
					{#each value as movies, i}
						<button class:active={i === active} class="button" on:click={() => setPage(i, movies)}
							>{i + 1}</button
						>
					{/each}
				</div>
				<button
					class="nav"
					on:click={() => setPage(active + 1, value[active + 1])}
					disabled={active == value.length - 1}><Icon>{@html ChevronRight}</Icon></button
				>
			</div>
		{/if}
	{/await}
{/if}

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
	}

	button {
		background-color: transparent;
		border: 1px solid transparent;
		width: 2em;
		height: 2em;
		border-radius: 100%;
		padding: 0;
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
