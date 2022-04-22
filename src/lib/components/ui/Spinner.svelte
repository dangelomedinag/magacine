<script>
	export let color = 'brown';
	export let position = 'static';
	export let size = 80;
	export let top = false;
	export let left = false;
	export let right = false;
	export let bottom = false;
</script>

<div
	class="lds-ripple"
	style:position
	style:top
	style:left
	style:right
	style:bottom
	style:width={size + 'px'}
	style:height={size + 'px'}
	style="border-color: {color};"
>
	<span />
	<span />
</div>
<div><slot /></div>

<style>
	.lds-ripple {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		position: relative;
		/* width: 80px;
		height: 80px; */
	}
	/* .lds-ripple.absolute {
		position: absolute;
		top: 0;
		left: 0;
	} */
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
			width: 72px;
			height: 72px;
			opacity: 0;
		}
	}
</style>
