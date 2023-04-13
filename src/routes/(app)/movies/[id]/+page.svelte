<script>
	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import NavbarTop from '$components/navbar/navbarTop.svelte';
	import Alert from '$components/ui/alert.svelte';
	import VideoPlayer from '$components/movie/videoPlayer.svelte';
	import YearMovie from '$components/movie/yearMovie.svelte';
	import RuntimeMovie from '$components/movie/runtimeMovie.svelte';
	import InfoMovie from '$components/movie/infoMovie.svelte';

	//icons
	import Icon from '$icons/icon.svelte';
	import Play from '$icons/solid/play.svg?raw';

	export let data;
	let showPlayer = false;
	// let suggestionsMovies;

	// onMount(() => {
	// 	getSuggest();
	// });

	// async function getSuggest() {
	// 	suggestionsMovies = null;

	// 	const { genre, plot } = data.movie;
	// 	let selected;
	// 	if (plot) {
	// 		const plotArr = plot.split(' ');
	// 		const plotArrFilter = plotArr.filter((word) => word.length > 4 && !word.includes('-'));
	// 		selected = plotArrFilter[randomInt(plotArrFilter.length - 1)];
	// 	} else {
	// 		if (genre.length > 0) {
	// 			selected = genre[randomInt(genre.length - 1)];
	// 		}
	// 	}

	// 	try {
	// 		if (!selected) throw Error('no content for now');

	// 		const req = await fetch(
	// 			'/api?s=' + selected.toLowerCase().replace(/\.|\(|\)|"|'|,|\$|-/g, '')
	// 		);
	// 		if (!req.ok) throw Error('bad request');

	// 		suggestionsMovies = await req.json();
	// 	} catch (error) {
	// 		suggestionsMovies = Error(error.message);
	// 	}
	// }

	// afterNavigate(({ from, to }) => {
	// 	if (
	// 		from &&
	// 		to &&
	// 		from.url.pathname.startsWith('/movies/') &&
	// 		to.url.pathname.startsWith('/movies/')
	// 	) {
	// 		if (from.url.pathname !== to.url.pathname) {
	// 			getSuggest();
	// 			showPlayer = false;
	// 		}
	// 	}
	// });

	// $: console.log(data);
</script>

<svelte:head>
	<title
		>{data.movie?.title.length > 14 ? `${data.movie.title.slice(0, 13)}...` : data.movie.title} - {data
			.movie.type}</title
	>
</svelte:head>

<NavbarTop>
	<a href="#info">info</a>
	{#if !data.error}
		<a href="#suggest">suggest</a>
	{/if}
</NavbarTop>

<div class="container">
	<div class:movie={showPlayer} class:poster={!showPlayer}>
		{#if !showPlayer}
			<img class="image" src={data.movie.poster} alt={data.movie.title} />
			<button class="btn-play" on:click={() => (showPlayer = !showPlayer)}>
				<Icon style="background-color: white; border-radius: 50vh;" shadow>
					{@html Play}
				</Icon>
			</button>
			<div class="info__item">
				<YearMovie value={data.movie.year} />
				<RuntimeMovie value={data.movie.runtime} />
			</div>
		{:else}
			<VideoPlayer />
		{/if}
	</div>
	<div class="info content" id="info">
		{#key data.movie}
			<InfoMovie movie={data.movie} />
		{/key}
	</div>
</div>

<div class="suggest" id="suggest">
	{#if data.error}
		<div style="width: 100%;" class="content">
			<Alert warn>
				For now we do <span>not have related movies or series</span>
			</Alert>
		</div>
	{/if}
	{#if data.stream}
		{#await data.stream.suggestions}
			<CarouselMovies movies={undefined} details={false} title="loading" />
		{:then value}
			<CarouselMovies movies={value} details={false} title="Suggestions" />
		{/await}
	{/if}
</div>

<style>
	:root {
		/* modal */
		--movie-info-item-opacity: 0.5;
	}

	:global(body[data-theme='light']) {
		/* modal */
		--movie-info-item-opacity: 0.8;
	}

	.container {
		display: flex;
		flex-direction: column;
	}

	.poster,
	.info {
		padding-top: 2em;
	}

	.poster {
		background: linear-gradient(to top, transparent 10%, var(--c-front) 150%);
		position: relative;
		text-align: center;
		width: 100%;
		height: 100%;
		/* transition: background 0.3s linear; */
	}

	.movie {
		width: 100%;
	}

	.image {
		display: block;
		width: auto;
		max-width: 100%;
		max-height: 500px;
		margin: 1em auto;
		box-shadow: 0 1px 2px rgb(0 0 0 / 7%), 0 2px 4px rgb(0 0 0 / 7%), 0 4px 8px rgb(0 0 0 / 7%),
			0 8px 16px rgb(0 0 0 / 7%), 0 16px 32px rgb(0 0 0 / 7%), 0 32px 64px rgb(0 0 0 / 7%);
		border-radius: 10px;
		border: 1px solid rgb(255 255 255 / 7%);
		overflow: hidden;
	}

	.poster .btn-play {
		--icon-size: 5rem;

		display: inline-flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%) rotate(0deg);
		border: none;
		color: var(--c-front);
		padding: 0;
		margin: 0;
		background-color: transparent;
		cursor: pointer;
		transform-origin: center;
	}

	@media (min-width: 768px) {
		.container {
			flex-direction: row;
			flex-wrap: wrap;
		}

		.movie {
			width: 100%;
		}

		.poster {
			width: 50%;
			position: sticky;
			top: 2em;
		}
		.info {
			width: 50%;
		}

		.movie + .info {
			width: 100%;
		}
	}

	.suggest {
		padding-block: 3em;
	}

	:global(.info__item) {
		padding-bottom: 1em;
		/* border-top: 1px solid var(--c-divider); */
	}
	:global(.info__item + .info__item) {
		padding-top: 1em;
		border-top: 1px solid var(--c-divider);
	}

	:global(.info__item:last-of-type) {
		padding-bottom: 0;
	}

	.info__item :global(svg) {
		color: var(--c-front);
	}

	:global(.info__property) {
		opacity: var(--movie-info-item-opacity);
		text-transform: capitalize;
		font-weight: bold;
		line-height: 2rem;
	}

	/* @media (min-width: 576px) {}
	@media (min-width: 768px) {}
	@media (min-width: 992px) {}
	@media (min-width: 1200px) {} */

	@media (min-width: 768px) {
	}
	@media (min-width: 992px) {
	}
</style>
