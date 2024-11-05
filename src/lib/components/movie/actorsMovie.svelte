<script>
	import Icon from '$icons/icon.svelte';
	import ExternalLink from '$icons/solid/external-link.svg?raw';

	/** @type {{value: any}} */
	let { value } = $props();
	let arr = $state();
	if (value) {
		arr = !value.includes(',') ? [value] : value.split(',');
	}
</script>

{#if value}
	<div class="info__item">
		<span class="info__property">actors:</span>
		<div>
			{#each arr as item, i}
				{@const href = 'https://www.google.com/search?q=' + encodeURI(item.trim())}

				{#if i >= arr.length - 1}
					and <a {href}>{item} <Icon>{@html ExternalLink}</Icon> </a>
				{:else}
					<a {href}>{item} <Icon>{@html ExternalLink}</Icon></a>
				{/if}
			{:else}
				<a {href}>{item} <Icon>{@html ExternalLink}</Icon></a>
			{/each}
		</div>
	</div>
{/if}

<style>
	a {
		color: var(--c-text-base);
		padding-left: 0;
		text-underline-offset: 3px;
		text-decoration-style: dotted;
		text-decoration-color: var(--divider, #878787);
	}

	a:hover {
		color: deepskyblue;
		text-decoration-color: var(--divider, deepskyblue);
	}
</style>
