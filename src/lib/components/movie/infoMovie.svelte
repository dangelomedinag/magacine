<script lang="ts">
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
	import { onMount, tick } from 'svelte';
	import type { MovieItem } from '$lib/types';

	interface Props {
		movie: MovieItem;
	}

	let { movie }: Props = $props();
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

	let modal: Modal = $state();
	let showModal: boolean = $state(false);

	async function openModal() {
		showModal = true;
		await tick();
		modal.open();
	}

	// onMount(() => {
	// 	if (modal) {
	// 		const url = new URL(location);
	// 		if (url.hash === '#modal') modal.open();
	// 	}
	// });

	function favoritesAction(movie: MovieItem) {
		const mesage = isFav ? 'Remove item of favorites?' : 'Add item of favorites?';
		const ok = confirm(mesage);

		ok && FavMovies.toogleFav(movie);
	}

	let isFav = $derived($FavMovies.some((m) => m.imdbid === movie.imdbid));
</script>

<TitleMovie value={title} />
<PlotMovie value={plot} />
<GendersMovie value={genre} />
<LangMovie value={language} />
<RatingMovie value={imdbrating} {ratings} />

<button onclick={openModal} class="btn-details">more details</button>
<div style="display: flex; gap:0.5em;">
	<button onclick={() => favoritesAction(movie)} class="btn-details" class:fav={isFav}>
		{#if isFav}
			remove fav
		{:else}
			add to favorites <Icon y="10%">{@html Star}</Icon>
		{/if}
	</button>
	{#if isFav}
		<a href="/favorites" class="btn-details">
			view favorites
			<Icon y="13%">{@html Link}</Icon>
		</a>
	{/if}
</div>

{#if showModal}
	<Modal bind:this={modal} Zindex="110" on:close={() => (showModal = false)}>
		<ReleasedMovie value={released} />
		<DirectorMovie value={director} />
		<WriterMovie value={writer} />
		<ActorsMovie value={actors} />
		<AwardsMovie value={awards} />
		<CountryMovie value={country} />
	</Modal>
{/if}

<style>
	.btn-details {
		font-size: 1em;
		display: block;
		width: 100%;
		border: 1px solid var(--c-divider);
		background-color: var(--c-divider);
		color: inherit;
		padding: 0.5em 0.2em;
		border-radius: 5px;
		cursor: pointer;
		margin-top: 1em;
		font-weight: bold;
		text-align: center;
		text-decoration: none;
	}

	.btn-details:hover {
		background-color: var(--c-front);
		color: white;
	}
	a.btn-details:hover {
		text-decoration: underline;
	}
	.btn-details.fav {
		background-color: rgb(251, 230, 124);
		color: rgb(95, 83, 26);
	}
	.fav:hover {
		opacity: 0.8;
	}
</style>
