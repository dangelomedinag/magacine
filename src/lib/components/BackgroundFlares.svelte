<div class="background-flares">
	<div class="w">
		<img src="/bg-flares-small.png" alt="sda" />
	</div>
</div>

<style>
	.background-flares {
		position: absolute;
		top: 0;
		inset-inline: 0;
		overflow: hidden;
		display: flex;
		justify-content: center;
		pointer-events: none;
		width: 100%;
		filter: blur(50px) opacity(0.5);
		z-index: -1;
	}

	.w {
		width: 300rem;
		display: flex;
		overflow: hidden;
		justify-content: end;
		flex: 0 0 auto;
		flex: none;
		height: auto;
	}

	img {
		display: block;
		width: 230rem;
		flex: none;
		max-width: none;
	}

	/* @media (min-width: 768px) {}
	@media (min-width: 1024px) {}
	@media (min-width: 1280px) {} */
</style>
