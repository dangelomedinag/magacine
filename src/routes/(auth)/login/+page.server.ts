import { fail, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import dbusers from './dbusers.json';
import { timeoutPromise } from '$helpers';

export async function load({ locals }) {
	return {
		user: locals?.user
	};
}

let cookieOpts = {
	path: '/',
	httpOnly: true,
	sameSite: 'strict',
	secure: process.env.NODE_ENV === 'production',
	maxAge: 60 * 60 * 24 * 7
};

export const actions = {
	default: async ({ request, cookies }) => {
		const fields = await request.formData();
		const username = (fields.get('username') as string).toLowerCase().trim();
		const password = (fields.get('password') as string).toLowerCase().trim();

		if (username === 'invalid' || !username || !password) {
			await timeoutPromise(2000);
			return fail(404, { errors: 'invalid username or password' });
		}

		if (password.length < 1) {
			await timeoutPromise(300);
			return fail(404, { errors: 'invalid credentials' });
		}

		const user = dbusers.filter((u) => u.username === username)[0];
		const comparedPass = await bcrypt.compare(password, dbusers[0].hash);

		if (!user || !comparedPass) {
			return fail(404, { errors: 'invalid credentials' });
		}

		// eslint-disable-next-line no-unused-vars
		const { hash, ...payload } = user;

		const token = jwt.sign(payload, '123', { expiresIn: `${15 * 60 * 1000}` });

		cookies.set('refresh_token', user.refresh_token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7
		});

		cookies.set('token', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7
		});

		throw redirect(303, '/');
	}
};
