<script context="module">
	/**  @type {import("@sveltejs/kit").Load}*/
	export const load = async ({ fetch, params }) => {
		const req = await fetch('/api/' + params.id);
		const details = await req.json();
		return {
			props: {
				movie: details
			}
		};
	};
</script>

<script>
	import { goto } from '$app/navigation';
	import CardRatingStarts from '$lib/components/ui/card/cardRatingStarts.svelte';
	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';
	import NavbarTop from '$lib/components/ui/NavbarTop.svelte';
	import Toast from '$lib/components/ui/toast.svelte';

	export let movie;
	let header;
	let display = 'none';

	// function showHeader() {
	// 	if (window.scrollY >= header.offsetTop + 60) {
	// 		display = 'flex';
	// 	} else if (window.scrollY < header.offsetTop + 60) {
	// 		display = 'none';
	// 	}
	// }

	function listFormat(array, language = 'en', opts = { style: 'long', type: 'conjunction' }) {
		const intl = new Intl.ListFormat(language, opts);
		return intl.format(array);
	}

	const rndInt = (MAX) => Math.floor(Math.random() * MAX) + 1;

	// async function getSuggest() {
	// 	const { plot } = movie;

	// 	const plotArr = plot.split(' ');
	// 	const plotArrFilter = plotArr.filter((word) => word.length > 4 && !word.includes('-'));
	// 	let selected = plotArrFilter[rndInt(plotArrFilter.length - 1)];

	// 	console.log(selected);

	// 	const req = await fetch('/api?s=' + selected.replace(/\.|\(|\)|\"|\'|\,|\$|\-/g, ''));
	// 	if (!req.ok) {
	// 		return Promise.reject(await req.json());
	// 	}
	// 	return req.json();
	// }

	function getSuggest() {
		return Promise.reject();
	}
</script>

<NavbarTop>
	<button
		on:click={() => {
			goto('#info', { replaceState: true });
		}}>info</button
	>
	<button
		on:click={() => {
			goto('#suggest', { replaceState: true });
		}}>suggest</button
	>
</NavbarTop>

<div class="wrapper">
	<div
		class="poster-wrapper"
		style="background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('{movie.poster ??
			`/assets/image-fallback.jpg`}') ; background-size: contain;"
	>
		<img src={movie.poster ?? '/assets/image-fallback.jpg'} alt={movie.title} />
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
</div>
<!-- <header style:display>
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
		</div>
	</header> -->
<div class="information" id="info" bind:this={header}>
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
		{#each movie?.genre ?? [] as item}
			<span class="tag">{item}</span>
		{:else}
			<span class="tag tag--unknown">desconocido</span>
		{/each}
	</div>

	{#if movie.language}
		<div class="item">
			<span class="property">language:</span>
			<span>
				{listFormat(movie.language)}
			</span>
		</div>
	{/if}

	{#if movie.imdbrating}
		<div class="item">
			<span class="property">rating:</span>
			<div>{(movie.imdbrating / 2).toFixed(1)}</div>
			<CardRatingStarts --icon-fz="1.5rem" rating={movie.imdbrating} />
		</div>
	{/if}

	<!-- {#if suggest}
			<div class="suggest" id="suggest">
				<CarouselMovies movies={suggest} title="suggest" priority="small" />
			</div>
			{/if} -->

	{#await getSuggest()}
		<p>cargando sugerencias...</p>
	{:then value}
		<!-- {@const data = value?.results.filter((m) => m.poster !== 'N/A')} -->
		<!-- movies={value.results.filter((e) => e.poster !== 'N/A')} -->
		{#if Array.isArray(value?.results)}
			<div class="suggest" id="suggest">
				<CarouselMovies
					--card-w="350px"
					--card-h="250px"
					movies={value}
					details={false}
					title="suggest"
					priority="small"
				/>
			</div>
		{/if}
	{:catch}
		<Toast>
			for now we do <span>not have related movies or series</span>
		</Toast>
	{/await}
</div>

<!-- {/if} -->

<!-- </div> -->
<style>
	.information svg {
		width: 1rem;
		height: 1rem;
		color: brown;
	}

	.poster-wrapper {
		/* position: sticky;
		top: 0;
		z-index: 0; */
		/* display: block; */
		position: relative;
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
	/* .poster-wrapper button:hover {
		background: radial-gradient(white 30%, transparent 60%);
		color: var(--c-front-dark);
	} */
	.poster-wrapper svg {
		filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 1));
		border-radius: 50vh;
		background-color: white;
		height: 4rem;
		width: 4rem;
		/* box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11),
			0 4px 4px rgba(0, 0, 0, 0.11), 0 8px 8px rgba(0, 0, 0, 0.11), 0 16px 16px rgba(0, 0, 0, 0.11),
			0 32px 32px rgba(0, 0, 0, 0.11); */
	}

	/* .poster-wrapper path {
	} */

	.suggest {
		padding-top: 3em;
	}

	/* .information::before {
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
	} */

	.information {
		position: relative;
		z-index: 1;
		background-color: var(--c-main-content);
		/* padding-bottom: 30rem; */
		/* min-height: 100vh; */
		padding: var(--gap-content);
		padding-top: 3em;

		border-top: 2px solid brown;
	}

	/* header {
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
	} */

	/* header .wrapper-controls {
		height: 100%;
	}

	header button {
		display: inline-flex;
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
		justify-content: flex-start;
		align-items: center;
		height: 100%;
		text-decoration: none;
	}
	header button:hover,
	header a:hover {
		background-color: rgb(120, 31, 31);
	}

	header svg {
		height: 1.3rem;
		width: 1.3rem;
	}

	header .title {
		font-weight: bold;
		padding-left: var(--gap-content);
	} */

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
