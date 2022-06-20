<script>
	import Icon from '$components/ui/icons/icon.svelte';
	export let value;
	let open = false;
	let lengthOfCut = 151;

	function getCut(str) {
		if (str?.length < 250) {
			return {
				summary: str
			};
		}

		let spaceIndexCut = str.slice(lengthOfCut, str.length - 1).indexOf(' ') + 151;

		return {
			summary: str.slice(0, spaceIndexCut),
			details: str.slice(spaceIndexCut + 1, str.length)
		};
	}

	function toggleExpand(e) {
		if (value < 250) {
			open = false;
			return;
		}
		open = !open;
	}
</script>

{#if value}
	<div class="info__item">
		<span class="info__property">synopsis:</span>
		<!-- <p on:click={toggleExpand}>
			{#if valueLength}
				{@html value.slice(0, 150)}...
				<button>show more <Icon name="chevron-down" y="10%" /></button>
			{:else}
				{@html value}
				{#if value?.length > 250}
					<button>show less <Icon name="chevron-up" y="10%" /></button>
				{/if}
			{/if}
		</p> -->
		<details bind:open class:indicator={value.length > 250}>
			<summary>
				{@html getCut(value).summary}{value.length > 250 && !open ? ' ...' : ''}
				{@html getCut(value).details && open ? getCut(value).details : ''}
			</summary>
		</details>
		<button on:click={toggleExpand}>
			{#if value.length > 250 && !open}
				read more <Icon name="chevron-down" y="10%" />
			{/if}
			{#if value.length > 250 && open}
				show less <Icon name="chevron-up" y="10%" />
			{/if}
		</button>
	</div>
{/if}

<style>
	details {
		display: inline-flex;
	}
	summary::marker {
		content: '';
	}
	summary {
		display: inline-flex;
	}

	details span {
		display: inline-flex;
	}

	.indicator:hover {
		background-color: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
	}

	button {
		width: 100%;
	}

	p {
		margin-top: 0;
	}

	button {
		display: flex;
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
	button:hover {
		opacity: 0.8;
		background-color: var(--c-main);
	}
</style>
