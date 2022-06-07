<script>
	import { listFormat } from '$lib/helpers';

	export let value;
</script>

{#if value}
	<div class="item">
		<span class="property">actors:</span>
		<div>
			{listFormat(!value.includes(',') ? [value] : value.split(','))}
		</div>
	</div>
{/if}
