<script>
	import TitleMovie from '$components/movie/titleMovie.svelte';
	import PlotMovie from '$components/movie/plotMovie.svelte';
	import GendersMovie from '$components/movie/gendersMovie.svelte';
	import LangMovie from '$components/movie/langMovie.svelte';
	import RatingMovie from '$components/movie/ratingMovie.svelte';
	import ReleasedMovie from '$components/movie/releasedMovie.svelte';
	import DirectorMovie from '$components/movie/directorMovie.svelte';
	import WriterMovie from '$components/movie/writerMovie.svelte';
	import ActorsMovie from '$components/movie/actorsMovie.svelte';
	import AwardsMovie from '$components/movie/awardsMovie.svelte';
	import CountryMovie from '$components/movie/countryMovie.svelte';
	import Modal from '$components/ui/modal.svelte';
	import { FavMovies } from '$lib/stores/favoritesStore';
	import Icon from '$components/icons/icon.svelte';
	import Star from '$components/icons/solid/star.svg?raw';
	import { goto } from '$app/navigation';
	import Link from '$components/icons/solid/link.svg?raw';
	import { onMount } from 'svelte';

	export let movie;
	const {
		plot,
		title,
		genre,
		language,
		imdbrating,
		ratings,
		released,
		director,
		writer,
		actors,
		awards,
		country
	} = movie;

	let modal;

	onMount(() => {
		if (modal) {
			const url = new URL(location);
			if (url.hash === '#modal') modal.open();
		}
	});

	$: isFav = $FavMovies.some((m) => m.imdbid === movie.imdbid);
</script>

<TitleMovie value={title} />
<PlotMovie value={plot} />
<GendersMovie value={genre} />
<LangMovie value={language} />
<RatingMovie value={imdbrating} {ratings} />

<button on:click={modal.open} class="btn-details">more details</button>
<div style="display: flex; gap:0.5em;">
	<button on:click={() => FavMovies.toogleFav(movie)} class="btn-details" class:fav={isFav}>
		{#if isFav}
			delete <Icon y="10%">{@html Star}</Icon>
		{:else}
			add to favorites
		{/if}
	</button>
	{#if isFav}
		<button on:click={() => goto('/favorites')} class="btn-details">
			view favorites
			<Icon y="13%">{@html Link}</Icon>
		</button>
	{/if}
</div>

<Modal bind:this={modal} Zindex="110">
	<ReleasedMovie value={released} />
	<DirectorMovie value={director} />
	<WriterMovie value={writer} />
	<ActorsMovie value={actors} />
	<AwardsMovie value={awards} />
	<CountryMovie value={country} />
</Modal>

<style>
	.btn-details {
		font-size: 1em;
		display: block;
		width: 100%;
		border: 1px solid var(--c-divider);
		background-color: var(--c-main-content);
		color: inherit;
		padding: 0.5em 0.2em;
		border-radius: 5px;
		cursor: pointer;
		margin-top: 1em;
	}

	.btn-details:hover {
		/* background-color: var(--c-main); */
		color: var(--c-front);
	}

	.fav {
		border-color: rgb(255, 221, 50);
		color: rgb(255, 221, 50);
	}
	.fav:hover {
		color: var(--c-front) !important;
	}
</style>
