<script>
	export let counter = false;
	export let x = undefined;
	export let y = undefined;
	export let deg = undefined;
	export let style = undefined;
	export let shadow = false;
	let Class = '';
	export { Class as class };
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
	<slot />
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
		/* width: 5px; */
		/* padding: 0.1em; */
		border-radius: 50vh;
		font-size: 0.7rem;
		text-align: center;
	}

	.shadow :global(svg[aria-hidden='true']) {
		filter: drop-shadow(0px 1px 2px rgb(0 0 0 / 50%));
	}
</style>
