<script>
	export let value;
</script>

{#if value}
	<div class="info__item">
		<span class="info__property">director:</span>
		<div>{value}</div>
	</div>
{/if}
