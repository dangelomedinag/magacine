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
	import CardRatingStarts from '$components/ui/card/cardRatingStarts.svelte';
	import CarouselMovies from '$components/ui/CarouselMovies.svelte';
	import NavbarTop from '$components/ui/NavbarTop.svelte';
	import Toast from '$components/ui/toast.svelte';
	import { randomInt, listFormat } from '$helpers';
	import Modal from '$lib/components/ui/movie/modal.svelte';
	import VideoPlayer from '$lib/components/ui/movie/videoPlayer.svelte';

	export let movie;
	let modal;
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
				suggetsPromise = getSuggest;
				showPlayer = false;
				existSuggestions = false;
			}
			modal.close();
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
		}}>info</button
	>
	{#if existSuggestions}
		<button
			on:click={() => {
				goto('#suggest', { replaceState: true });
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
			{#if movie.year}
				<div style="padding-top: 1em;">
					<div class="item">
						<span class="property">
							Year
							{#if movie.runtime}
								/ duration
							{/if}
							:
						</span>
						<span
							><svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
							{movie.year}
							{#if movie.runtime}
								/ <svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg> <span>{movie.runtime} </span>
							{/if}
						</span>
					</div>
				</div>
			{/if}
			<button class="btn-play" on:click={() => (showPlayer = !showPlayer)}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		{:else}
			<!-- <div class="movie"> -->

			<VideoPlayer />
			<!-- </div> -->
		{/if}
	</div>
	<div class="info content" id="info">
		<div class="item">
			<!-- <span class="property">title:</span> -->
			<h1 class="title">{movie.title}</h1>
		</div>

		{#if movie.plot}
			<div class="synopsis item">
				<span class="property">synopsis:</span>
				<p>{@html movie.plot}</p>
			</div>
		{/if}
		<div class="item">
			<span class="property">genders:</span>
			{#each movie?.genre ?? [] as item}
				<span class="tag">{item}</span>
			{:else}
				<span class="tag tag--unknown">desconocido</span>
			{/each}
		</div>

		{#if movie.language?.length > 0}
			<div class="item">
				<span class="property">language:</span>
				<span>
					{listFormat(movie.language)}
				</span>
			</div>
		{/if}

		{#if movie.imdbrating}
			<div class="item">
				<CardRatingStarts --icon-fz="2rem" rating={movie.imdbrating} block />
				<span class="property">rating:</span>
				<div>imdb: {(movie.imdbrating / 2).toFixed(1)}</div>

				{#if movie.ratings?.length > 0}
					{#each movie.ratings as item}
						<div>
							<span>{item.source}: {item.value}</span>
						</div>
					{/each}
				{/if}
			</div>
		{/if}

		<button on:click={modal.open} class="btn-details">more details</button>

		<Modal bind:this={modal} Zindex="50">
			{#if movie.released}
				<div class="item">
					<span class="property">Released:</span>
					<div>{movie.released}</div>
				</div>
			{/if}
			{#if movie.director}
				<div class="item">
					<span class="property">Director:</span>
					<div>{movie.director}</div>
				</div>
			{/if}
			{#if movie.writer}
				<div class="item">
					<span class="property">Writer:</span>
					<div>
						{listFormat(!movie.writer.includes(',') ? [movie.writer] : movie.writer.split(','))}
					</div>
				</div>
			{/if}
			{#if movie.actors}
				<div class="item">
					<span class="property">Actors:</span>
					<div>
						{listFormat(!movie.actors.includes(',') ? [movie.actors] : movie.actors.split(','))}
					</div>
				</div>
			{/if}
			{#if movie.awards}
				<div class="item">
					<span class="property">Awares:</span>
					<div>
						{movie.awards}
					</div>
				</div>
			{/if}
			{#if movie.country}
				<div class="item">
					<span class="property">Country:</span>
					<div>
						{listFormat(!movie.country.includes(',') ? [movie.country] : movie.country.split(','))}
					</div>
				</div>
			{/if}
		</Modal>
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
	svg {
		width: 1rem;
		height: 1rem;
		/* color: brown; */
	}

	.container {
		/* background-color: rgba(245, 245, 220, 0.1); */
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		/* flex-wrap: wrap; */
		/* padding-top: 1em;
		padding-bottom: 1em; */
	}

	/* .container > * {
		flex-basis: 1 1 100%;
	} */
	.poster,
	.info {
		/* padding-top: 1em; */
	}

	.poster {
		/* padding-bottom: 1em; */
		background: linear-gradient(to top, var(--c-main-content) 20%, var(--c-front) 200%);
		position: relative;
		text-align: center;
		width: 100%;
		height: 100%;

		padding-top: 2em;
		/* width: 50%; */
	}
	.movie {
		width: 100%;
	}

	.info {
		/* display: flex;
		flex-wrap: wrap; */
		/* background-color: rgba(255, 0, 0, 0.1); */
		/* width: 50%; */
	}

	.image {
		display: block;
		width: auto;
		max-width: 100%;
		max-height: 500px;
		margin: 0 auto;
		box-shadow: 0 1px 2px rgb(0 0 0 / 7%), 0 2px 4px rgb(0 0 0 / 7%), 0 4px 8px rgb(0 0 0 / 7%),
			0 8px 16px rgb(0 0 0 / 7%), 0 16px 32px rgb(0 0 0 / 7%), 0 32px 64px rgb(0 0 0 / 7%);
		border-radius: 10px;
		overflow: hidden;
	}

	.poster .btn-play {
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
		/* padding: 0.5em; */
		/* background: radial-gradient(white 20%, transparent 20%); */
		cursor: pointer;
	}
	.btn-play svg {
		/* filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 1)); */
		border-radius: 50vh;
		background-color: white;
		height: 4rem;
		width: 4rem;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11),
			0 4px 4px rgba(0, 0, 0, 0.11), 0 8px 8px rgba(0, 0, 0, 0.11), 0 16px 16px rgba(0, 0, 0, 0.11),
			0 32px 32px rgba(0, 0, 0, 0.11);
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

	.item {
		padding-bottom: 1em;
	}

	.item svg {
		color: var(--c-front);
	}

	.property {
		opacity: 0.5;
		text-transform: capitalize;
		font-weight: lighter;
	}

	.btn-details {
		display: block;
		width: 100%;
		border: 1px solid rgb(255 255 255 / 7%);
		background-color: transparent;
		color: inherit;
		padding: 0.5em 0.2em;
		border-radius: 5px;
		cursor: pointer;
	}

	.btn-details:hover {
		background-color: var(--c-main);
	}

	.tag {
		display: inline-block;
		border: 1px solid rgba(21, 196, 123, 0.3);
		padding-left: 0.5em;
		padding-right: 0.5em;
		margin-top: 0.3rem;
		margin-left: 0.175em;
		margin-right: 0.175em;
		background-color: rgb(18, 54, 42);
		color: rgb(21, 196, 123);
		border-radius: 50vh;
	}

	.tag--unknown {
		border: 1px solid rgba(196, 21, 56, 0.3);
		background-color: rgb(64, 35, 38);
		color: rgb(185, 63, 88);
	}

	.synopsis p {
		margin-top: 0;
	}

	h1 {
		margin: 0;
		font-size: 2rem;
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
