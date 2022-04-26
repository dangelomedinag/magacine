<script>
	// import { flip } from 'svelte/animate';
	import { scale, fade } from 'svelte/transition';
	import ProgressLine from './ProgressLine.svelte';
	import { quintInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import Spinner from './Spinner.svelte';
	export let movie;
	export let progress;
	export let i;
	export let poster = movie.Poster !== 'N/A' ? movie.Poster : '/assets/image-fallback.jpg';
	let details;

	onMount(async () => {
		details = await getDetails(movie.imdbID);
	});

	async function getDetails(imdbID) {
		const req = await fetch('/api?i=' + imdbID);
		const details = await req.json();

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
				<p class="movie-year">{details.Year}</p>
				<div class="rating-wrapper">
					<img class="rating-logo" src="/assets/imdb-logo.png" alt="imdb trade mark" />
					<span class="rating-label">{(details.imdbRating / 2).toFixed(1)} rating</span>
				</div>
				{#if details.imdbRating}
					<div style="display: inline-flex;">
						{#each [1, 2, 3, 4, 5] as ele, i}
							{@const percent = Math.floor(+details.imdbRating) * 0.1}
							{@const sc = Math.floor(5 * percent)}
							{@const fill = ele > sc}

							<!-- {ele} -->
							{#if fill}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
									style="color: #3b3b00;"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
									/>
								</svg>
							{:else}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
									style="color: #e9cd50;"
								>
									<path
										d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
									/>
								</svg>
							{/if}
						{/each}
					</div>
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

	.item:hover .description-wrapper {
		/* background: linear-gradient(transparent, rgba(255, 255, 255, 0.2)); */
		background-color: #212121;
	}

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
