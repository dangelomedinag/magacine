<script>
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

	function toggleExpand() {
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
		<details bind:open class="hide">
			<summary class:total={!getCut(value).details}>{@html getCut(value).summary}</summary>
			<span>{@html value}</span>
		</details>
		{#if getCut(value).details}
			<button on:click={toggleExpand}>
				{#if open}
					show less
				{:else}
					show more
				{/if}
			</button>
		{/if}
	</div>
{/if}

<style>
	summary::marker {
		content: '';
	}
	summary::after {
		content: '...';
	}

	summary.total:after {
		content: '';
	}

	details {
		position: relative;
	}

	details[open] summary {
		display: none;
	}

	details[open] summary:after {
		content: '';
	}

	button {
		width: 100%;
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
		font-weight: bold;
	}
	button:hover {
		opacity: 0.8;
	}

	/* details {
		display: inline-flex;
	}
	summary::marker {
		content: '';
	}
	summary {
		display: inline-flex;
		line-height: 1.6rem;
	}

	.indicator:hover {
		background-color: var(--c-divider);
		border-radius: 10px;
	}

	button {
		width: 100%;
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
		font-weight: bold;
	}
	button:hover {
		opacity: 0.8;
	} */
</style>
