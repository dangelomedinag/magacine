import type { Cookies } from '@sveltejs/kit';

export const transformPageColorSchemePrefers = (cookies: Cookies, html: string) => {
	const curr_cookie_theme = cookies.get('mc_theme');

	if (curr_cookie_theme) {
		const lang = html.replace('%lang%', 'en');
		return lang.replace('%roottheme%', curr_cookie_theme);
	}

	const lang = html.replace('%lang%', 'en');
	return lang.replace('%roottheme%', 'dark');
};
