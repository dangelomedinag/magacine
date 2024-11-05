<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { page } from '$app/stores';

	// components
	import Spinner from '$lib/components/ui/spinner.svelte';
	import Alert from '$components/ui/alert.svelte';
	import CarouselMovies from '$lib/components/card/carouselMovies.svelte';
	import Icon from '$icons/icon.svelte';

	// icons
	import Film from '$icons/solid/film.svg?raw';
	import DesktopComputer from '$icons/solid/desktop-computer.svg?raw';
	import Collection from '$icons/solid/collection.svg?raw';
	import { onMount } from 'svelte';
	import type { MoviesResponse } from '$lib/types';

	interface Props {
		results: Promise<MoviesResponse>;
	}

	let { results }: Props = $props();
	let suggestionsMovies = $state(undefined);

	onMount(() => {
		results.catch(() => {
			getSuggestions();
		});
	});

	async function getSuggestions() {
		let sug = await fetch('/api?s=avengers');
		suggestionsMovies = await sug.json();
	}
</script>

{#await results}
	<Spinner />
{:then response}
	<ul class="list">
		<li class="total-results">
			{response.search} - {response.totalResults} results
		</li>
		{#each response.results as movie, i (movie.uuid)}
			<li class="list__item" in:fly|global={{ x: 60, easing: quintInOut, delay: 50 * i }}>
				<!-- <a href="/movies/{movie.imdbid}">

				</a> -->
				<img src={movie.poster} alt={movie.title} />
				<span class="n-top">{i + 1}</span>
				<span class="info-wrapper">
					<div class="title">
						{movie.title} - {movie.year}
					</div>
					<div class="type">
						<span class="icon">
							<Icon y="20%">
								{#if movie.type === 'movie'}
									{@html Film}
								{:else if movie.type === 'game'}
									{@html DesktopComputer}
								{:else if movie.type === 'series'}
									{@html Collection}
								{/if}
							</Icon>
						</span>
						{movie.type}
					</div>
				</span>
			</li>
		{/each}
	</ul>
{:catch error}
	<div class="toast-wrapper">
		<Alert danger>
			<span>
				{error.message}
			</span>
		</Alert>
	</div>
	<CarouselMovies details={false} movies={suggestionsMovies} title="suggestions" />
{/await}

<style>
	.toast-wrapper {
		padding: 1em 0;
	}

	.list {
		list-style: none;
		padding: 0;
		margin: 0;
		flex-direction: column;
		display: flex;
		padding-bottom: 1em;
	}

	.list__item {
		overflow: hidden;
		position: relative;
		display: flex;
		align-items: center;
		border-top: 1px solid var(--c-divider);
	}
	.list__item:hover {
		background-color: var(--c-divider);
	}

	.n-top {
		vertical-align: middle;
		position: absolute;
		top: 0;
		right: 0;
		line-height: 6rem;
		font-weight: bold;
		font-size: 12rem;
		color: var(--c-divider);
		opacity: 0.2;
	}

	img {
		max-height: 120px;
		min-height: 120px;
		display: block;
		width: 100%;
		max-width: 80px;
		object-fit: cover;
	}

	.info-wrapper {
		padding-left: 1em;
	}

	.title {
		font-weight: bold;
	}

	.type {
		font-weight: lighter;
	}

	.icon {
		opacity: 0.5;
		padding-right: 0.2em;
	}

	.total-results {
		text-align: center;
		padding-bottom: 0.5em;
		flex-basis: 100%;
		font-style: italic;
	}
</style>
