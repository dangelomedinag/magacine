<script>
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
</div>

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
		filter: drop-shadow(0px 1px 2px rgb(0 0 0 / 50%));
	}
</style>
