<script lang="ts">
	// icons
	import Icon from '$icons/icon.svelte';
	import ChevronRight from '$icons/outline/chevron-right.svelte';

	// components
	import Spinner from '$lib/components/ui/spinner.svelte';
	import CardMovie from '$components/card/cardMovie.svelte';
	import CardMovieSeeAll from '$components/card/cardMovieSeeAll.svelte';
	import type { MoviesResponse } from '$lib/types';

	// interface CarouselMoviesData {
	// 	results: MovieItem[];
	// 	query?: string;
	// 	search?: string;
	// 	totalResults?: number;
	// }
	// MoviesRespons

	type CarouselMoviesProp = undefined | MoviesResponse | Error;

	// props
	interface Props {
		movies?: CarouselMoviesProp;
		full?: boolean;
		title?: string;
		details?: boolean;
		position?: string;
		error?: import('svelte').Snippet<[{ message: string }]>;
	}

	let {
		movies = undefined,
		full = false,
		title = '',
		details = true,
		position = 'relative',
		error
	}: Props = $props();
</script>

<div class="carousel-wrapper" style:position>
	{#if !movies}
		<Spinner />
	{/if}

	{#if movies}
		{#if movies instanceof Error}
			{@render error?.({ message: movies.message })}
		{:else}
			<header class="carousel-header content">
				<h3 class="header-title">{title}</h3>
				{#if movies.totalResults > 10}
					<a href="/movies?{movies?.query}" class="header-btn"
						>See all<span>
							<Icon y="10%"><ChevronRight /></Icon>
						</span></a
					>
				{/if}
			</header>
			<main class="items-wrapper content">
				{#each movies.results as movie, i (movie.uuid)}
					<CardMovie {details} {movie} progress={movie.progress ?? 0} {i} {full} />
				{/each}
				{#if movies?.totalResults > 10}
					<CardMovieSeeAll query={movies.query} posters={movies.results.map((m) => m.poster)} />
				{/if}
			</main>
		{/if}
	{/if}
	<!-- 
	{#if movies}
		<header class="carousel-header content">
			<h3 class="header-title">{title}</h3>
			{#if movies.totalResults > 10}
				<a href="/movies?{movies?.query}" class="header-btn"
					>See all<span>
						<Icon y="10%"><ChevronRight /></Icon>
					</span></a
				>
			{/if}
		</header>
		<main class="items-wrapper content">
			{#each movies.results as movie, i (movie.uuid)}
				<CardMovie {details} {movie} progress={movie.progress ?? 0} {i} {full} />
			{/each}
			{#if movies?.totalResults > 10}
				<CardMovieSeeAll query={movies.query} posters={movies.results.map((m) => m.poster)} />
			{/if}
		</main>

		<slot name="error" message={movies.message} />
	{/if}

	{#if movies instanceof Error}
		<slot name="error" message={movies.message} />
	{/if} -->
</div>

<style>
	/* @media (min-width: 576px) {} */
	/* @media (min-width: 768px) {} */
	/* @media (min-width: 992px) {} */
	/* @media (min-width: 1200px) {} */

	.carousel-wrapper {
		/* --w-card: 250px; */

		padding-top: 1em;
		padding-bottom: 2em;
		position: relative;
		/* height: 400px; */
	}

	/* .priority-small .item {
		min-width: 200px;
	}
	.priority-medium .item {
		min-width: 220px;
	}
	.priority-large .item {
		min-width: 250px;
	} */

	/* @media (min-width: 768px) { */
	/* .priority-small :global(.item) { */
	/* --w-card: 200px; */
	/* max-height: 450px; */
	/* min-width: 200px; */
	/* } */
	/* .priority-medium :global(.item) { */
	/* --w-card: 250px; */
	/* max-height: 550px; */
	/* min-width: 250px; */
	/* } */
	/* .priority-large :global(.item) { */
	/* --w-card: 300px; */
	/* min-width: 350px; */
	/* } */
	/* } */

	.carousel-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header-title {
		font-size: 1.3em;
		margin: 0;
		flex-shrink: 1;
		flex-grow: 1;

		width: 250px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* @media (min-width: 300px) {
		.header-title {
			width: 100%;
			white-space: normal;
			overflow: auto;
			text-overflow: initial;
		}
	} */

	.header-btn {
		background-color: transparent;
		margin: 0;
		border: none;
		color: gray;
		display: flex;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		flex-shrink: 0;
		flex-grow: 0;
	}

	.header-btn:hover {
		text-decoration: underline;
		cursor: pointer;
	}

	.items-wrapper {
		display: flex;
		gap: 1em;
		overflow-x: auto;
		padding-top: 2em;
		padding-bottom: 3em;
		scroll-behavior: smooth;
	}

	/* .empty-wrapper {
		border: 1px solid rgba(128, 128, 128, 0.3);
		padding: 2em;
		width: 100%;
		text-align: center;
	} */

	/* .hidden {
		display: none;
	} */

	/* sssssssss */

	/* .controls:hover {
		opacity: 1;
		cursor: pointer;
	} */

	/* .controls {
		display: block;
		position: absolute;
		z-index: 15;
		top: 15%;
		height: 50px;
		width: 30px;
		opacity: 0.1;
		color: white;
		background-color: var(--c-front-dark);
		border: none;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			0 32px 64px rgba(0, 0, 0, 0.07);
	} */

	/* .controls:disabled {
		background-color: aqua;
	}

	.next {
		border-radius: 0 5px 5px 0;
		left: calc(var(--gap-content) * -1);
	}
	.prev {
		border-radius: 5px 0 0 5px;
		right: calc(var(--gap-content) * -1);
	}

	.carousel-wrapper:hover .controls {
		opacity: 1;
	} */

	/* .track:hover .prev,
	.track:hover .next {
		display: initial;
	} */

	/* .carousel-wrapper header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	} */
	/* .carousel-wrapper main {
		display: flex;
		overflow-x: auto;
		padding-left: 0;
		padding-right: 1em;
		padding-top: 1em;
		padding-bottom: 1em;
		height: 300px;
		scroll-behavior: smooth;
	}

	header h3 {
		margin: 0;
	}
	header button {
		background-color: transparent;
		margin: 0;
		border: none;
		color: gray;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	header button:hover {
		text-decoration: underline;
		cursor: pointer;
	}

	header .svg {
		width: 20px;
		height: 20px;
	}

	.poster {
		width: 100%;
		object-fit: cover;
		object-position: top;
		transition: transform 0.2s ease-in-out;
	}

	figure {
		overflow: hidden;
		border-radius: 15px;
		min-width: 250px;
		position: relative;
		margin: 0;
		margin-right: 1em;
	}

	figure:hover figcaption {
		background: linear-gradient(transparent, rgba(255, 255, 255, 0.2));
	}

	figure:hover .poster {
		transform: scale(1.02);
	}

	figcaption {
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
		padding: 2em;
		padding-top: 0;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
	}

	.rating {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 10px;
	}

	.info h2 {
		margin: 0;
		font-weight: 600;
		font-size: 1.3rem;
		margin-bottom: 0.2em;
	}

	.info p {
		margin: 0;
		margin-bottom: 0.6em;
		opacity: 0.7;
	}

	.rating img {
		max-width: 28px;
	}
	.rating span {
		font-size: 0.8em;
		margin-left: 5px;
		margin-right: 5px;
	}

	.actions {
		margin-top: auto;
		flex-shrink: 0;
	}

	.actions button {
		border: none;
		border-radius: 50vh;
		margin: 0;
		padding: 0.8em 1.2em;
		cursor: pointer;
	}

	.cta-btn:hover {
		background-color: rgba(255, 0, 0, 0.8);
	}

	.cta-btn {
		background-color: rgba(255, 0, 0, 0.4);
		color: white;
	}
	.more {
		background-color: rgba(255, 255, 255, 0.5);
		color: black;
	}

	.more:hover {
		background-color: white;
	} */

	/* custom scroll bars */

	.items-wrapper::-webkit-scrollbar {
		height: 5px;
		border-radius: 10px;
	}

	.items-wrapper::-webkit-scrollbar-track {
		background: rgba(128, 128, 128, 0.05);
		margin: var(--gap-content);
		border-radius: 10px;
		overflow: hidden;
	}

	.items-wrapper::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 15px;
	}

	.items-wrapper::-webkit-scrollbar-thumb:hover {
		background: #555;
	}

	:global(body[data-theme='light']) .items-wrapper::-webkit-scrollbar-track {
		background: var(--c-divider);
	}
	:global(body[data-theme='light']) .items-wrapper::-webkit-scrollbar-thumb {
		background: var(--c-divider);
	}
	:global(body[data-theme='light']) .items-wrapper::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
