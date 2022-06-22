<script>
	import CardRatingStarts from '$components/ui/card/cardRatingStarts.svelte';

	// import { listFormat } from '$lib/helpers';

	export let value;
	export let ratings;
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
