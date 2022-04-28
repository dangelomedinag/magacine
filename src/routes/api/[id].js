import 'dotenv/config';
const API_KEY = process.env.OMDB_API_KEY;

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
	const API_URL = 'https://www.omdbapi.com';
	const id = params.id;

	// GET resource url
	const url = new URL(API_URL);
	url.searchParams.set('i', id);
	url.searchParams.set('apikey', API_KEY);

	function splitter(string, fall = [], char = ',') {
		if (string === 'N/A') {
			return fall;
		}

		if (string.includes(char)) {
			return string.split(char);
		} else {
			return [string];
		}
	}
	try {
		const data = await fetch(url.href).then((r) => r.json());
		console.log('=========', data);

		let newYear = data.Year.includes('-') ? data.Year.split('-') : data.Year;
		let newRuntime = { duration: data.Runtime.split(' ')[0], units: data.Runtime.split(' ')[1] };
		// let newRatings = data.Ratings.map((e) => {
		// 	let obj = {};
		// 	for (const key of e) {
		// 		obj[key.toLowerCase()] = e[key];
		// 	}
		// 	return obj;
		// });

		let movie = {
			title: data.Title,
			year: data.Year === 'N/A' ? null : newYear,
			rated: data.Rated === 'N/A' ? null : data.Rated,
			released: data.Released === 'N/A' ? null : data.Released,
			runtime: data.Runtime === 'N/A' ? null : newRuntime,
			genre: splitter(data.Genre),
			director: splitter(data.Director),
			writer: splitter(data.Writer),
			actors: splitter(data.Actors),
			plot: data.Plot === 'N/A' ? null : data.Plot,
			language: splitter(data.Language),
			country: splitter(data.Country),
			awards: data.Awards === 'N/A' ? null : data.Awards,
			poster: data.Poster === 'N/A' ? null : data.Poster,
			ratings: data.Ratings,
			metaScore: data.Metascore === 'N/A' ? null : data.Metascore,
			imdbRating: data.imdbRating === 'N/A' ? null : data.imdbRating,
			imdbVotes: data.imdbVotes === 'N/A' ? null : data.imdbVotes,
			imdbId: data.imdbID,
			type: data.Type === 'N/A' ? null : data.Type,
			dvd: data.DVD === 'N/A' ? null : data.DVD,
			boxOffice: data.BoxOffice === 'N/A' ? null : data.BoxOffice,
			production: data.Production === 'N/A' ? null : data.Production,
			website: data.Website === 'N/A' ? null : data.Website,
			response: data.Response === 'True' ? true : false
		};

		// console.log(movie);

		/* 
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
		Response: 'True' */

		return {
			status: data.status,
			body: movie
		};
	} catch (error) {
		console.log(error);
		return {};
	}
}
