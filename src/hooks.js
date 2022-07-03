import * as cookie from 'cookie';

/** @type {import("@sveltejs/kit").Handle} */
export async function handle({ event, resolve }) {
	const cookies = event.request.headers.has('cookie') ? event.request.headers.get('cookie') : '';
	const cookieSession = cookie.parse(cookies);

	if (cookieSession.mc_sessionid === 'abcdefg') {
		const random = Math.round(Math.random());
		event.locals.user = {
			username: cookieSession.mc_username,
			name: random ? 'dangelo medina' : 'enrique castellano'
		};
	}

	const response = await resolve(event, {
		transformPage: ({ html }) => {
			// console.log(html);
			if (cookieSession.mc_theme) {
				if (cookieSession.mc_theme === 'light') {
					console.log('theme SSR');
					return html.replace('data-theme="dark"', 'data-theme="' + cookieSession.mc_theme + '"');
				}
			}
			return html;
		}
	});
	return response;
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
	// console.log(event.request.headers);
	return event.locals.user
		? {
				user: {
					username: event.locals.user.username,
					name: event.locals.user.name
				}
		  }
		: {};
}
