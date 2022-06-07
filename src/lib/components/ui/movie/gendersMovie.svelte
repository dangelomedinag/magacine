<script>
	export let value;
</script>

{#if value}
	<div class="info__item">
		<span class="info__property">genders:</span>
		{#each value as item}
			<span class="tag">{item}</span>
		{:else}
			<span class="tag tag--unknown">unknown</span>
		{/each}
	</div>
{/if}

<style>
	.tag {
		display: inline-block;
		border: 1px solid rgba(21, 196, 123, 0.3);
		padding-left: 0.5em;
		padding-right: 0.5em;
		margin-top: 0.3rem;
		margin-left: 0.175em;
		margin-right: 0.175em;
		background-color: rgb(18, 54, 42);
		color: rgb(21, 196, 123);
		border-radius: 50vh;
	}

	.tag--unknown {
		border: 1px solid rgba(196, 21, 56, 0.3);
		background-color: rgb(64, 35, 38);
		color: rgb(185, 63, 88);
	}
</style>
