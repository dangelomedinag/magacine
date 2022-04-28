<script>
	import { scale, fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import ProgressLine from './ProgressLine.svelte';
	import Spinner from './Spinner.svelte';
	import CardRatingStarts from '$lib/components/ui/card/cardRatingStarts.svelte';
	export let movie;
	export let progress;
	export let i;
	export let poster = movie.Poster !== 'N/A' ? movie.Poster : '/assets/image-fallback.jpg';
	let details;

	onMount(async () => {
		details = await getDetails(movie.imdbID);
	});

	async function getDetails(imdbID) {
		const req = await fetch('/api/' + imdbID);
		const details = await req.json();
		// console.log(details);

		return details;
	}
</script>

<!-- {@const poster = movie.Poster !== 'N/A' ? movie.Poster : '/assets/image-fallback.jpg'} -->
<figure
	in:fade={{ duration: 600, easing: quintInOut, delay: 50 * i }}
	out:scale={{ duration: 200, start: 0.95, easing: quintInOut }}
	class="item"
>
	<a class="item-link" href="/movie/{movie.imdbID}">
		<img class="item-poster" src={poster} alt={movie.Title} loading="lazy" />
	</a>

	{#if progress}
		<ProgressLine value={movie.progress ?? 0} />
	{/if}

	<figcaption class="description-wrapper">
		<div class="info-wrapper">
			{#if details}
				<h2 class="movie-title">{movie.Title}</h2>
				<p class="movie-year">{details.year}</p>
				<div class="rating-wrapper">
					<img class="rating-logo" src="/assets/imdb-logo.png" alt="imdb trade mark" />
					<span class="rating-label">{(details.imdbRating / 2).toFixed(1)} rating</span>
				</div>
				{#if details.imdbRating}
					<CardRatingStarts rating={details.imdbRating} />
				{/if}
			{:else}
				<Spinner color="grey" size={20} />
			{/if}
		</div>
	</figcaption>
</figure>

<style>
	svg {
		height: 1rem;
		width: 1rem;
	}

	.item {
		position: relative;
		overflow: hidden;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-width: var(--w-card);
		/* height: 100%; */
		max-width: 350px;
		max-height: 680px;
		position: relative;
		margin: 0;
		margin-right: 1em;
		/* height: 400px; */
		/* background-color: var(--c-main); */
		border: 1px solid rgba(128, 128, 128, 0.3);
	}

	.item-link {
		display: block;
		height: 100%;
		width: 100%;
		overflow: hidden;
		margin: 0;
		padding: 0;
		/* height: 200px; */
	}

	.item-poster {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.2s ease-in-out;
	}

	.description-wrapper {
		/* display: flex; */
		/* justify-content: space-between; */
		/* flex-wrap: wrap; */
		padding: 1em;
		/* background: rgb(0, 0, 0); */
	}

	@media (min-width: 768px) {
		/* .description-wrapper {
			display: flex;
			justify-content: space-between;
		} */
	}

	.info-wrapper {
		position: relative;
	}

	.movie-title {
		margin: 0;
		font-weight: 600;
		font-size: 1rem;
		margin-bottom: 0.2em;
		width: calc(var(--w-card) - 2em);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.movie-year {
		margin: 0;
		/* margin-bottom: 0.4em; */
		opacity: 0.7;
	}
	.rating-wrapper {
		display: inline-flex;
		justify-content: flex-start;
		align-items: center;
		/* margin-bottom: 10px; */
	}
	.rating-logo {
		max-width: 28px;
	}
	.rating-label {
		font-size: 0.8em;
		margin-left: 5px;
		margin-right: 5px;
	}

	@media (min-width: 768px) {
	}

	/* sssssssss */

	.item:hover {
		/* cursor: pointer; */
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			0 32px 64px rgba(0, 0, 0, 0.07);
		background-color: var(--c-main);
	}

	/* .item:hover .description-wrapper { */
	/* background: linear-gradient(transparent, rgba(255, 255, 255, 0.2)); */
	/* } */

	.item:hover .item-poster {
		transform: scale(1.02);
	}

	/* .empty-wrapper {
		border: 1px solid rgba(128, 128, 128, 0.3);
		padding: 2em;
		width: 100%;
		text-align: center;
	}

	.hidden {
		display: none;
	} */
</style>
