<script>
	/** @type {{value: any}} */
	let { value } = $props();
</script>

{#if value}
	{#if value}
		<div class="info__item">
			<span class="info__property">Released:</span>
			<div>{value}</div>
		</div>
	{/if}
{/if}
