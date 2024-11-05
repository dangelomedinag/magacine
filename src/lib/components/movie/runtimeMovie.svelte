<script>
	import Icon from '$icons/icon.svelte';
	import Clock from '$icons/outline/clock.svelte';
	/** @type {{value: any}} */
	let { value } = $props();
</script>

{#if value}
	<div>
		<span class="info__property">Duration:</span>
		<span>{value} <Icon y="10%"><Clock /></Icon></span>
	</div>
{/if}
