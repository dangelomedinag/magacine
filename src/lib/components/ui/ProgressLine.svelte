<script>
	export let value = 0;
</script>

<div class="progress">
	<div class="value" style="width: {value}%;" />
</div>

<style>
	.progress {
		width: 100%;
		height: 4px;
	}

	.value {
		height: 100%;
		background-color: brown;
	}
</style>
