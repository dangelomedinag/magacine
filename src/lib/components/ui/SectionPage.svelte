<script>
	/** @type {{background?: import('svelte').Snippet, children?: import('svelte').Snippet}} */
	let { background, children } = $props();
</script>

<div class="sec-header">
	{@render background?.()}
	<div class="content">
		{@render children?.()}
	</div>
</div>

<style>
	.sec-header {
		overflow: hidden;
		position: relative;
		/* z-index: 1; */
		margin-block: 2em;
		margin-inline: var(--gap-content);
		border-radius: 15px;
		/* padding-block: 0; */
		border: 1px solid var(--c-divider);
		background: linear-gradient(to right, var(--c-front) -600%, transparent 50%);
	}
	.sec-header > div {
		padding-block: 1em;
	}

	.sec-header > .content > :global(h1) {
		/* padding-inline: 1rem; */
		margin-block-start: 0;
		margin-block-end: 0;
		font-weight: lighter;
	}

	.sec-header > .content > :global(span) {
		/* padding-top: 1rem; */
		/* padding-inline: 1rem; */
		font-weight: bold;
		color: var(--c-front);
		display: inline-flex;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
	}

	.sec-header > .content > :global(.tabs) {
		padding-top: 0.5em;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
		flex-wrap: wrap;
	}

	.sec-header > .content :global(button) {
		background-color: transparent;
		border: 1px solid transparent;
		padding-inline: 1em;
		padding-block: 0.3em;
		border-radius: 5px;
		font-size: 0.9em;
	}

	.sec-header > .content :global(.active) {
		box-shadow: var(--shadow-long);
		color: white;
		background-color: var(--c-front);
	}
</style>
