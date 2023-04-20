<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';

	import Icon from '$icons/icon.svelte';
	import Star from '$icons/solid/star.svg?raw';
	import Trash from '$icons/solid/trash.svg?raw';
	import Plus from '$icons/solid/plus.svg?raw';

	import ProgressLine from '$components/card/cardProgressLine.svelte';
	import CardRatingStarts from '$components/card/cardRatingStarts.svelte';
	import { FavMovies } from '$lib/stores/favoritesStore';
	import type { MovieResult } from '$lib/types';
	import Modal from '$components/ui/modal.svelte';
	import { uuid } from '$helpers';
	// import Trash from '$components/icons/outline/trash.svelte';
	// import MovieItem from '$components/gridMovies/movieItem.svelte';

	export let full = false;
	export let details = true;
	export let movie: MovieResult;
	export let progress = 0;
	export let i = 1;
	let showDetails = false;
	let modal: Modal;

	$: isFav = $FavMovies.some((m) => m.imdbid === movie.imdbid);

	const callback: IntersectionObserverCallback = (entries, observer) => {
		entries.forEach(async (entry) => {
			if (entry.isIntersecting) {
				showDetails = true;
				observer.disconnect();
			}
		});
	};

	function intersecting(node) {
		if (!details) return;

		let options = {
			rootMargin: '0px',
			threshold: 0
		};

		let observer = new IntersectionObserver(callback, options);
		observer.observe(node);

		return {
			destroy() {
				observer?.disconnect();
			}
		};
	}

	async function getDetails() {
		await new Promise((res) => setTimeout(res, 1000));
		const req = await fetch('/api/' + movie.imdbid);
		if (!req.ok) throw req;
		const res: MovieItem = await req.json();
		return res;
	}

	function favoritesAction(movie: MovieItem) {
		// const mesage = isFav ? 'Remove item of favorites?' : 'Add item of favorites?';
		// modal.open();
		// const ok = confirm(mesage);

		FavMovies.toogleFav(movie);
		modal.close();
	}
</script>

<Modal bind:this={modal}>
	<svelte:fragment slot="header">Favorites</svelte:fragment>
	{#if !isFav}
		<p class="modal-icon" style="color: springgreen;">
			<Icon>{@html Plus}</Icon>
		</p>
	{:else}
		<p class="modal-icon" style="color: var(--c-front);">
			<Icon>{@html Trash}</Icon>
		</p>
	{/if}
	<ul>
		{#if !isFav}
			<li class="current">
				<img class="favorites-img" src={movie.poster} alt={movie.plot} />
			</li>
		{/if}

		{#each $FavMovies
			.sort((a, b) => (a.imdbid === movie.imdbid ? -1 : 1))
			.slice(0, 7) as item (item.uuid)}
			<li class:current={item.imdbid === movie.imdbid}>
				<img class="favorites-img" src={item.poster} alt={item.plot} />
			</li>
		{/each}
	</ul>
	<p class="text">{isFav ? 'Remove' : 'Add '} <strong>{movie.title}</strong> from favorites?</p>
	<svelte:fragment slot="action">
		<button class="cta" on:click={() => favoritesAction(movie)}>{isFav ? 'Remove' : 'Add'}</button>
		<button on:click={modal.close}>cancel</button>
		<a href="/favorites">favorites</a>
	</svelte:fragment>
</Modal>

<figure
	use:intersecting
	in:fade={{ duration: 600, easing: quintInOut, delay: 50 * i }}
	class="item"
	class:fav-active={isFav}
>
	<button on:click={modal.open} class="fav">
		<Icon y="5%">{@html Star}</Icon>
		{#if isFav}
			<span>fav</span>
		{/if}
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

				{#if showDetails}
					{#await getDetails()}
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
								<span class="rating-label">{(+value.imdbrating / 2).toFixed(1)}</span>
							</div>
							<CardRatingStarts rating={value.imdbrating} />
						</div>
					{/await}
				{/if}
				<!-- {#await promiseDetails}
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
					{/await} -->
			</div>
		</figcaption>
	{/if}
</figure>

<style>
	/* :root {
		--card-w: 500px;
		--card-h: 350px;
	} */

	.text {
		text-align: center;
	}

	.text > strong {
		background-color: var(--c-front-dark);
		border-radius: 4px;
		padding-inline: 0.3em;
		color: white;
	}
	ul {
		position: relative;
		display: flex;
		height: 150px;
		justify-content: center;
		align-items: center;
		padding: 0;
		/* flex-wrap: wrap; */
		list-style: none;
	}

	li.current {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
		/* color: white; */
	}

	li img {
		opacity: 0.2;
	}

	.current .favorites-img {
		opacity: 1;
		height: 100%;
		border-radius: 5px;
	}

	.modal-icon {
		display: block;
		font-size: 2em;
		text-align: center;
		margin: 0;
		/* position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center; */
	}

	.favorites-img {
		display: block;
		height: 80px;
		width: auto;
		object-fit: cover;
	}

	.fav {
		--icon-size: 1.5rem;
		/* display: none; */
		font-weight: bold;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		color: rgb(255, 221, 50);
		background-color: #1f1c23;
		/* padding: 0 0.3em; */
		margin: 0.8em;
		padding-inline: 0.2em;
		padding-block: 0;
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
		/* box-shadow: var(--shadow-long); */
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
			display: flex;
		}
	}
	@media (min-width: 768px) {
	}

	.item:hover {
		/* box-shadow: var(--shadow-long); */
		transform: translateY(-1%);
	}
	.item:hover .fav {
		display: flex;
	}

	.item:hover .movie-title {
		color: var(--c-front);
	}
</style>
