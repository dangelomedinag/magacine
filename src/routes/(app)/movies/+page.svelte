<script lang="ts">
	import MovieItem from '$components/gridMovies/movieItem.svelte';
	import Icon from '$components/icons/icon.svelte';
	import Search from '$icons/solid/search.svg?raw';
	import NavbarTop from '$components/navbar/navbarTop.svelte';
	import SectionPage from '$components/ui/SectionPage.svelte';
	import type { MovieResult, MoviesResponse } from '$lib/types';
	import GridCards from '$components/gridMovies/GridCards.svelte';
	import Paginator from './Paginator.svelte';

	export let data;
	let arr = data.movies;
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

	function setPage(page: number, movies: MoviesResponse) {
		if (page < 1) {
			arr = data.movies;
			active = page;
			return;
		}

		arr = movies;
		active = page;

		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}
</script>

<SectionPage>
	<span><Icon>{@html Search}</Icon> page: {active + 1}</span>
	<h1>{data.movies?.search}</h1>
</SectionPage>
<Paginator stream={data.stream} {active} {setPage} />

<div class="content">
	<GridCards movies={arr} full />
	<Paginator stream={data.stream} {active} {setPage} />
</div>

<style>
	h1 {
		font-size: 3em;
		font-weight: lighter;
		text-transform: capitalize;
	}

	.pages-wrapper {
		bottom: 3em;
	}
	.wrapper {
		width: max-content;
		border: 1px solid var(--c-divider);
		border-radius: 50vh;
		padding: 0.5em;
		margin-inline: auto;
		/* box-shadow: var(--shadow-long); */
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
		color: white;
		background-color: var(--c-front);
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
