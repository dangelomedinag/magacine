<script lang="ts">
	import { FavMovies } from '$lib/stores/favoritesStore';
	import type { MovieResult } from '$lib/types';

	interface Props {
		movie: MovieResult;
		isFav: boolean;
	}

	let { movie, isFav }: Props = $props();
</script>

<!-- {#if !isFav}
	<p class="modal-icon" style="color: springgreen;">
		<Icon>{@html Plus}</Icon>
	</p>
{:else}
	<p class="modal-icon" style="color: var(--c-front);">
		<Icon>{@html Trash}</Icon>
	</p>
{/if} -->
<ul>
	{#if !isFav}
		<li class="current">
			<img class="favorites-img" src={movie.poster} alt={movie.plot} />
		</li>
	{/if}

	{#each $FavMovies
		.sort((a, b) => (a.imdbid === movie.imdbid ? -1 : 1))
		.slice(0, 7) as item (item.uuid)}
		<li class:current={item.imdbid === movie.imdbid}>
			<img class="favorites-img" src={item.poster} alt={item.plot} />
		</li>
	{/each}
</ul>
<p class="text">
	{isFav ? 'Remove' : 'Add '} from <a href="/favorites">favorites?</a>
</p>
<p class="text"><strong>{movie.title}</strong></p>

<style>
	.text {
		text-align: center;
		margin: 0;
		margin-block-end: 0.5em;
	}

	.text > strong {
		/* background-color: var(--c-front-dark); */
		border-radius: 4px;
		/* padding-inline: 0.3em; */
		color: var(--c-front);
	}
	ul {
		position: relative;
		display: flex;
		height: 150px;
		justify-content: center;
		align-items: center;
		padding: 0;
		/* flex-wrap: wrap; */
		list-style: none;
	}

	li.current {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
		/* color: white; */
	}

	li img {
		opacity: 0.2;
	}

	.current .favorites-img {
		opacity: 1;
		height: 100%;
		border-radius: 5px;
	}

	.favorites-img {
		display: block;
		height: 80px;
		width: auto;
		object-fit: cover;
	}
</style>
