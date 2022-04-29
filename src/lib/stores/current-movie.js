import { writable } from 'svelte/store';

const movie = writable(null);

export const currentMovie = movie;
