<script>
	import { fly } from 'svelte/transition';

	/** @type {{movie: any}} */
	let { movie } = $props();
</script>

<a in:fly|global={{ duration: 300, y: '5%' }} href="movies/{movie.imdbid}">
	<img loading="lazy" src={movie.poster} alt="poster of movie - {movie.title}" />
</a>

<style>
	a {
		display: block;
		width: 100%;
		border-radius: 5px;
		overflow: hidden;
		padding: 0;
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
		min-height: 100px;
		max-height: 250px;
		object-fit: cover;
	}
</style>
