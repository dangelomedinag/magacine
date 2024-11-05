<script lang="ts">
	import CardMovie from '$components/card/cardMovie.svelte';
	import CardMovieSeeAll from '$components/card/cardMovieSeeAll.svelte';
	import type { MoviesResponse } from '$lib/types';

	interface Props {
		movies: MoviesResponse;
		details?: boolean;
		full?: boolean | undefined;
		seeAll?: boolean | undefined;
	}

	let {
		movies,
		details = false,
		full = undefined,
		seeAll = true
	}: Props = $props();
</script>

<div class="grid">
	{#each movies.results as item, i (item.uuid)}
		<CardMovie {details} {full} {i} movie={item} />
	{/each}
	{#if seeAll && movies?.totalResults > 10}
		<CardMovieSeeAll query={movies.query} posters={movies.results.map((m) => m.poster)} />
	{/if}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(0px, var(--card-w)));
		place-items: center;
		justify-content: center;
		gap: 1em;
		padding-block: 2em;
	}
</style>
