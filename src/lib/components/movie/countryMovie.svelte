<script>
	import { listFormat } from '$helpers';

	/** @type {{value: any}} */
	let { value } = $props();
</script>

{#if value}
	<div class="info__item">
		<span class="info__property">Country:</span>
		<div>
			{listFormat(!value.includes(',') ? [value] : value.split(','))}
		</div>
	</div>
{/if}
