import { writable } from 'svelte/store';

type themeOption = 'light' | 'dark';
type StoreThemeConfig = themeOption | string | null;

const themeStoreCustom = () => {
	const { subscribe, set, update } = writable<StoreThemeConfig>(null);

	return {
		subscribe,
		set,
		update
		// toogleTheme: () => {
		// 	return update((v) => {
		// 		const next = v === 'dark' ? 'light' : 'dark';
		// 		fetch('/api/theme', {
		// 			method: 'PUT',
		// 			body: JSON.stringify({ theme: next })
		// 		});
		// 		document.documentElement.className = next;
		// 		return next;
		// 	});
		// }
	};
};

export const themeStore = themeStoreCustom();
