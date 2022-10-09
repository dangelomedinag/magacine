import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const themeStoreCustom = () => {
	const { subscribe, set, update } = writable(null);

	if (browser) {
		// let userPrefers = document.documentElement.className;
		// console.log(userPrefers, window.matchMedia('(prefers-color-scheme: light)').matches);
		// if (userPrefers.length > 0) set(userPrefers);
		// if (!userPrefers) {
		// 	const prefers_color_scheme = window.matchMedia('(prefers-color-scheme: light)').matches
		// 		? 'light'
		// 		: 'dark';
		// 	document.documentElement.className = prefers_color_scheme;
		// 	set(prefers_color_scheme);
		// }
		// set(
		// 	userPrefers
		// 		? userPrefers
		// 		: window.matchMedia('(prefers-color-scheme: light)').matches
		// 		? 'light'
		// 		: 'dark'
		// );
	}

	return {
		subscribe,
		set,
		toogleTheme: () => {
			// if (browser) {
			// let userPrefers = Boolean(document.documentElement.className);
			// let dataTheme = userPrefers
			// 	? userPrefers
			// 	: window.matchMedia('(prefers-color-scheme: light)').matches
			// 	? 'light'
			// 	: 'dark';
			// let nextTheme = dataTheme === 'dark' ? 'light' : 'dark';

			// try {
			// 	await fetch('/api/theme', {
			// 		method: 'PUT',
			// 		body: JSON.stringify({ theme: nextTheme })
			// 	});
			// } catch (error) {
			// 	console.error('error on set theme');
			// }

			// document.documentElement.className = nextTheme;
			// if (browser) return;

			return update((v) => {
				console.log(v);
				const next = v === 'dark' ? 'light' : 'dark';
				fetch('/api/theme', {
					method: 'PUT',
					body: JSON.stringify({ theme: next })
				});
				document.documentElement.className = next;
				return next;
			});
			// }
		}
	};
};

export const themeStore = themeStoreCustom();
