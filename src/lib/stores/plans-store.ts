import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const getInitialLocalValue = () => {
	if (browser) {
		const plansView = localStorage.getItem('plans-view');
		if (plansView) return JSON.parse(plansView);
	}
};

const customStore = (initialValue: boolean) => {
	const localValue = getInitialLocalValue();
	const { subscribe, update, set } = writable(localValue ?? initialValue);

	return {
		subscribe,
		update,
		set,
		saveLocalStorage: () => {
			const unsubsubscriber = subscribe((value) => {
				if (browser) {
					const plansView = localStorage.setItem('plans-view', JSON.stringify(value));
				}
			});

			return unsubsubscriber();
		}
		// updateToLocalValue: () => {
		// 	if (browser) {
		// 		const plansView = localStorage.getItem('plans-view');
		// 		if (plansView) set(false);
		// 	}
		// }
	};
};

export const pricePlans = customStore(true);
