<script>
	import { scale, fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import ProgressLine from '../ProgressLine.svelte';
	import CardRatingStarts from '$lib/components/ui/card/cardRatingStarts.svelte';

	export let details = true;
	export let movie;
	export let progress = 0;
	export let i;
	export let poster = movie.poster !== 'N/A' ? movie.poster : '/imgs/image-fallback.jpg';
	let promiseDetails = details
		? fetch('/api/' + movie.imdbid).then((r) => r.json())
		: Promise.reject();
</script>

<!-- {@const poster = movie.Poster !== 'N/A' ? movie.Poster : '/imgs/image-fallback.jpg'} -->
<!-- out:scale={{ duration: 200, start: 0.95, easing: quintInOut }} -->
<figure in:fade={{ duration: 600, easing: quintInOut, delay: 50 * i }} class="item">
	<a
		class="item-link"
		href="/movies/{movie.imdbid}"
		on:click={() => {
			// dispatch('setmovie', { movie: details })
			// currentMovie.set(details);
		}}
	>
		<img class="item-poster" src={poster} alt={movie.title} loading="lazy" />
	</a>

	{#if progress}
		<ProgressLine value={movie.progress} />
	{/if}

	<figcaption class="description-wrapper">
		<div class="info-wrapper">
			<h2 class="movie-title">{movie.title}</h2>

			<p class="movie-year">{movie.year}</p>

			{#await promiseDetails}
				wait...
			{:then value}
				<img class="rating-logo" src="/imgs/imdb-logo.png" alt="imdb trade mark" loading="lazy" />
				<div class="rating-wrapper">
					<span class="rating-label">rating {(value.imdbrating / 2).toFixed(1)}</span>
				</div>
				<CardRatingStarts rating={value.imdbrating} />
			{:catch}
				<!-- error handle -->
			{/await}
		</div>
	</figcaption>
</figure>

<style>
	/* svg {
		height: 1rem;
		width: 1rem;
	} */

	:root {
		--card-w: 200px;
		--card-h: 350px;
	}

	.item {
		position: relative;
		overflow: hidden;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-width: var(--card-w);
		height: var(--card-h);
		max-width: var(--card-w);
		/* max-height: var(--card-h); */
		position: relative;
		margin: 0;
		margin-right: 1em;
		/* height: 400px; */
		/* background-color: var(--c-main); */
		background-color: var(--c-main);
		border: 1px solid rgba(128, 128, 128, 0.3);
		transition: transform 100ms ease-in-out;
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
		width: calc(var(--card-w) - 2em);
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

		transform: translateY(-1%);
	}

	.item:hover .movie-title {
		/* text-decoration: underline; */
		color: var(--c-front);
	}

	/* .item:hover .description-wrapper { */
	/* background: linear-gradient(transparent, rgba(255, 255, 255, 0.2)); */
	/* } */

	/* .item:hover .item-poster {
		transform: scale(1.02);
	} */

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
