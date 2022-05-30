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
