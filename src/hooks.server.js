import * as jwt from 'jsonwebtoken';
import { transformPageColorSchemePrefers } from '$lib/hooks';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const authorization = event.cookies.get('token');
	if (authorization) {
		try {
			const { username, name, lastname, role } = jwt.verify(authorization, '123');

			event.locals.user = {
				username,
				name,
				lastname,
				role,
				avatar: 'https://i.pravatar.cc/100?u=' + event.cookies.get('mc_username') + '@gmail.com'
			};
		} catch {
			console.error('missing token');
		}
	}

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			return transformPageColorSchemePrefers(event.cookies, html);
		}
	});

	return response;
}

/**@type {import("@sveltejs/kit").HandleServerError} */
export function handleError({ error }) {
	return {
		message: error.message
	};
}
