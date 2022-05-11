<script>
	export let movie;
</script>

<a href="/movies/{movie.imdbid}">
	<img src={movie.poster} alt="poster of movie - {movie.title}" />
</a>

<style>
	a {
		display: block;
		width: 100%;
		height: 220px;
		border-radius: 5px;
		overflow: hidden;
		padding: 0;
	}

	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
