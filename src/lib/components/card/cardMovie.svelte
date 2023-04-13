<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';

	import Icon from '$icons/icon.svelte';
	import Star from '$icons/solid/star.svg?raw';

	import ProgressLine from '$components/card/cardProgressLine.svelte';
	import CardRatingStarts from '$components/card/cardRatingStarts.svelte';
	import { FavMovies } from '$lib/stores/favoritesStore';

	export let full = false;
	export let details = true;
	export let movie;
	export let progress = 0;
	export let i;
	export let showDetails = false;
	let promiseDetails = new Promise(() => {});

	onMount(() => {
		if (!details) promiseDetails = Promise.reject();
	});

	$: isFav = $FavMovies.some((m) => m.imdbid === movie.imdbid);

	const callback = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				showDetails = true;
				promiseDetails = loadDetails()
					.catch((e) => e.message)
					.finally(() => {
						observer.disconnect();
					});
			}
		});
	};

	function intersecting(node, cb) {
		if (!details) return;

		let options = {
			rootMargin: '0px',
			threshold: 0
		};

		let observer = new IntersectionObserver(cb, options);
		observer.observe(node);

		return {
			destroy() {
				observer?.disconnect();
			}
		};
	}

	async function loadDetails() {
		const req = await fetch('/api/' + movie.imdbid);
		if (!req.ok) throw req;
		const res = await req.json();
		return res;
	}
</script>

<figure
	use:intersecting={callback}
	in:fade={{ duration: 600, easing: quintInOut, delay: 50 * i }}
	class="item"
	class:fav-active={isFav}
>
	<button
		on:click={() => {
			FavMovies.toogleFav(movie);
		}}
		class="fav"
	>
		<Icon y="5%"
			>{@html Star}{#if isFav}
				fav
			{/if}</Icon
		>
	</button>
	<a data-sveltekit-preload-code class="item-link" href="/movies/{movie.imdbid}">
		<img loading="lazy" class="item-poster" src={movie.poster} alt={movie.title} />
	</a>

	{#if progress}
		<ProgressLine value={movie.progress} />
	{/if}

	{#if !full}
		<figcaption class="description-wrapper">
			<div class="info-wrapper">
				<h2 class="movie-title">{movie.title}</h2>

				<p class="movie-year">{movie.year}</p>

				{#await promiseDetails}
					wait...
				{:then value}
					<div style="display: flex; align-items: center;">
						<img
							class="rating-logo"
							src="/imgs/imdb-logo.png"
							alt="imdb trade mark"
							loading="lazy"
						/>
						<div class="rating-wrapper">
							<span class="rating-label">{(value.imdbrating / 2).toFixed(1)}</span>
						</div>
						<CardRatingStarts rating={value.imdbrating} />
					</div>
				{:catch}
					<!--  -->
				{/await}
			</div>
		</figcaption>
	{/if}
</figure>

<style>
	/* :root {
		--card-w: 500px;
		--card-h: 350px;
	} */

	.fav {
		--icon-size: 1.5rem;
		/* display: none; */
		font-weight: bold;

		color: rgb(255, 221, 50);
		background-color: #1f1c23;
		padding: 0 0.3em;
		margin: 0.8em;
		border-radius: 50vh;
		/* width: calc(var(--icon-size) + 0.5rem);
		height: calc(var(--icon-size) + 0.5rem); */
		border: 1px solid transparent;

		/* display: block; */
		position: absolute;
		top: 0;
		right: 0;

		box-shadow: var(--shadow-long);
	}

	.fav:hover {
		color: #1f1c23;
		background-color: rgb(255, 221, 50);
	}

	.fav-active {
		border-bottom: 2px solid rgb(255, 221, 50) !important;
	}

	.fav-active .fav {
		/* display: block !important; */
		color: #1f1c23;
		background-color: rgb(255, 221, 50);
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
		position: relative;
		margin: 0;
		background-color: var(--c-main);
		border: 1px solid var(--c-divider);
		transition: transform 100ms ease-in-out;
		box-shadow: var(--shadow-long);
	}

	.item-link {
		display: block;
		height: 100%;
		width: 100%;
		overflow: hidden;
		margin: 0;
		padding: 0;
		border-radius: 15px;
	}

	.item-poster {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.2s ease-in-out;
	}

	.description-wrapper {
		padding: 1em;
	}

	/* @media (min-width: 768px) {} */

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
		opacity: 0.7;
	}
	.rating-wrapper {
		display: inline-flex;
		justify-content: flex-start;
		align-items: center;
	}
	.rating-logo {
		max-width: 28px;
	}
	.rating-label {
		font-size: 0.8em;
		margin-left: 5px;
		margin-right: 5px;
	}

	@media (min-width: 576px) {
		.fav {
			display: none;
		}

		.fav-active .fav {
			display: block;
		}
	}
	@media (min-width: 768px) {
	}

	.item:hover {
		/* box-shadow: var(--shadow-long); */
		transform: translateY(-1%);
	}
	.item:hover .fav {
		display: block;
	}

	.item:hover .movie-title {
		color: var(--c-front);
	}
</style>
