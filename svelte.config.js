import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: vercel(),
		alias: {
			$components: 'src/lib/components',
			$helpers: 'src/lib/helpers'
		}
	}
};

export default config;
