import { browser } from '$app/env';
import { writable } from 'svelte/store';

const themeStoreCustom = () => {
	const { subscribe, set } = writable(null);

	if (browser) {
		const themePrefers = localStorage.getItem('user-theme');
		if (!themePrefers) {
			localStorage.setItem('user-theme', document.body.dataset.theme);
			set(document.body.dataset.theme);
		} else {
			set(themePrefers);
			document.body.dataset.theme = themePrefers;
		}
	}

	return {
		subscribe,
		toogleTheme: () => {
			if (browser) {
				let dataTheme = document.body.dataset.theme;
				document.body.dataset.theme = dataTheme === 'dark' ? 'light' : 'dark';
				localStorage.setItem('user-theme', document.body.dataset.theme);
				return set(document.body.dataset.theme);
			}
		}
	};
};

export const themeStore = themeStoreCustom();
