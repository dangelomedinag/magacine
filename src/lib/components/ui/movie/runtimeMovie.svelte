<script>
	import Icon from '$icons/icon.svelte';
	import Clock from '$icons/outline/clock.svelte';
	export let value;
</script>

{#if value}
	<div>
		<span class="info__property">Duration:</span>
		<span>{value} <Icon y="10%"><Clock /></Icon></span>
	</div>
{/if}
