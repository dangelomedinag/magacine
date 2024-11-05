<script>
	import CardRatingStarts from '$components/card/cardRatingStarts.svelte';

	/** @type {{value: any, ratings: any}} */
	let { value, ratings } = $props();
</script>

{#if value}
	<div class="info__item">
		<span class="info__property">rating:</span>
		<CardRatingStarts rating={value} block />
		<div>imdb: {(value / 2).toFixed(1)}</div>

		{#if ratings?.length > 0}
			{#each ratings as item}
				<div>
					<span>{item.source}: {item.value}</span>
				</div>
			{/each}
		{/if}
	</div>
{/if}

<style>
	.info__item {
		--icon-size: 2rem;
	}
</style>
