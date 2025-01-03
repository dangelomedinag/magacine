<script>
	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import Alert from '$components/ui/alert.svelte';
	import VideoPlayer from '$components/movie/videoPlayer.svelte';
	import YearMovie from '$components/movie/yearMovie.svelte';
	import RuntimeMovie from '$components/movie/runtimeMovie.svelte';
	import InfoMovie from '$components/movie/infoMovie.svelte';

	//icons
	import Icon from '$icons/icon.svelte';
	import Play from '$icons/solid/play.svg?raw';
	import Film from '$icons/solid/film.svg?raw';
	import { scale } from 'svelte/transition';

	/** @type {{data: any}} */
	let { data } = $props();
	let showPlayer = $state(false);

	function generateTitle() {
		const title = data.movie?.title;
		return title ? `${title} - Magacine` : 'Magacine';
	}
</script>

<svelte:head>
	<title>{generateTitle()}</title>
</svelte:head>

<div class="container content">
	<div class="content" class:movie={showPlayer} class:poster={!showPlayer}>
		{#if !showPlayer}
			<img in:scale={{ start: 0.9 }} class="image" src={data.movie.poster} alt={data.movie.title} />
			<button
				class="btn-play"
				onclick={() => {
					showPlayer = !showPlayer;
				}}
			>
				<Icon style="background-color: white; border-radius: 50vh;" shadow>
					{@html Play}
				</Icon>
			</button>
			<div class="info__item">
				<YearMovie value={data.movie.year} />
				<RuntimeMovie value={data.movie.runtime} />
			</div>
		{:else}
			<VideoPlayer
				on:ended={() => {
					setTimeout(() => {
						showPlayer = !showPlayer;
					}, 1000);
				}}
			/>
			<button
				class="show-poster"
				onclick={() => {
					showPlayer = !showPlayer;
				}}
			>
				<Icon y="10%">
					{@html Film}
				</Icon>
				show poster</button
			>
		{/if}
	</div>
	<div class="info content" id="info">
		<InfoMovie movie={data.movie} />
	</div>
</div>

<div class="suggest" id="suggest">
	{#if data.error}
		<div style="width: 100%;" class="content">
			<Alert warn>
				{@html data.error}
			</Alert>
		</div>
	{:else if data.stream}
		{#await data.stream.suggestions}
			<CarouselMovies movies={undefined} details={false} title="loading" />
		{:then value}
			{#if value.message}
				<div style="width: 100%;" class="content">
					<Alert warn>
						{@html data.error ?? '<span>No content related to your last search</span>'}
					</Alert>
				</div>
			{:else}
				<CarouselMovies movies={value} details={false} title="Suggestions" />
			{/if}
		{:catch error}
			<div style="width: 100%;" class="content">
				<Alert warn>
					{@html data.error ?? '<span>No content related to your last search</span>'}
				</Alert>
			</div>
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
		margin-top: 1em;
	}

	.poster,
	.info {
		padding-top: 2em;
	}

	.poster,
	.movie {
		transition: width 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
		background: linear-gradient(to top, transparent 10%, var(--c-front) 200%);
		border-radius: 15px;
	}

	.poster {
		/* position: relative; */
		/* z-index: -1; */
		text-align: center;
		width: 100%;
		height: 100%;

		/* filter: contrast(10%) brightness(100%); */
		/* transition: background 0.3s linear; */
	}

	.info {
		max-width: 700px;
		margin-inline: auto;
	}

	.movie {
		width: 100%;
		background: linear-gradient(to top, transparent 10%, var(--c-front) 200%);
	}

	.image {
		display: block;
		width: auto;
		max-width: 100%;
		max-height: 500px;
		margin: 1em auto;
		box-shadow:
			0 1px 2px rgb(0 0 0 / 7%),
			0 2px 4px rgb(0 0 0 / 7%),
			0 4px 8px rgb(0 0 0 / 7%),
			0 8px 16px rgb(0 0 0 / 7%),
			0 16px 32px rgb(0 0 0 / 7%),
			0 32px 64px rgb(0 0 0 / 7%);
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

		/* .movie {
			width: 100%;
		} */

		.poster {
			width: 50%;
			/* position: sticky; */
			top: 0;
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

	.show-poster {
		background-color: var(--c-front-dark);
		text-align: center;
		border-radius: 5px;
		border: 1px solid var(--c-front-dark);
		color: white;
		padding-inline: 0.5rem;
		padding-block: 0.2rem;
		font-size: 0.7rem;
		text-transform: uppercase;
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
