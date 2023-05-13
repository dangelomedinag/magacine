<script>
	// import Icon from '$components/icons/icon.svelte';
	// import viewColumns from '$icons/solid/view-columns.svg?raw';
	// import viewColumn from '$icons/solid/view-column.svg?raw';
	// import plusSmall from '$icons/solid/plus-small.svg?raw';
	// import minusSmall from '$icons/solid/minus-small.svg?raw';
	import CardRatingStarts from '$components/card/cardRatingStarts.svelte';
	// import CarouselMovies from '$components/card/carouselMovies.svelte';
	// import NavbarTop from '$components/navbar/navbarTop.svelte';
	import { FavMovies } from '$lib/stores/favoritesStore';
	import CardMovie from '$components/card/cardMovie.svelte';
	import SectionPage from '$components/ui/SectionPage.svelte';
	import Film from '$icons/solid/film.svg?raw';
	import Icon from '$components/icons/icon.svelte';
</script>

<SectionPage>
	<span><Icon>{@html Film}</Icon>explore now</span>
	<h1>Favorites</h1>
</SectionPage>

<!-- <NavbarTop /> -->

<!-- {#if $FavMovies.length}
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
{/if} -->
<!-- <h1>Favorites</h1> -->

<div class="content" class:wrapper={$FavMovies.length} style="padding-block: 3em;">
	{#each $FavMovies as _, i (_.uuid)}
		<CardMovie {i} movie={_} />
	{:else}
		<div class="empty-list">
			<h3>nothing yet</h3>
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
		</div>
	{/each}
</div>

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
	.empty-list {
		width: 100%;
		text-align: center;
	}
	/* .ajustment {
		display: flex;
		gap: 0.5em;
		align-items: center;
		margin-inline: auto;
		padding: 1em;
	} */

	.wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(0px, var(--card-w)));
		/* grid-template-rows: auto; */
		place-items: center;
		justify-content: center;
		gap: 1em;
	}

	/* h1 {
		text-align: center;
		font-size: 2rem;
	} */

	p {
		text-align: center;
	}

	.rating-wrapper {
		--icon-size: 2rem;
		text-align: center;
	}
</style>
