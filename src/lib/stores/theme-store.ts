import { writable } from 'svelte/store';

type themeOption = 'light' | 'dark' | null;

const themeStoreCustom = () => {
	const { subscribe, set, update } = writable<themeOption>(null);

	return {
		subscribe,
		set,
		toogleTheme: () => {
			return update((v) => {
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