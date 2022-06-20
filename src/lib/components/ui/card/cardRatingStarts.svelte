<script>
	import Icon from '$components/ui/icons/icon.svelte';

	export let rating;
	export let block = false;
	const starsLenght = 5;
	const stars = [1, 2, 3, 4, 5];
	const percent = Math.floor(rating) * 0.1;
	const sc = Math.floor(starsLenght * percent);
</script>

<!-- {@debug rating} -->

<div style:display={block ? 'flex' : 'inline-flex'}>
	{#each stars as ele}
		{@const fill = ele > sc}

		<!-- {#if fill}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				style="color: #3b3b00;"
			>
				<path
					d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
				/>
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				style="color: #e9cd50;"
			>
				<path
					d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
				/>
			</svg>
		{/if} -->
		{#if fill}
			<Icon name="star" type="solid" class="outline" />
		{:else}
			<Icon name="star" type="solid" class="solid" />
		{/if}
	{/each}
</div>

<style>
	/* :root {
		--icon-fz: 1rem;
	} */
	/* svg {
		height: var(--icon-fz);
		width: var(--icon-fz);
	} */

	/* div { */
	/* --icon-size: 2rem; */
	/* } */

	:root {
		--rating-stars-fill: #e9cd50;
		--rating-stars: rgba(233, 205, 80, 0.1);
	}

	:global(body[data-theme='light']) {
		--rating-stars-fill: #e9cd50;
		--rating-stars: rgba(107, 104, 90, 0.4);
	}

	div :global(.outline) {
		color: var(--rating-stars);
	}
	div :global(.solid) {
		color: var(--rating-stars-fill);
	}
</style>
