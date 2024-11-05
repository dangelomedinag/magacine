<script>
	/** @type {{color?: string, position?: string, size?: string, top?: boolean, left?: boolean, right?: boolean, bottom?: boolean, children?: import('svelte').Snippet}} */
	let {
		color = 'var(--c-front)',
		position = 'static',
		size = '5rem',
		top = false,
		left = false,
		right = false,
		bottom = false,
		children
	} = $props();
</script>

<div
	class="lds-ripple"
	style:position
	style:top
	style:left
	style:right
	style:bottom
	style:with={size}
	style:height={size}
	style="border-color: {color}; --size-spin:{size};"
>
	<span></span>
	<span></span>
</div>
<div>{@render children?.()}</div>

<style>
	.lds-ripple {
		/* --size-spin: 10rem; */
		display: inline-flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.lds-ripple span {
		position: absolute;
		border-color: inherit;
		border-style: solid;
		border-width: 4px;
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	.lds-ripple span:nth-child(2) {
		animation-delay: -0.5s;
	}

	@keyframes lds-ripple {
		0% {
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: var(--size-spin);
			height: var(--size-spin);
			opacity: 0;
		}
	}
</style>
