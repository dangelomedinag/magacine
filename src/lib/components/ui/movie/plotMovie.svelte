<script>
	import Icon from '$components/ui/icons/icon.svelte';
	export let value;
	let valueLength = value.length > 250;

	function toggleExpand(e) {
		valueLength = !valueLength;
	}
</script>

{#if value}
	<div class="info__item">
		<span class="info__property">synopsis:</span>
		<p on:click={toggleExpand}>
			{#if valueLength}
				{@html value.slice(0, 150)}...
				<button>show more <Icon name="chevron-down" y="10%" /></button>
			{:else}
				{@html value}
				{#if value?.length > 250}
					<button>show less <Icon name="chevron-up" y="10%" /></button>
				{/if}
			{/if}
		</p>
	</div>
{/if}

<style>
	p {
		margin-top: 0;
	}

	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.2em;
		padding-left: 0;
		opacity: 0.5;
		color: var(--c-front);
		background-color: transparent;
		border: none;
		cursor: pointer;
		font-style: oblique;
	}
	p:hover > button {
		opacity: 0.8;
	}
</style>
