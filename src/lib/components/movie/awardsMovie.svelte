<script>
	/** @type {{value: any}} */
	let { value } = $props();
</script>

{#if value}
	<div class="info__item">
		<span class="info__property">awares:</span>
		<div>
			{value}
		</div>
	</div>
{/if}
