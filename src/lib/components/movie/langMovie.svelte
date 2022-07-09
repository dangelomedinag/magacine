<script>
	import Icon from '$icons/icon.svelte';
	import Translate from '$icons/solid/translate.svelte';

	import { listFormat } from '$lib/helpers';

	export let value;
</script>

{#if value?.length > 0}
	<div class="info__item">
		<span class="info__property"><Icon y="10%"><Translate /></Icon> language:</span>
		<span>
			{listFormat(value)}
		</span>
	</div>
{/if}
