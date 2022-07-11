import * as cookie from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
	const data = await request.formData();
	const username = data.get('username').toLowerCase().trim();
	const password = data.get('password').toLowerCase().trim();

	if (username === 'invalid') {
		return {
			body: {
				status: 404,
				errors: 'invalid username or password'
			}
		};
	}
	if (!username || !password) {
		return {
			body: {
				status: 404,
				errors: 'invalid username or password'
			}
		};
	}

	if (password.length < 1) {
		return {
			body: {
				status: 404,
				errors: 'invalid credentials'
			}
		};
	}

	let cookieOpts = {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7
	};

	return {
		status: 303,
		headers: {
			'set-cookie': [
				cookie.serialize('mc_sessionid', 'abcdefg', cookieOpts),
				cookie.serialize('mc_username', username, cookieOpts)
			],
			location: '/'
		}
	};
}
