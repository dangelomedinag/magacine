<script context="module">
	import Error from '../__error.svelte';

	/** @type {import("@sveltejs/kit").Load}*/
	export async function load({ fetch, params }) {
		const req = await fetch('/api?i=' + params.id);
		const details = await req.json();
		if (!details.Response) {
			return {
				status: 400,
				error: new Error('movie not found')
			};
		}

		console.log(details);
		return {
			props: {
				movie: details
			}
		};
	}
</script>

<script>
	export let movie;

	/* {
		Title: 'The Avengers',
		Year: '2012',
		Rated: 'PG-13',
		Released: '04 May 2012',
		Runtime: '143 min',
		Genre: 'Action, Adventure, Sci-Fi',
		Director: 'Joss Whedon',
		Writer: 'Joss Whedon, Zak Penn',
		Actors: 'Robert Downey Jr., Chris Evans, Scarlett Johansson',
		Plot: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
		Language: 'English, Russian, Hindi',
		Country: 'United States',
		Awards: 'Nominated for 1 Oscar. 38 wins & 80 nominations total',
		Poster: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
		Ratings: [
			{ Source: 'Internet Movie Database', Value: '8.1/10' },
			{ Source: 'Rotten Tomatoes', Value: '91%' },
			{ Source: 'Metacritic', Value: '69/100' }
		],
		Metascore: '69',
		imdbRating: '8.1',
		imdbVotes: '1,345,654',
		imdbID: 'tt0848228',
		Type: 'movie',
		DVD: '25 Sep 2012',
		BoxOffice: '$623,357,910',
		Production: 'N/A',
		Website: 'N/A',
		Response: 'True'
	} */
</script>

<!-- <div class="content"> -->
<img src={movie.Poster} alt={movie.Title} />
<div class="information content">
	<div>
		<span>title:</span>
		<h1>{movie.Title}</h1>
	</div>

	<h4>{movie.Year} - <span>{movie.Runtime}</span></h4>
	<span>synopsis:</span>
	<p>{movie.Plot}</p>
	<span>genders:</span>
</div>

<!-- </div> -->
<style>
	.content {
		padding-top: 1em;
	}

	img {
		position: sticky;
		top: 0;
		display: block;
		width: 100%;
		min-height: 200px;
		height: auto;
		max-height: 60vh;
		object-fit: cover;
	}
	.information {
		z-index: 1;
		background-color: var(--c-main-content);
	}

	div span {
		opacity: 0.5;
		text-transform: uppercase;
	}
	div h1 {
		margin: 0;
		font-size: 2rem;
	}

	/* @media (min-width: 576px) {}
	@media (min-width: 768px) {}
	@media (min-width: 992px) {}
	@media (min-width: 1200px) {} */
</style>
