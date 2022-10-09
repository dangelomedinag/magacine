<script>
	// import CardMovie from '$components/card/cardMovie.svelte';
	import { page } from '$app/stores';
	import CardRatingStarts from '$components/card/cardRatingStarts.svelte';
	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import NavbarTop from '$components/navbar/navbarTop.svelte';
	import { FavMovies } from '$lib/stores/favoritesStore';

	$: listMoviesFavs =
		$FavMovies.length < 1 ? new Error('add movies to favorite list') : { results: $FavMovies };
</script>

<NavbarTop />
<CarouselMovies movies={listMoviesFavs} details={false} title="Favorites">
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
</CarouselMovies>

<!-- --rating-stars-fill: #e9cd50;
--rating-stars: rgba(233, 205, 80, 0.1); -->
<style>
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
