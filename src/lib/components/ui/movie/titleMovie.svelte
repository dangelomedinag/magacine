<script>
	import Icon from '$icons/icon.svelte';
	export let value;
</script>

{#if value}
	<div class="info__item">
		<span class="info__property"><!-- <Icon name="globe" y="10%" /> -->title:</span>
		<h1 class="title">{value}</h1>
	</div>
{/if}

<style>
	h1 {
		margin: 0;
		font-size: 2rem;
		font-weight: 800;
		/* color: var(--c-front); */
	}
</style>
