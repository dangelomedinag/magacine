<script>
	import { onMount } from 'svelte';

	import MovieItem from '$components/gridMovies/movieItem.svelte';
	import NavbarTop from '$components/navbar/navbarTop.svelte';
	import Spinner from '$lib/components/ui/spinner.svelte';
	import Alert from '$components/ui/alert.svelte';

	/**@type {import("./$types").PageData}*/
	export let data;
	let rawMovies = { ...data.movies };
	let offset = 1;
	let loading = false;
	let stop = false;
	let element;

	const delay = (fn, ms) => setTimeout(fn, ms);

	onMount(() => {
		let options = {
			rootMargin: '0px',
			threshold: 1.0
		};

		const callback = (entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (stop) {
						return observer.disconnect();
					}
					loading = true;
					delay(loadMore, 400);
				}
			});
		};

		let observer = new IntersectionObserver(callback, options);
		observer.observe(element);

		return () => observer?.disconnect();
	});

	async function loadMore() {
		offset++;

		const query = new URLSearchParams();
		query.set('s', data.movies.search);
		query.set('page', offset);

		const req = await fetch('api?' + query.toString());
		const res = await req.json();

		if (!req.ok) {
			loading = false;
			stop = true;
			return;
		}

		data.movies.results = [...data.movies.results, ...res.results];
		loading = false;
		// movies.totalResults = movies.totalResults + res.totalResults;

		rawMovies = { ...data.movies };
	}
</script>

<NavbarTop>
	<button
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
	>
</NavbarTop>

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

<style>
	.grid-movies {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5em;
		max-width: 1000px;
		margin: 0 auto;
	}

	.loading {
		position: relative;
		text-align: center;
		width: 100%;
		margin-top: var(--gap-content);
		margin-bottom: var(--gap-content);
		padding: var(--gap-content);
		/* background-color: rgba(49, 15, 15, 0.3); */
	}

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
