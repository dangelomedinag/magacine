<script lang="ts">
	import MovieItem from '$components/gridMovies/movieItem.svelte';
	import NavbarTop from '$components/navbar/navbarTop.svelte';
	import type { MovieResult } from '$lib/types';

	export let data;
	let arr = data.movies.results;
	let active = 0;
	// console.log(data);

	// let rawMovies = { ...data.movies };
	// let offset = 1;
	// let loading = false;
	// let stop = false;
	// let element;

	// const delay = (fn, ms) => setTimeout(fn, ms);

	// onMount(() => {
	// 	let options = {
	// 		rootMargin: '0px',
	// 		threshold: 1.0
	// 	};

	// 	const callback = (entries, observer) => {
	// 		entries.forEach((entry) => {
	// 			if (entry.isIntersecting) {
	// 				if (stop) {
	// 					return observer.disconnect();
	// 				}
	// 				loading = true;
	// 				delay(loadMore, 400);
	// 			}
	// 		});
	// 	};

	// 	let observer = new IntersectionObserver(callback, options);
	// 	observer.observe(element);

	// 	return () => observer?.disconnect();
	// });

	// async function loadMore() {
	// 	offset++;

	// 	const query = new URLSearchParams();
	// 	query.set('s', data.movies.search);
	// 	query.set('page', offset);

	// 	const req = await fetch('api?' + query.toString());
	// 	const res = await req.json();

	// 	if (!req.ok) {
	// 		loading = false;
	// 		stop = true;
	// 		return;
	// 	}

	// 	data.movies.results = [...data.movies.results, ...res.results];
	// 	loading = false;

	// 	rawMovies = { ...data.movies };
	// }

	function setPage(page: number, results: MovieResult[]) {
		if (page < 1) {
			arr = data.movies?.results;
			active = page;
			return;
		}

		arr = results;
		active = page;

		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}
</script>

<NavbarTop>
	<!-- <button
		on:click={() => {
			data.movies.results = rawMovies.results.filter((m) => m.type === 'movie');
		}}>movies</button
	>
	<button
		on:click={() => {
			data.movies.results = rawMovies.results.filter((m) => m.type === 'series');
		}}>series</button
	>
	<button
		on:click={() => {
			data.movies.results = rawMovies.results;
		}}>all</button
	> -->
</NavbarTop>

<!-- 
<div class="content">
	<h1>{data.movies.search} - all results</h1>

	<div class="grid-movies">
		{#each data.movies.results as movie (movie.uuid)}
			<MovieItem {movie} />
		{/each}
	</div>
	<div bind:this={element} class="loading">
		{#if loading}
			<Spinner position="relative" top={'30%'}>loading more...</Spinner>
		{:else if stop}
			<Alert>
				<span>{data.movies.results.length} results</span> | there are <span>no more</span> movies/series
				to show
			</Alert>
		{/if}
	</div>
</div>

<h1>Hello world</h1> -->
<div class="content">
	<h1>{data.movies?.search}</h1>
	<p>page: {active} - all results</p>

	<div class="grid-movies">
		{#each arr as movie (movie.uuid)}
			<MovieItem {movie} />
		{/each}
	</div>

	{#if data.stream}
		{#await data.stream.data then value}
			{#if Array.isArray(value)}
				<div class="pages-wrapper">
					<div class="wrapper">
						{#each value as page, i}
							<button
								class:active={i === active}
								class="button"
								on:click={() => setPage(i, page.results)}>{i + 1}</button
							>
						{/each}
					</div>
				</div>
			{/if}
		{/await}
	{/if}
</div>

<style>
	h1 {
		font-size: 3em;
		font-weight: lighter;
		text-transform: capitalize;
	}

	.pages-wrapper {
		position: sticky;
		width: 100%;
		bottom: 3em;
		margin-block: 2em;
	}
	.wrapper {
		width: max-content;
		background-color: var(--c-main-content);
		border-radius: 50vh;
		padding: 1em;
		margin-inline: auto;
		box-shadow: var(--shadow-long);
	}

	.button {
		background-color: transparent;
		border: 1px solid transparent;
		width: 2em;
		height: 2em;
		/* padding-inline: 0.8em;
		padding-block: 0.2em; */
	}

	.active {
		/* color: red; */
		background-color: var(--c-front-dark);
		border-radius: 100%;
	}

	.grid-movies {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(auto, minmax(300px, 1fr));
		/* grid-template-rows: repeat(4, 1fr); */
		gap: 0.5em;
		max-width: 1000px;
		margin: 0 auto;
	}

	/* .loading {
		position: relative;
		text-align: center;
		width: 100%;
		margin-top: var(--gap-content);
		margin-bottom: var(--gap-content);
		padding: var(--gap-content);
	} */

	/* @media (min-width: 576px) {} */
	/* @media (min-width: 768px) {} */
	/* @media (min-width: 992px) {} */
	/* @media (min-width: 1200px) {} */
	@media (min-width: 576px) {
		.grid-movies {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	@media (min-width: 768px) {
		.grid-movies {
			grid-template-columns: repeat(5, 1fr);
		}
	}
	@media (min-width: 992px) {
		.grid-movies {
			grid-template-columns: repeat(6, 1fr);
		}
	}
</style>
