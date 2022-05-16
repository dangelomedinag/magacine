import { writable } from 'svelte/store';

export const notiStore = writable([
	{ label: 'Discovery', notification: 3 },
	{ label: 'Community', notification: 'new' }
]);
