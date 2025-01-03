// import { goto } from '$app/navigation';

import { themeStore } from '$lib/stores/theme-store';

export const randomInt = (MAX: number) => Math.floor(Math.random() * MAX) + 1;
export const uuid = () => Date.now().toString(36) + Math.random().toString(36).substring(2);
export const listFormat = (
	array: string[],
	language = 'en',
	opts: Intl.ListFormatOptions = { style: 'long', type: 'conjunction' }
) => {
	const intl = new Intl.ListFormat(language, opts);
	return intl.format(array);
};
export const setBodyScroll = (state: boolean, ref?: HTMLElement) => {
	import('$app/environment').then(({ browser }) => {
		if (browser) {
			const body = document.body;
			const prop = body.style.overflow;

			if (state && prop !== 'hidden') body.style.overflow = 'hidden';
			else body.style.overflow = 'auto';

			if (ref) ref.focus();
		}
	});
};

export const toggleColorTheme = () => {
	import('$app/environment').then(({ browser }) => {
		if (browser) {
			let theme;
			themeStore.subscribe((state) => {
				theme = state === 'dark' ? 'light' : 'dark';
			});

			const rootAttrClassTheme = document.documentElement.dataset;
			if (theme) {
				rootAttrClassTheme.rootTheme = theme;
				themeStore.set(theme);
			}
		}
	});
};

export const setCookieColorTheme = (theme: string | null) => {
	try {
		fetch('/api/theme', {
			method: 'PUT',
			body: JSON.stringify({ theme })
		});
	} catch (error) {
		console.log('error switch theme');
	}
};

export const timeoutPromise = (ms = 1500) =>
	new Promise((res) => {
		setTimeout(res, ms);
	});

// export const scrollToTarget = (node, opts) => {
// 	// create URL target
// 	let url;
// 	if (node.href) {
// 		url = new URL(node.href);
// 	} else {
// 		url = new URL(location);
// 		url.hash = opts?.target;
// 	}

// 	async function handlerClick(e) {
// 		// prevent action if target is <a></a> element
// 		if (!opts) e.preventDefault();

// 		const htmlElement = document.getElementById(url.hash.substring(1));

// 		// return if target element not exist
// 		if (!htmlElement) return node.removeEventListener('click', handlerClick);

// 		// get current navbar heigth
// 		const navbarHeight = document.querySelector('nav.navbar').clientHeight;
// 		let offsetTop = htmlElement.offsetTop - navbarHeight - 50;
// 		if (offsetTop <= 0) offsetTop = 0;

// 		await goto(url, { replaceState: true, noScroll: true });
// 		// scroll to target
// 		scrollTo({ behavior: opts?.behavior ? opts.behavior : 'smooth', top: offsetTop });
// 		node.focus();

// 	}

// 	// valid length hash
// 	if (url.hash.length > 1) node.addEventListener('click', handlerClick);

// 	return {
// 		destroy() {
// 			node.removeEventListener('click', handlerClick);
// 		}
// 	};
// };
