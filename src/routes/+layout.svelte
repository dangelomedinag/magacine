<script>
	import 'normalize.css';
	import { dev } from '$app/environment';
	import NProgress from 'nprogress';
	import MediaQueries from '$components/dev/mediaQueries.svelte';
	import 'nprogress/nprogress.css';
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme-store';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import '../styles/_global.scss';

	// function getColorSchemePrefers(event) {
	// 	if (event) return event.matches ? 'light' : 'dark';

	// 	if (window.matchMedia) {
	// 		return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
	// 	}
	// }

	onMount(() => {
		// const activeColorSchemePrefers = getColorSchemePrefers();
		// function themeAtr() {
		// 	if (document.documentElement.classList.contains('dark')) {
		// 		return 'dark';
		// 	}
		// 	if (document.documentElement.classList.contains('light')) {
		// 		return 'light';
		// 	}
		// }
		// const activeTheme = themeAtr();
		// if (!activeTheme && activeColorSchemePrefers) {
		// 	themeStore.set(activeColorSchemePrefers);
		// }
		// if (activeTheme) {
		// 	themeStore.set(activeTheme);
		// }
		// const mql = window.matchMedia('(prefers-color-scheme: light)');
		// function handlerThemeChange(e) {
		// 	const activeTheme = themeAtr();
		// 	if (activeTheme) return mql.removeEventListener('change', handlerThemeChange);
		// 	const activeColorSchemePrefers = getColorSchemePrefers(e);
		// 	themeStore.set(activeColorSchemePrefers);
		// }
		// mql.addEventListener('change', handlerThemeChange);
	});

	// NProgress css
	// NProgress.configure({
	// 	minimum: 0.16
	// });

	// beforeNavigate(() => {
	// 	NProgress.start();
	// });
	// afterNavigate(() => {
	// 	NProgress.done();
	// });
</script>

<!-- <svelte:head>
	<title>Magacine - movies, series & all, in one place</title>
</svelte:head> -->

{#if dev}
	<MediaQueries bottom="0" />
{/if}

<slot />

<!-- <style global lang="scss">
	@use 'src/styles/global';
</style> -->
