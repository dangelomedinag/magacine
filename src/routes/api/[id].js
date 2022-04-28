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

	try {
		const data = await fetch(url.href);
		const json = await data.json();
		// console.log(json);

		let obj = {};

		for (const key in json) {
			let value = json[key];

			if (value === 'N/A') {
				value = null;
			}

			if (key === 'Response') {
				value = json[key] === 'True';
			}
			if (key === 'Year') {
				if (value.endsWith('-')) value = value.slice(-1);
			}

			if (key === 'Genre' || key === 'Language') {
				if (value.includes(',')) value = json[key].split(',').map((e) => e.trim());
				else value = [];
			}

			obj[key.toLowerCase()] = value;
		}
		// console.log(obj);

		// }

		// let movie = {
		// 	title: data.Title,
		// 	year: data.Year.includes('-') ? data.Year.split('-') : data.Year,
		// 	rated: data.Rated,
		// 	released: data.Released,
		// 	runtime: data.Runtime,
		// 	genre: splitter(data.Genre),
		// 	director: splitter(data.Director),
		// 	writer: splitter(data.Writer),
		// 	actors: splitter(data.Actors),
		// 	plot: data.Plot,
		// 	language: splitter(data.Language),
		// 	country: splitter(data.Country),
		// 	awards: splitter(data.Awards),
		// 	poster: data.Poster === 'N/A' ? '/assets/image-fallback.jpg' : data.Poster,
		// 	ratings: data.Ratings,
		// 	metaScore: data.Metascore,
		// 	imdbRating: data.imdbRating,
		// 	imdbVotes: data.imdbVotes,
		// 	imdbId: data.imdbID,
		// 	type: data.Type,
		// 	dvd: data.DVD,
		// 	boxOffice: data.BoxOffice,
		// 	production: data.Production,
		// 	website: data.Website,
		// 	response: data.Response === 'True' ? true : false
		// };

		// console.log(obj);

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
			body: obj
		};
	} catch (error) {
		console.log(error);
		return {};
	}
}
