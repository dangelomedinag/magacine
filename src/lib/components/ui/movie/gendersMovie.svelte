<script>
	import Icon from '$components/ui/icons/icon.svelte';

	export let value;
</script>

{#if value}
	<div class="info__item">
		<span class="info__property"><Icon name="color-swatch" /> genders:</span>
		{#each value as item}
			<span
				class="tag"
				class:tag--action={item.toLowerCase() === 'action'}
				class:tag--adventure={item.toLowerCase() === 'adventure'}
				class:tag--scifi={item.toLowerCase() === 'sci-fi'}
				class:tag--short={item.toLowerCase() === 'short'}
				class:tag--family={item.toLowerCase() === 'family'}
				class:tag--comedy={item.toLowerCase() === 'comedy'}
				class:tag--horror={item.toLowerCase() === 'horror'}
				class:tag--mystery={item.toLowerCase() === 'mystery'}
				class:tag--thriller={item.toLowerCase() === 'thriller'}
				class:tag--documentary={item.toLowerCase() === 'documentary'}
				class:tag--crime={item.toLowerCase() === 'crime'}
				class:tag--drama={item.toLowerCase() === 'drama'}>#{item.toLowerCase()}</span
			>
		{:else}
			<span class="tag tag--unknown">unknown</span>
		{/each}
	</div>
{/if}

<style>
	.tag {
		display: inline-block;
		/* border: 1px solid rgba(21, 196, 123, 0.3); */
		padding-left: 0.5em;
		padding-right: 0.5em;
		margin-top: 0.3rem;
		margin-left: 0.175em;
		margin-right: 0.175em;
		/* font-weight: 800; */
		/* background-color: rgb(18, 54, 42);
		color: rgb(21, 196, 123); */
		background-color: rgb(24, 147, 96);
		color: rgb(255, 255, 255);
		border-radius: 50vh;
	}

	.tag--unknown {
		border: 1px solid rgba(196, 21, 56, 0.3);
		background-color: rgb(64, 35, 38);
		color: rgb(185, 63, 88);
	}

	.tag--action {
		border: 1px solid rgba(21, 88, 196, 1);
		background-color: rgba(56, 132, 255, 0.1);
		/* background-color: transparent; */
		color: var(--c-text-base);
	}
	.tag--adventure {
		border: 1px solid rgb(196, 155, 21);
		background-color: rgba(225, 255, 56, 0.1);
		/* background-color: transparent; */
		color: var(--c-text-base);
	}
	.tag--mystery {
		border: 1px solid rgb(196, 155, 21);
		background-color: rgba(225, 255, 56, 0.1);
		/* background-color: transparent; */
		color: var(--c-text-base);
	}
	.tag--scifi {
		border: 1px solid rgb(135, 21, 196);
		background-color: rgba(235, 56, 255, 0.1);
		/* background-color: transparent; */
		color: var(--c-text-base);
	}
	.tag--horror {
		border: 1px solid rgb(135, 21, 196);
		background-color: rgba(235, 56, 255, 0.1);
		/* background-color: transparent; */
		color: var(--c-text-base);
	}
	.tag--short {
		border: 1px solid rgb(74, 21, 196);
		background-color: rgba(56, 192, 255, 0.1);
		/* background-color: transparent; */
		color: var(--c-text-base);
	}
	.tag--family {
		border: 1px solid rgb(196, 21, 41);
		background-color: rgba(255, 56, 132, 0.1);
		/* background-color: transparent; */
		color: var(--c-text-base);
	}
	.tag--comedy {
		border: 1px solid rgb(196, 106, 21);
		background-color: rgba(255, 228, 56, 0.1);
		/* background-color: transparent; */
		color: var(--c-text-base);
	}
	.tag--thriller {
		border: 1px solid rgb(196, 106, 21);
		background-color: rgba(255, 228, 56, 0.1);
		/* background-color: transparent; */
		color: var(--c-text-base);
	}
	.tag--documentary {
		border: 1px solid rgb(109, 21, 196);
		background-color: rgba(255, 228, 56, 0.1);
		/* background-color: transparent; */
		color: var(--c-text-base);
	}
	.tag--crime {
		border: 1px solid rgb(21, 149, 196);
		background-color: rgba(172, 56, 255, 0.1);
		/* background-color: transparent; */
		color: var(--c-text-base);
	}
	.tag--drama {
		border: 1px solid rgb(21, 149, 196);
		background-color: rgba(172, 56, 255, 0.1);
		/* background-color: transparent; */
		color: var(--c-text-base);
	}
</style>
