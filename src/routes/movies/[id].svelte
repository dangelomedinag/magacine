<script context="module">
	/**  @type {import("@sveltejs/kit").Load}*/
	export const load = async ({ fetch, params }) => {
		try {
			const req = await fetch('/api/' + params.id);
			if (!req.ok) throw req;
			const movie = await req.json();

			return {
				props: {
					movie: movie
				}
			};
		} catch (error) {
			const msg = await error.json();
			return {
				status: 404,
				error: new Error(`${params.id} - ${msg.message}`)
			};
		}
	};
</script>

<script>
	import { goto, afterNavigate } from '$app/navigation';
	// import CardRatingStarts from '$components/ui/card/cardRatingStarts.svelte';
	import CarouselMovies from '$components/ui/CarouselMovies.svelte';
	import NavbarTop from '$components/ui/NavbarTop.svelte';
	import Toast from '$components/ui/toast.svelte';
	// import Modal from '$lib/components/ui/movie/modal.svelte';
	import VideoPlayer from '$lib/components/ui/movie/videoPlayer.svelte';
	import YearMovie from '$lib/components/ui/movie/yearMovie.svelte';
	import RuntimeMovie from '$lib/components/ui/movie/runtimeMovie.svelte';
	import InfoMovie from '$lib/components/ui/movie/infoMovie.svelte';
	import { randomInt } from '$helpers';
	import Icon from '$components/ui/icons/icon.svelte';

	export let movie;
	// let modal;
	let showPlayer = false;
	let suggetsPromise = getSuggest;
	let existSuggestions = false;

	async function getSuggest() {
		const { genre, plot } = movie;
		let selected;
		if (genre.length > 0) {
			selected = genre[randomInt(genre.length - 1)];
		} else {
			if (plot) {
				const plotArr = plot.split(' ');
				const plotArrFilter = plotArr.filter((word) => word.length > 4 && !word.includes('-'));
				selected = plotArrFilter[randomInt(plotArrFilter.length - 1)];
			}
		}

		try {
			if (!selected) throw Error('no content');
			const req = await fetch(
				'/api?s=' + selected.toLowerCase().replace(/\.|\(|\)|\"|\'|\,|\$|\-/g, '')
			);
			if (!req.ok) {
				throw Error('bad request');
			}
			existSuggestions = true;
			return req.json();
		} catch (error) {
			existSuggestions = false;
			return Promise.reject();
		}
	}

	afterNavigate(({ from, to }) => {
		if (from && to && from.pathname.startsWith('/movies/') && to.pathname.startsWith('/movies/')) {
			if (from.pathname !== to.pathname) {
				// movie = movie;
				suggetsPromise = getSuggest;
				showPlayer = false;
				existSuggestions = false;
			}
			// modal.close();
		}
	});
</script>

<svelte:head>
	<title
		>{movie?.title.length > 14 ? `${movie.title.slice(0, 13)}...` : movie.title} - {movie.type}</title
	>
</svelte:head>

<NavbarTop>
	<button
		on:click={() => {
			goto('#info', { replaceState: true });
			// document.getElementById('info').scrollTo({ behavior: 'smooth' });
		}}>info</button
	>
	{#if existSuggestions}
		<button
			on:click={() => {
				goto('#suggest', { replaceState: true });
				// document.getElementById('suggest').scrollIntoView();
			}}>suggest</button
		>
	{/if}
</NavbarTop>
<!-- <div class="content"> -->
<!-- <div> -->
<div class="container ">
	<!-- content here -->
	<div class:movie={showPlayer} class:poster={!showPlayer}>
		{#if !showPlayer}
			<img class="image" src={movie.poster} alt={movie.title} />
			<div class="info__item">
				<YearMovie value={movie.year} />
				<RuntimeMovie value={movie.runtime} />
			</div>

			<button class="btn-play" on:click={() => (showPlayer = !showPlayer)}>
				<Icon
					name="play"
					type="solid"
					style="background-color: white; border-radius: 50vh;"
					shadow
				/>
			</button>
		{:else}
			<VideoPlayer />
		{/if}
	</div>
	<div class="info content" id="info">
		{#key movie}
			<InfoMovie {movie} />
		{/key}
	</div>
</div>
<div class="content">
	{#await suggetsPromise()}
		<p>cargando sugerencias...</p>
	{:then value}
		{#if Array.isArray(value?.results)}
			<div class="suggest" id="suggest">
				<CarouselMovies movies={value} details={false} title="Suggestions" priority="small" />
			</div>
		{/if}
	{:catch}
		<div style="padding: var(--gap-content) 0;">
			<Toast warn>
				For now we do <span>not have related movies or series</span>
			</Toast>
		</div>
	{/await}
</div>
<!-- </div> -->
<!-- </div> -->

<!-- <div class="poster-wrapper" style="display: flex;">
		<div style="width: 50%;">
			<img src={movie.poster} alt={movie.title} />
			<button on:click={() => (showPlayer = !showPlayer)}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>
		<div style="width: 50%;">
			<button>1</button>
			<button>2</button>
			<button>3</button>
		</div>
	</div> -->

<!-- <VideoPlayer /> -->
<style>
	/* svg {
		width: 1rem;
		height: 1rem;
	} */

	.container {
		display: flex;
		flex-direction: column;
	}

	.poster,
	.info {
		padding-top: 2em;
	}

	.poster {
		background: linear-gradient(to top, var(--c-main-content) 20%, var(--c-front) 200%);
		position: relative;
		text-align: center;
		width: 100%;
		height: 100%;
	}
	.movie {
		width: 100%;
	}

	.info {
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
		overflow: hidden;
	}

	.poster .btn-play {
		--icon-size: 5rem;

		display: inline-flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		border: none;
		color: var(--c-front);
		padding: 0;
		margin: 0;
		background-color: transparent;
		cursor: pointer;
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
		padding-top: 3em;
	}

	:global(.info__item) {
		padding-bottom: 1em;
	}

	:global(.info__item svg) {
		color: var(--c-front);
	}

	:global(.info__property) {
		opacity: 0.5;
		text-transform: capitalize;
		font-weight: lighter;
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
