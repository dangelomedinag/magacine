<script>
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import '../app.css';
	// import 'normalize.css';
	import '../styles/_global.css';
	import { dev } from '$app/environment';
	import MediaQueries from '$components/dev/mediaQueries.svelte';
	injectAnalytics();

	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

{#if dev}
	<MediaQueries bottom="0" />
{/if}

{@render children?.()}
