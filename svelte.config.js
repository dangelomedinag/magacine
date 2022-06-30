import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: vercel(),
		alias: {
			$components: 'src/lib/components',
			$helpers: 'src/lib/helpers',
			$icons: 'src/lib/components/ui/icons'
		}
	}
};

export default config;
