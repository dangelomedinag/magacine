import { fail, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dbusers from './dbusers.json';
import { timeoutPromise } from '$helpers';

export async function load({ locals }) {
	return {
		user: locals?.user
	};
}

export const actions = {
	default: async ({ request, cookies }) => {
		const fields = await request.formData();
		const username = (fields.get('username') as string).toLowerCase().trim();
		const password = (fields.get('password') as string).toLowerCase().trim();

		await timeoutPromise(1000);

		if (username === 'invalid' || username === 'non-existent' || !username || !password) {
			return fail(404, {
				errors: 'invalid username or password',
				username: username ?? '',
				password: ''
			});
		}

		if (password.length < 1) {
			return fail(404, {
				errors: 'you must provide a password',
				username: username ?? '',
				password: ''
			});
		}

		const user = dbusers.filter((u) => u.username === 'dangelomedinag')[0];
		const comparedPass = await bcrypt.compare(password, dbusers[0].hash);

		if (!comparedPass) {
			return fail(404, {
				errors: 'invalid credentials',
				username: username ?? '',
				password: ''
			});
		}

		// eslint-disable-next-line no-unused-vars
		const { hash, ...payload } = user;

		const token = jwt.sign(payload, env.JWT_TOKEN_SECRET, { expiresIn: '1h' });

		// cookies.set('refresh_token', user.refresh_token, {
		// 	path: '/',
		// 	httpOnly: true,
		// 	sameSite: 'strict',
		// 	secure: !dev,
		// 	maxAge: 15000
		// });

		cookies.set('token', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: !dev,
			maxAge: 60 * 60
		});

		throw redirect(303, '/');
	}
};
