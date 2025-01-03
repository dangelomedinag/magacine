export type User = {
	username: string;
	name: string;
	lastname: string;
	role: string;
	avatar: string;
};

export interface MovieItem {
	title: string;
	year: string;
	rated: string;
	released: string;
	runtime: string;
	genre: string[];
	director: string;
	writer: string;
	actors: string;
	plot: string;
	language: string[];
	country: string;
	awards: string;
	poster: string;
	ratings: Rating[];
	metascore: string;
	imdbrating: string;
	imdbvotes: string;
	imdbid: string;
	type: string;
	dvd: string;
	boxoffice: string;
	production: unknown;
	website: unknown;
	response: boolean;
	uuid: string;
	[index: string]: unknown;
}

export interface Rating {
	source: string;
	value: string;
	[index: string]: unknown;
}

export type typeResult = 'movie' | 'series' | 'episode' | 'game';

export interface MovieResult {
	title: string;
	year: string;
	imdbid: string;
	type: typeResult;
	poster: string;
	uuid: string;
	[index: string]: unknown;
}

export interface MoviesResponse {
	results: MovieResult[];
	totalResults: number;
	search: string;
	query: string;
	message?: string;
	[index: string]: unknown;
}

export interface OMDBMoviesItem {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
	[index: string]: unknown;
}

export interface OMDBMoviesResponse {
	Response: 'True' | 'False';
	Search: OMDBMoviesItem[];
	totalResults: string;
	Error: string;

	[index: string]: unknown;
}

export interface OMDBMovie {
	Title: string;
	Year: string;
	Rated: string;
	Released: string;
	Runtime: string;
	Genre: string;
	Director: string;
	Writer: string;
	Actors: string;
	Plot: string;
	Language: string;
	Country: string;
	Awards: string;
	Poster: string;
	Ratings: OMDBRating[];
	Metascore: string;
	imdbRating: string;
	imdbVotes: string;
	imdbID: string;
	Type: string;
	DVD: string;
	BoxOffice: string;
	Production: string;
	Website: string;
	Response: string;
	[index: string]: unknown;
}

export interface OMDBRating {
	Source: string;
	Value: string;
	[index: string]: unknown;
}
