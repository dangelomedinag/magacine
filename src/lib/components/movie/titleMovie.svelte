<script>
	/** @type {{value: any}} */
	let { value } = $props();
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
		font-size: 2em;
		font-weight: 800;
	}
</style>
