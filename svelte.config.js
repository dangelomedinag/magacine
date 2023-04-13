import vercel from '@sveltejs/adapter-vercel';
import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: vercel(),
		alias: {
			$components: 'src/lib/components',
			$helpers: 'src/lib/helpers',
			$icons: 'src/lib/components/icons'
		}
	},
	preprocess: [
		vitePreprocess(),
		sveltePreprocess({
			postcss: {
				plugins: [autoprefixer(), cssnano()]
			}
		})
	]
};

export default config;
