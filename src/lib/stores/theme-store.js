import { browser } from '$app/env';
import { writable } from 'svelte/store';

const themeStoreCustom = () => {
	const { subscribe, set } = writable(null);

	if (browser) {
		set(document.body.dataset.theme);
	}

	return {
		subscribe,
		toogleTheme: async () => {
			if (browser) {
				let dataTheme = document.body.dataset.theme;
				document.body.dataset.theme = dataTheme === 'dark' ? 'light' : 'dark';
				try {
					await fetch('/api/theme', {
						method: 'PUT',
						body: JSON.stringify({ theme: document.body.dataset.theme })
					});
				} catch (error) {
					console.error('error on set theme');
				}

				return set(document.body.dataset.theme);
			}
		}
	};
};

export const themeStore = themeStoreCustom();
