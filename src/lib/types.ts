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
	production: any;
	website: any;
	response: boolean;
	uuid: string;
	[index: string]: any;
}

export interface Rating {
	source: string;
	value: string;
	[index: string]: any;
}

export type typeResult = 'movie' | 'series' | 'episode';

export interface MovieResult {
	title: string;
	year: string;
	imdbid: string;
	type: typeResult;
	poster: string;
	uuid: string;
	[index: string]: any;
}

export interface MoviesResponse {
	results: MovieResult[];
	totalResults: number;
	search: string;
	query: string;
	[index: string]: any;
}

export interface OMDBMoviesItem {
	Title: string;
	Year: string;
	imdbID: string;
	Type: string;
	Poster: string;
	[index: string]: any;
}

export interface OMDBMoviesResponse {
	Search?: OMDBMoviesItem[];
	totalResults?: string;
	Response: 'True' | 'False';
	Error: string;
	[index: string]: any;
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
	[index: string]: any;
}

export interface OMDBRating {
	Source: string;
	Value: string;
	[index: string]: any;
}
