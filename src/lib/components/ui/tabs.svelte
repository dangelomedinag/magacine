<script>
	// import { page } from '$app/stores';

	import NavbarTop from './NavbarTop.svelte';

	export let tabs;
	$: active = tabs[0];

	// if ($page.url.searchParams.has('tab')) {
	// 	const tabParam = $page.url.searchParams.get('tab');
	// 	if (tabs.includes(tabParam)) active = tabParam;
	// }

	// $: console.log(active);
</script>

<NavbarTop>
	{#each tabs as tab}
		<button class:active={active === tab} on:click={() => (active = tab)}>{tab}</button>
	{/each}
</NavbarTop>

<slot {active} />
