// import { redirect } from '@sveltejs/kit';
import * as cookie from 'cookie';

/**@type {import("./$types").PageServerLoad} */
export async function load({ locals }) {
	console.log('login.server.js', locals.user);
	return {
		user: locals.user
	};
}

/** @type {import('./$types').Actions} */
export async function POST({ request, setHeaders }) {
	const data = await request.formData();
	const username = data.get('username').toLowerCase().trim();
	const password = data.get('password').toLowerCase().trim();

	if (username === 'invalid') {
		return {
			status: 404,
			errors: 'invalid username or password'
		};
	}
	if (!username || !password) {
		return {
			status: 404,
			errors: 'invalid username or password'
		};
	}

	if (password.length < 1) {
		return {
			status: 404,
			errors: 'invalid credentials'
		};
	}

	let cookieOpts = {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7
	};

	// const headers = new Headers();
	// headers.append('set-cookie', cookie.serialize('mc_sessionid', 'abcdefg', cookieOpts));
	// headers.append('set-cookie', cookie.serialize('mc_username', username, cookieOpts));
	// setHeaders(headers);
	setHeaders({
		'set-cookie': [
			cookie.serialize('mc_sessionid', 'abcdefg', cookieOpts),
			cookie.serialize('mc_username', username, cookieOpts)
		]
	});

	return {
		location: '/'
	};
}
