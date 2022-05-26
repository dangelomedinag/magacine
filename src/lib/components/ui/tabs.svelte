<script>
	// import { page } from '$app/stores';

	import NavbarTop from './NavbarTop.svelte';

	export let tabs;
	$: active = tabs[0];
</script>

<NavbarTop>
	{#each tabs as tab}
		<button class:active={active === tab} on:click={() => (active = tab)}>{tab}</button>
	{/each}
</NavbarTop>

<slot {active} />
