<script>
	import Icon from '$icons/icon.svelte';
	import StarSolid from '$icons/solid/star.svelte';
	import StarOutline from '$icons/outline/star.svelte';

	export let rating;
	export let block = false;
	const starsLenght = 5;
	const stars = [1, 2, 3, 4, 5];
	const percent = Math.floor(rating) * 0.1;
	const sc = Math.floor(starsLenght * percent);
</script>

<div style:display={block ? 'flex' : 'inline-flex'}>
	{#each stars as ele}
		{@const fill = ele > sc}

		{#if fill}
			<Icon style="color: var(--rating-stars);">
				<StarOutline />
			</Icon>
		{:else}
			<Icon style="color: var(--rating-stars-fill);">
				<StarSolid />
			</Icon>
		{/if}
	{/each}
</div>

<style>
	:root {
		--rating-stars-fill: #e9cd50;
		--rating-stars: rgba(233, 205, 80, 0.1);
	}

	:global(body[data-theme='light']) {
		--rating-stars-fill: #e9cd50;
		--rating-stars: rgba(107, 104, 90, 0.4);
	}
</style>
