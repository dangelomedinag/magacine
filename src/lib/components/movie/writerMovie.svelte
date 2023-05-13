<script>
	import { listFormat } from '$helpers';

	export let value;
</script>

{#if value}
	<div class="info__item">
		<span class="info__property">writer:</span>
		<div>
			{listFormat(!value.includes(',') ? [value] : value.split(','))}
		</div>
	</div>
{/if}
