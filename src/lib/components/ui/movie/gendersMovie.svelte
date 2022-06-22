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
				class:tag--animation={item.toLowerCase() === 'animation'}
				class:tag--romance={item.toLowerCase() === 'romance'}
				class:tag--musical={item.toLowerCase() === 'musical'}
				class:tag--fantasy={item.toLowerCase() === 'fantasy'}
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
		padding-left: 0.5em;
		padding-right: 0.5em;
		margin-top: 0.3rem;
		margin-left: 0.175em;
		margin-right: 0.175em;
		background-color: rgb(24, 147, 96);
		color: rgb(255, 255, 255);
		border-radius: 50vh;
		color: white;
		font-weight: 700;
	}

	.tag--unknown {
		color: rgb(185, 63, 88);
		border: 1px solid rgba(185, 63, 88, 0.1);
		background-color: rgba(185, 63, 88, 0.1);
	}

	.tag--action {
		color: rgb(21, 88, 196);
		border: 1px solid rgba(21, 88, 196, 0.1);
		background-color: rgba(21, 88, 196, 0.1);
	}
	.tag--adventure {
		color: rgb(196, 155, 21);
		border: 1px solid rgba(196, 155, 21, 0.1);
		background-color: rgba(196, 155, 21, 0.1);
	}
	.tag--mystery {
		color: rgb(196, 155, 21);
		border: 1px solid rgba(196, 155, 21, 0.1);
		background-color: rgba(196, 155, 21, 0.1);
	}
	.tag--scifi {
		color: rgb(135, 21, 196);
		border: 1px solid rgba(135, 21, 196, 0.1);
		background-color: rgba(135, 21, 196, 0.1);
	}
	.tag--horror {
		color: rgb(135, 21, 196);
		border: 1px solid rgba(135, 21, 196, 0.1);
		background-color: rgba(135, 21, 196, 0.1);
	}
	.tag--short {
		color: rgb(99, 61, 189);
		border: 1px solid rgba(99, 61, 189, 0.1);
		background-color: rgba(99, 61, 189, 0.1);
	}
	.tag--family {
		color: rgb(196, 21, 41);
		border: 1px solid rgba(196, 21, 41, 0.1);
		background-color: rgba(196, 21, 41, 0.1);
	}
	.tag--comedy {
		color: rgb(196, 106, 21);
		border: 1px solid rgba(196, 106, 21, 0.1);
		background-color: rgba(196, 106, 21, 0.1);
	}
	.tag--thriller {
		color: rgb(196, 106, 21);
		border: 1px solid rgba(196, 106, 21, 0.1);
		background-color: rgba(196, 106, 21, 0.1);
	}
	.tag--documentary {
		color: rgb(135, 21, 196);
		border: 1px solid rgba(135, 21, 196, 0.1);
		background-color: rgba(135, 21, 196, 0.1);
	}
	.tag--musical {
		color: rgb(135, 21, 196);
		border: 1px solid rgba(135, 21, 196, 0.1);
		background-color: rgba(135, 21, 196, 0.1);
	}
	.tag--crime {
		color: rgb(21, 149, 196);
		border: 1px solid rgba(21, 149, 196, 0.1);
		background-color: rgba(21, 149, 196, 0.1);
	}
	.tag--drama {
		color: rgb(126, 149, 0);
		border: 1px solid rgba(126, 149, 0, 0.1);
		background-color: rgba(126, 149, 0, 0.1);
	}
	.tag--animation {
		color: rgb(46, 162, 112);
		border: 1px solid rgba(46, 162, 112, 0.2);
		background-color: rgba(46, 162, 112, 0.2);
	}
	.tag--romance {
		color: rgb(185, 63, 88);
		border: 1px solid rgba(185, 63, 88, 0.1);
		background-color: rgba(185, 63, 88, 0.1);
	}
	.tag--fantasy {
		color: rgb(21, 149, 196);
		border: 1px solid rgba(21, 149, 196, 0.1);
		background-color: rgba(21, 149, 196, 0.1);
	}
</style>
