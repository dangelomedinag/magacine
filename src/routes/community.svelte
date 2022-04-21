<script>
	import Tabs from '$lib/components/ui/tabs.svelte';
	let tabs = ['Suspense', 'Terror', 'Comedy'];
</script>

<Tabs {tabs}>
	<svelte:fragment let:active>
		sdasdlksald
		<div>
			{#if active == tabs[0]}
				<button>click</button>{active}
			{/if}
			{#if active == tabs[1]}
				<button>click</button>{active}
			{/if}
			{#if active == tabs[2]}
				<button>click</button>{active}
			{/if}
		</div>
	</svelte:fragment>
</Tabs>
<!-- <Tabs>
	<TabList>
		<Tab>one</Tab>
		<Tab>two</Tab>
		<Tab>three</Tab>
	</TabList>

	<TabPanel>
		<h2>First panel</h2>
	</TabPanel>

	<TabPanel>
		<h2>Second panel</h2>
	</TabPanel>

	<TabPanel>
		<h2>Third panel</h2>
	</TabPanel>
</Tabs> -->
