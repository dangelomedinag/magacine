<script>
	import Spinner from '$components/ui/Spinner.svelte';

	import Toast from '$components/ui/toast.svelte';
	import { fly } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import CarouselMovies from '$components/ui/CarouselMovies.svelte';
	import { page } from '$app/stores';
	import Icon from '$icons/icon.svelte';
	import Film from '$icons/outline/film.svelte';
	import DesktopComputer from '$icons/outline/desktop-computer.svelte';
	import Collection from '$icons/outline/collection.svelte';

	export let results;
</script>

{#await results}
	<Spinner />
{:then response}
	<ul class="list">
		<li class="total-results">
			{response.search} - {response.totalResults} results
		</li>
		{#each response.results as movie, i (movie.uuid)}
			<li class="list__item" in:fly={{ x: 60, easing: quintInOut, delay: 50 * i }}>
				<img src={movie.poster} alt={movie.title} />
				<span class="n-top">{i + 1}</span>
				<span class="info-wrapper">
					<div class="title">
						{movie.title} - {movie.year}
					</div>
					<div class="type">
						<span class="icon">
							<Icon y="20%">
								{#if movie.type === 'movie'}
									<Film />
								{:else if movie.type === 'game'}
									<DesktopComputer />
								{:else if movie.type === 'series'}
									<Collection />
								{/if}
							</Icon>
						</span>
						{movie.type}
					</div>
				</span>
			</li>
		{/each}
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

	.list {
		list-style: none;
		padding: 0;
		margin: 0;
		flex-direction: column;
		display: flex;
		padding-bottom: 1em;
		/* gap: 0.2em; */
	}

	.list__item {
		overflow: hidden;
		position: relative;
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
		border-top: 1px solid var(--c-divider);
		/* flex-basis: 100%; */
	}
	.list__item:hover {
		background-color: var(--c-divider);
	}

	.n-top {
		vertical-align: middle;
		position: absolute;
		top: 0;
		right: 0;
		line-height: 6rem;
		font-weight: bold;
		font-size: 12rem;
		color: var(--c-divider);
		opacity: 0.2;
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
		max-height: 120px;
		min-height: 120px;
		display: block;
		width: 100%;
		max-width: 80px;
		object-fit: cover;
	}

	.info-wrapper {
		padding-left: 1em;
	}

	.title {
		font-weight: bold;
		/* width: 250px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis; */
	}

	.type {
		font-weight: lighter;
	}

	.icon {
		opacity: 0.5;
		padding-right: 0.2em;
	}

	.total-results {
		text-align: center;
		padding-bottom: 0.5em;
		flex-basis: 100%;
		font-style: italic;
	}
</style>
