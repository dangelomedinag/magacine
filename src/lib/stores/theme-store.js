import { browser } from '$app/env';
import { writable } from 'svelte/store';

const themeStoreCustom = () => {
	const { subscribe, set } = writable(null);

	if (browser) {
		set(document.body.dataset.theme);
	}

	return {
		subscribe,
		toogleTheme: () => {
			if (browser) {
				let dataTheme = document.body.dataset.theme;
				document.body.dataset.theme = dataTheme === 'dark' ? 'light' : 'dark';
				return set(document.body.dataset.theme);
			}
		}
	};
};

export const themeStore = themeStoreCustom();
