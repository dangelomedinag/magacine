import vercel from '@sveltejs/adapter-vercel';
// import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: vercel(),
		alias: {
			$components: 'src/lib/components',
			$helpers: 'src/lib/helpers',
			$icons: 'src/lib/components/icons'
		}
	}
	// preprocess: vitePreprocess()
};

export default config;
