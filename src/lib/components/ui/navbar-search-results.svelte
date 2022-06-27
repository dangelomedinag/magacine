<script>
	import Spinner from '$components/ui/Spinner.svelte';

	import Toast from '$components/ui/toast.svelte';
	import { fly } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import CarouselMovies from '$components/ui/CarouselMovies.svelte';
	import { page } from '$app/stores';

	export let results;
</script>

<header class="modal-header">
	{#await results}
		Searching...
	{:then response}
		{response.search}
	{:catch error}
		{error.message}
	{/await}
</header>

{#await results}
	<Spinner />
{:then response}
	<ul class="list">
		{#each response.results as movie, i (movie.uuid)}
			<li class="list__item" in:fly={{ x: 60, easing: quintInOut, delay: 50 * i }}>
				<span class="info-wrapper">
					<div class="title">
						{movie.title} - {movie.year}
					</div>
					<div class="type">{movie.type}</div>
				</span>
				<img src={movie.poster} alt={movie.title} />
			</li>
		{/each}
		<li class="total-results">
			{response.totalResults} total results
		</li>
	</ul>
{:catch error}
	<div class="toast-wrapper">
		<Toast danger>
			<span>
				{error.message}
			</span>
		</Toast>
	</div>
	<CarouselMovies details={false} movies={$page.stuff.suggest} title="suggestions" />
{/await}

<style>
	.toast-wrapper {
		padding: 1em 0;
	}

	.modal-header {
		text-align: center;
	}

	.list {
		list-style: none;
		padding: 1em 0;
		margin: 0;
		flex-direction: column;
		display: flex;
		gap: 0.2em;
	}

	.list__item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--c-divider);
		/* flex-basis: 100%; */
	}
	.list__item:hover {
		background-color: var(--c-divider);
	}
	/* .list__item:hover .list__link {
		color: var(--c-front);
	} */

	/* .list__item--block {
		flex-basis: 100%;
	} */

	/* .list__link {
		padding: 0.5em;
		display: flex;
		align-items: center;
		color: var(--c-text-base);
		text-decoration: none;
	} */

	/* .list__label {
		padding-left: 0.5em;
	} */

	img {
		max-height: 70px;
		display: block;
		width: 50px;
		object-fit: cover;
	}

	.info-wrapper {
		padding-left: 1em;
	}

	.title {
		width: 250px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.type {
		font-weight: lighter;
	}

	.total-results {
		text-align: center;
		padding-top: 0.5em;
		flex-basis: 100%;
	}
</style>
