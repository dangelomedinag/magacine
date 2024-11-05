<script>
	import Icon from '$icons/icon.svelte';
	import Calendar from '$icons/outline/calendar.svelte';
	/** @type {{value: any}} */
	let { value } = $props();
</script>

{#if value}
	<div>
		<span class="info__property">Year:</span>
		<span>{value} <Icon y="10%"><Calendar /></Icon></span>
	</div>
{/if}
