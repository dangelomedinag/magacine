<script>
	import { onMount } from 'svelte';
	/** @type {{icon: any, name?: string, type?: string, counter?: boolean, x?: any, y?: any, deg?: any, style?: any, shadow?: boolean, class?: string}} */
	let {
		icon = $bindable(),
		name = '',
		type = 'solid',
		counter = false,
		x = undefined,
		y = undefined,
		deg = undefined,
		style = undefined,
		shadow = false,
		class: Class = ''
	} = $props();
	
	onMount(async () => {
		icon = await import(`./${type}/${name}.svg?raw`);
	});
</script>

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
	<!-- <slot /> -->
	{#if icon}
		{@html icon.default}
	{/if}
	{#if counter}
		<div class="counter">{counter}</div>
	{/if}
</div>

<style>
	:root {
		--icon-size: 1rem;
	}

	div {
		display: inline-flex;
		position: relative;
	}

	:global(svg[aria-hidden='true']) {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		height: var(--icon-size);
		width: var(--icon-size);
		color: inherit;
	}

	.counter {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		background-color: var(--c-front);
		color: white;
		right: -8px;
		top: -10px;
		width: 16px;
		height: 16px;
		border-radius: 50vh;
		font-size: 0.7rem;
		text-align: center;
	}

	.shadow :global(svg[aria-hidden='true']) {
		filter: drop-shadow(0px 1px 2px rgb(0 0 0 / 50%));
	}
</style>
