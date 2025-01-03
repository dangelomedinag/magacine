<script lang="ts">
	type Props = {
		value: unknown;
	};

	let { value = 0 }: Props = $props();
</script>

<div class="progress">
	<div class="value" style="width: {value}%;"></div>
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
