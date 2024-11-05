<script>
	import 'normalize.css';
	import { dev } from '$app/environment';
	import NProgress from 'nprogress';
	import MediaQueries from '$components/dev/mediaQueries.svelte';
	import 'nprogress/nprogress.css';
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme-store';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import '../styles/_global.css';

	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

{#if dev}
	<MediaQueries bottom="0" />
{/if}

{@render children?.()}
