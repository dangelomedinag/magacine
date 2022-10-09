export const transformPageColorSchemePrefers = (cookies, html) => {
	if (cookies.get('mc_theme')) {
		const curr_theme = cookies.get('mc_theme');
		return html.replace('<html lang="en">', '<html lang="en" class="' + curr_theme + '">');
	}
	return html;
};
