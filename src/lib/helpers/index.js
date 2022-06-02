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

export const setBodyScroll = (state) => {
	import('$app/env').then(({ browser }) => {
		if (browser) {
			// let val = fn();

			const body = document.body;
			const prop = body.style.overflow;

			if (state && prop !== 'hidden') body.style.overflow = 'hidden';
			else body.style.overflow = 'auto';
		}
	});
};
