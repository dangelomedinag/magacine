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
</script>

<TitleMovie value={title} />
<PlotMovie value={plot} />
<GendersMovie value={genre} />
<LangMovie value={language} />
<RatingMovie value={imdbrating} {ratings} />

<button on:click={modal.open} class="btn-details">more details</button>

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
</style>
