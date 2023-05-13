<script>
	import Icon from '$icons/icon.svelte';
	import Translate from '$icons/solid/translate.svg?raw';

	import { listFormat } from '$helpers';

	export let value;
</script>

{#if value?.length > 0}
	<div class="info__item">
		<span class="info__property"><Icon y="10%">{@html Translate}</Icon> language:</span>
		<span>
			{listFormat(value)}
		</span>
	</div>
{/if}
