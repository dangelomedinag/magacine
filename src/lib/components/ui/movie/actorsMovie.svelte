<script>
	import { listFormat } from '$lib/helpers';
	import Icon from '$components/ui/icons/icon.svelte';
	import { set } from 'nprogress';

	export let value;
	let arr;
	if (value) {
		arr = !value.includes(',') ? [value] : value.split(',');
	}
	// $: console.log(listFormat2(!value.includes(',') ? [value] : value.split(',')));
</script>

{#if value}
	<div class="info__item">
		<span class="info__property">actors:</span>
		<div>
			{#each arr as item, i}
				{@const href = 'https://www.google.com/search?q=' + encodeURI(item.trim())}
				<!-- {@debug q} -->

				{#if i >= arr.length - 1}
					and <a {href}>{item} <Icon name="external-link" /> </a>
				{:else}
					<a {href}>{item} <Icon name="external-link" /></a>
				{/if}
			{:else}
				<a {href}>{item} <Icon name="external-link" /></a>
			{/each}
			<!-- {listFormat(!value.includes(',') ? [value] : value.split(','))} -->
		</div>
	</div>
{/if}

<style>
	a {
		color: var(--c-text-base);
		padding-left: 0;
	}

	a:hover {
		color: deepskyblue;
	}
</style>
