<script>
	export let color = 'brown';
</script>

<div class="lds-ripple" style="border-color: {color};">
	<span />
	<span />
</div>
<div>nothing to show</div>

<style>
	.lds-ripple {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 80px;
		height: 80px;
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
			width: 72px;
			height: 72px;
			opacity: 0;
		}
	}
</style>
