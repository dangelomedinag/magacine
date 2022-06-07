<script>
	import Icon from '$components/ui/icons/icon.svelte';
	export let value;
</script>

{#if value}
	<div>
		<span class="info__property">Duration:</span>
		<span>{value} <Icon name="calendar" style="line" y="10%" /></span>
	</div>
{/if}
