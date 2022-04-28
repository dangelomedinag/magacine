<script context="module">
	/** @type {import("@sveltejs/kit").Load}*/
	export async function load({ fetch, params }) {
		const req = await fetch('/api/' + params.id);
		const details = await req.json();
		if (!details.response) {
			return {
				status: 400,
				error: new Error('movie not found')
			};
		}

		// console.log(details);
		return {
			props: {
				movie: details
			}
		};
	}
</script>

<script>
	import { page } from '$app/stores';
	import CardRatingStarts from '$lib/components/ui/card/cardRatingStarts.svelte';
	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';

	export let movie;
	// $: console.log(movie);
	let header;
	let display = 'none';
	function showHeader() {
		if (window.scrollY >= header.offsetTop + 60) {
			display = 'flex';
		} else if (window.scrollY < header.offsetTop + 60) {
			display = 'none';
		}
	}

	/* {
		Title: 'The Avengers',
		Year: '2012',
		Rated: 'PG-13',
		Released: '04 May 2012',
		Runtime: '143 min',
		Genre: 'Action, Adventure, Sci-Fi',
		Director: 'Joss Whedon',
		Writer: 'Joss Whedon, Zak Penn',
		Actors: 'Robert Downey Jr., Chris Evans, Scarlett Johansson',
		Plot: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
		Language: 'English, Russian, Hindi',
		Country: 'United States',
		Awards: 'Nominated for 1 Oscar. 38 wins & 80 nominations total',
		Poster: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
		Ratings: [
			{ Source: 'Internet Movie Database', Value: '8.1/10' },
			{ Source: 'Rotten Tomatoes', Value: '91%' },
			{ Source: 'Metacritic', Value: '69/100' }
		],
		Metascore: '69',
		imdbRating: '8.1',
		imdbVotes: '1,345,654',
		imdbID: 'tt0848228',
		Type: 'movie',
		DVD: '25 Sep 2012',
		BoxOffice: '$623,357,910',
		Production: 'N/A',
		Website: 'N/A',
		Response: 'True'
	} */
</script>

<svelte:window on:scroll={showHeader} />

<!-- <div class="content"> -->
<div class="wrapper">
	<div
		class="poster-wrapper"
		style="background: linear-gradient(rgba(0,0,0,0.7), black), url({movie.poster});"
	>
		<img src={movie.poster} alt={movie.title} />
		<button>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
				<path
					fill-rule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
	<header style:display>
		<a href="/">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
			<span>back</span>
		</a>
		<span class="title">{movie.title}</span>
		<div class="wrapper-controls">
			<button>
				<span>watch</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
			<!-- <button>more</button> -->
		</div>
	</header>
	<div class="information" bind:this={header}>
		<div class="item">
			<span class="property">title:</span>
			<h1 class="title">{movie.title}</h1>
		</div>

		{#if movie.year}
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
		{/if}

		{#if movie.plot}
			<div class="synopsis item">
				<span class="property">synopsis:</span>
				<p>{movie.plot}</p>
			</div>
		{/if}

		<div class="item">
			<span class="property">genders:</span>
			{#each movie.genre as item}
				<span class="tag">{item}</span>
			{:else}
				<span class="tag">desconocido</span>
			{/each}
		</div>

		{#if movie.language}
			<div class="item">
				<span class="property">language:</span>

				<span>
					{new Intl.ListFormat('es-CL', { style: 'long', type: 'conjunction' }).format(
						movie.language
					)}
				</span>
			</div>
		{/if}

		{#if movie.imdbrating}
			<div class="item">
				<span class="property">rating:</span>
				<div>{movie.imdbrating}</div>
				<CardRatingStarts --icon-fz="1.5rem" rating={movie.imdbrating} />
			</div>
		{/if}

		<!-- <div class="suggest">
			<CarouselMovies movies={$page.stuff.shrek} title="suggest" priority="small" />
		</div> -->
	</div>
</div>

<!-- </div> -->
<style>
	.information svg {
		width: 1rem;
		height: 1rem;
		color: brown;
	}

	.poster-wrapper {
		position: sticky;
		top: 0;
		z-index: 0;
		height: 100%;
		width: 100%;
	}

	.poster-wrapper img {
		display: block;
		margin: 0 auto;
		/* width: 100%;
		min-height: 200px;
		height: auto; */
		/* max-height: 60vh; */
		object-fit: cover;
	}

	.poster-wrapper button {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 50%;
		border: none;
		color: brown;
		transform: translate(-50%, -50%);
		border-radius: 50vh;
		padding: 1em;
		background: radial-gradient(white 20%, transparent 20%);
		cursor: pointer;
		transition: background 500ms ease-in-out;
		/* box-shadow: 0px 0px 20px -5px red; */
		/* cursor: pointer;
		animation-name: play-wave;
		animation-duration: 500ms;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite; */
	}
	.poster-wrapper button:hover {
		background: radial-gradient(white 30%, transparent 60%);
	}
	.poster-wrapper svg {
		height: 4rem;
		width: 4rem;
	}

	.information::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 150px;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
		transform: translateY(-100%);
		user-select: none;
		pointer-events: none;
	}

	.information {
		position: relative;
		z-index: 1;
		background-color: var(--c-main-content);
		padding-bottom: 30rem;
		min-height: 100vh;
		padding: 1em;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: sticky;
		top: 0;
		background-color: var(--c-main-content);
		height: 60px;
		z-index: 10;
		width: 100%;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			0 32px 64px rgba(0, 0, 0, 0.07);
		/* opacity: 0; */
	}

	header .wrapper-controls {
		/* display: inline; */
		height: 100%;
	}

	header button {
		display: inline-flex;
		/* gap: 0.5em; */
		justify-content: center;
		align-items: center;
		height: 100%;
		border: none;
		background-color: transparent;
		margin: 0;
		color: white;
		font-weight: bold;
		cursor: pointer;
	}
	header a {
		color: white;
		font-weight: bold;
		cursor: pointer;
		display: inline-flex;
		/* gap: 0.5em; */
		justify-content: flex-start;
		align-items: center;
		height: 100%;
		/* background-color: brown; */
		text-decoration: none;
	}
	header button:hover {
		background-color: rgb(120, 31, 31);
	}

	header svg {
		height: 1.3rem;
		width: 1.3rem;
	}

	header .title {
		font-weight: bold;
		padding-left: var(--gap-content);
	}

	.item {
		padding-bottom: 1em;
	}

	.property {
		opacity: 0.5;
		text-transform: capitalize;
	}

	.tag {
		display: inline-block;
		border: 1px solid rgba(21, 196, 123, 0.3);
		padding-left: 0.5em;
		padding-right: 0.5em;
		/* margin: 1rem .175rem; */
		margin-top: 0.3rem;
		/* margin-bottom: 0.175rem; */
		margin-left: 0.175em;
		margin-right: 0.175em;
		background-color: rgb(18, 54, 42);
		color: rgb(21, 196, 123);
		border-radius: 50vh;
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
