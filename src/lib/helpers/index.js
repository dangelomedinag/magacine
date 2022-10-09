import { goto } from '$app/navigation';

export const randomInt = (MAX) => Math.floor(Math.random() * MAX) + 1;
export const uuid = () => Date.now().toString(36) + Math.random().toString(36).substring(2);
export const listFormat = (
	array,
	language = 'en',
	opts = { style: 'long', type: 'conjunction' }
) => {
	const intl = new Intl.ListFormat(language, opts);
	return intl.format(array);
};
export const setBodyScroll = (state, ref) => {
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

export const scrollToTarget = (node, opts) => {
	// create URL target
	let url;
	if (node.href) {
		url = new URL(node.href);
	} else {
		url = new URL(location);
		url.hash = opts?.target;
	}

	async function handlerClick(e) {
		// prevent action if target is <a></a> element
		if (!opts) e.preventDefault();

		const htmlElement = document.getElementById(url.hash.substring(1));

		// return if target element not exist
		if (!htmlElement) return node.removeEventListener('click', handlerClick);

		// get current navbar heigth
		const navbarHeight = document.querySelector('nav.navbar').clientHeight;
		let offsetTop = htmlElement.offsetTop - navbarHeight - 50;
		if (offsetTop <= 0) offsetTop = 0;

		await goto(url, { replaceState: true, noscroll: true });
		// scroll to target
		scrollTo({ behavior: opts?.behavior ? opts.behavior : 'smooth', top: offsetTop });
		node.focus();
		/* scrollTo({ behavior: opts?.behavior ? opts.behavior : 'smooth', top: offsetTop });

		function changeURL() {
			if (Math.round(window.scrollY) == offsetTop) {
				goto(url, { replaceState: true, noscroll: true }).then(() => {
					window.removeEventListener('scroll', changeURL);
				});
			}
		}
		window.addEventListener('scroll', changeURL); */
	}

	// valid length hash
	if (url.hash.length > 1) node.addEventListener('click', handlerClick);

	return {
		destroy() {
			node.removeEventListener('click', handlerClick);
		}
	};
};
export const timeoutPromise = (ms = 1500) =>
	new Promise((res) => {
		setTimeout(res, ms);
	});
