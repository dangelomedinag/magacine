<script>
	import Icon from '$icons/icon.svelte';
	export let value;
</script>

{#if value}
	<div>
		<span class="info__property">Year:</span>
		<span>{value} <Icon name="clock" style="line" y="10%" /></span>
	</div>
{/if}
