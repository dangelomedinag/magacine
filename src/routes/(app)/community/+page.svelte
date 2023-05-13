<script lang="ts">
	// import Tab, { ActiveTab, Tabs } from '$components/ui/Tab.svelte';

	// ActiveTab.set('movies');
	// let promise = new Promise((r) => setTimeout(() => r('openn'), 3000));
</script>

<svelte:head>
	<title>Magacine - Community</title>
</svelte:head>

<div class="content">
	<h1>Community</h1>

	<!-- {#each $Tabs as tab}
		<button on:click={() => ActiveTab.set(tab)}>{tab}</button>
	{/each}

	<Tab name="movies">
		<p>content 1</p>
		<h1>ok</h1>
	</Tab>

	{#await promise then value}
		<Tab name="series">
			<p>content 2</p>
			<h1>Promise... {value}</h1>
		</Tab>
	{/await}

	<Tab name="more">
		<p>content 3</p>
		<h1>svelte</h1>
	</Tab>

	<Tab name="xxx">
		<p>content 4</p>
		<h1>awesome</h1>
	</Tab> -->
</div>
