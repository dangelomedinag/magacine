<script>
	import { onMount } from 'svelte';

	export let name;
	export let type = 'outline';
	export let x = undefined;
	export let y = undefined;
	export let deg = undefined;
	export let style = undefined;
	export let shadow = false;
	let Class;
	export { Class as class };
	let Svg;

	onMount(async () => {
		Svg = await import(`./${type}/${name}.svelte`);
		// console.log(Svg);
	});
</script>

{#if Svg}
	<div
		class={Class}
		class:shadow
		{style}
		style:transform={x
			? `translateX(${x})`
			: '' + y
			? `translateY(${y})`
			: '' + deg
			? `rotate(${deg})`
			: ''}
	>
		<Svg.default />
	</div>
{/if}

<style>
	:root {
		--icon-size: 1rem;
	}

	div {
		display: inline-flex;
	}

	:global(svg[aria-hidden='true']) {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		height: var(--icon-size);
		width: var(--icon-size);
		color: inherit;
	}

	.shadow :global(svg[aria-hidden='true']) {
		filter: drop-shadow(0px 1px 2px rgb(0 0 0 / 7%));
	}
</style>
