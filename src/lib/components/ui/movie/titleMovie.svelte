<script>
	export let value;
</script>

{#if value}
	<div class="info__item">
		<span class="info__property">title:</span>
		<h1 class="title">{value}</h1>
	</div>
{/if}

<style>
	h1 {
		margin: 0;
		font-size: 2rem;
	}
</style>
