<script>
	import { listFormat } from '$lib/helpers';

	export let value;
</script>

{#if value?.length > 0}
	<div class="info__item">
		<span class="info__property">language:</span>
		<span>
			{listFormat(value)}
		</span>
	</div>
{/if}
