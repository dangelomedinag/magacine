<script>
	import Icon from '$components/icons/icon.svelte';
	import viewColumns from '$icons/solid/view-columns.svg?raw';
	import viewColumn from '$icons/solid/view-column.svg?raw';
	import plusSmall from '$icons/solid/plus-small.svg?raw';
	import minusSmall from '$icons/solid/minus-small.svg?raw';
	import CardRatingStarts from '$components/card/cardRatingStarts.svelte';
	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import NavbarTop from '$components/navbar/navbarTop.svelte';
	import { FavMovies } from '$lib/stores/favoritesStore';

	// const error = Error('add movies to favorite list');
	let value = 2;
</script>

<NavbarTop />

{#if $FavMovies.length}
	<div class="ajustment">
		<Icon>
			{@html minusSmall}
		</Icon>
		<Icon>
			{@html viewColumn}
		</Icon>
		<input type="range" name="range" id="range" min="2" max="9" bind:value />
		<Icon>
			{@html viewColumns}
		</Icon>
		<Icon>
			{@html plusSmall}
		</Icon>
	</div>
{/if}

{#each Array(Math.ceil($FavMovies.length / value)) as _, i}
	<CarouselMovies
		movies={{ results: $FavMovies.slice(value * i, value * (i + 1)) }}
		details={false}
		title={i < 1 ? 'Favorites' : ''}
	/>
{:else}
	<h1>nothing yet</h1>
	<div class="rating-wrapper">
		<CardRatingStarts
			rating="4.3"
			--rating-stars-fill="var(--c-divider)"
			--rating-stars="var(--c-divider)"
		/>
	</div>
	<p>
		<a href="/discovery">discovery movies</a>
	</p>
{/each}

<!-- {/if} -->

<!-- <CarouselMovies movies={listMoviesFavs} details={false} title="Favorites">
	<svelte:fragment slot="error" let:message>
		<h1>nothing yet</h1>
		<div class="rating-wrapper">
			<CardRatingStarts
				rating="4.3"
				--rating-stars-fill="var(--c-divider)"
				--rating-stars="var(--c-divider)"
			/>
		</div>
		<p>
			<a href="/discovery">discovery movies</a> and
			{message}
		</p>
	</svelte:fragment>
</CarouselMovies> -->

<style>
	.ajustment {
		display: flex;
		gap: 0.5em;
		align-items: center;
		margin-inline: auto;
		padding: 1em;
	}

	h1 {
		text-align: center;
		font-size: 2rem;
	}

	p {
		text-align: center;
	}

	.rating-wrapper {
		--icon-size: 2rem;
		text-align: center;
	}
</style>
