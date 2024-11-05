import jwt from 'jsonwebtoken';
import { transformPageColorSchemePrefers } from '$lib/hooks';
import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const authorization = event.cookies.get('token');
	if (authorization && authorization !== '') {
		try {
			//@ts-ignore
			const { username, name, lastname, role } = jwt.verify(authorization, env.JWT_TOKEN_SECRET);

			event.locals.user = {
				username,
				name,
				lastname,
				role,
				avatar: 'https://i.pravatar.cc/100?u=' + event.cookies.get('mc_username') + '@gmail.com'
			};
		} catch (e) {
			console.log(e.message, event.url.pathname);
			event.locals.user = undefined;
		}
	}

	if (event.url.pathname.startsWith('/profile') || event.url.pathname.startsWith('/movies/')) {
		if (!event.locals.user) {
			redirect(303, '/login');
		}
	}

	const response = await resolve(event, {
		filterSerializedResponseHeaders: (name) => name.startsWith('cache-control'),
		transformPageChunk: ({ html }) => {
			return transformPageColorSchemePrefers(event.cookies, html);
		}
	});

	return response;
}
