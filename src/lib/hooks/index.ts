import type { Cookies } from '@sveltejs/kit';

export const transformPageColorSchemePrefers = (cookies: Cookies, html: string) => {
	if (cookies.get('mc_theme')) {
		const curr_theme = cookies.get('mc_theme') ?? '';
		const lang = html.replace('%lang%', 'en');
		return lang.replace('%rootclass%', curr_theme);
	}

	const lang = html.replace('%lang%', 'en');
	return lang.replace('%rootclass%', '');
};
