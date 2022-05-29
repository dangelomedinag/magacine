<script>
	export let movie;
</script>

<a href="movies/{movie.imdbid}">
	<img src={movie.poster} alt="poster of movie - {movie.title}" />
</a>

<style>
	a {
		display: block;
		width: 100%;
		/* height: 220px; */
		border-radius: 5px;
		overflow: hidden;
		padding: 0;
		/* transform: translateY(0); */
		transition: transform 0.2s ease-out;
	}

	a:hover {
		opacity: 0.5;
		transform: translateY(-3%);
	}

	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
