<script>
	import Icon from '$components/ui/icons/icon.svelte';

	import { listFormat } from '$lib/helpers';

	export let value;
</script>

{#if value?.length > 0}
	<div class="info__item">
		<span class="info__property"><Icon name="translate" y="10%" /> language:</span>
		<span>
			{listFormat(value)}
		</span>
	</div>
{/if}
