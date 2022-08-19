import { redirect } from '@sveltejs/kit';
import * as cookie from 'cookie';

/**@type {import("./$types").RequestHandler} */
export function GET({ setHeaders }) {
	// throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
	// const headers = new Headers();
	const opts = {
		path: '/',
		expires: new Date(0)
	};

	// headers.append('set-cookie', cookie.serialize('mc_sessionid', '', opts));
	// headers.append('set-cookie', cookie.serialize('mc_username', '', opts));
	// headers.append('set-cookie', cookie.serialize('mc_theme', '', opts));

	setHeaders({
		'set-cookie': [
			cookie.serialize('mc_sessionid', '', opts),
			cookie.serialize('mc_username', '', opts),
			cookie.serialize('mc_theme', '', opts)
		]
	});

	// setHeaders({
	// 	'set-cookie': cookie.serialize('mc_sessionid', '', {
	// 		path: '/',
	// 		expires: new Date(0)
	// 	})
	// });
	// setHeaders({
	// 	'set-cookie': cookie.serialize('mc_username', '', {
	// 		path: '/',
	// 		expires: new Date(0)
	// 	})
	// });
	// setHeaders({
	// 	'set-cookie': cookie.serialize('mc_theme', '', {
	// 		path: '/',
	// 		expires: new Date(0)
	// 	})
	// });

	throw redirect(303, '/login');

	// return {
	// 	status: 303,
	// 	headers: {
	// 		'set-cookie': [
	// 			cookie.serialize('mc_sessionid', '', {
	// 				path: '/',
	// 				expires: new Date(0)
	// 			}),
	// 			cookie.serialize('mc_username', '', {
	// 				path: '/',
	// 				expires: new Date(0)
	// 			}),
	// 			cookie.serialize('mc_theme', '', {
	// 				path: '/',
	// 				expires: new Date(0)
	// 			})
	// 		],
	// 		location: '/login'
	// 	}
	// };
}
