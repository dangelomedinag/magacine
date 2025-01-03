<script lang="ts">
	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import Hero from '$components/ui/hero.svelte';
	import Tabs from '$components/ui/Tabs.svelte';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();

	const tabs = ['Movies', 'Series'] as const;
	let active: (typeof tabs)[number] = $state('Movies');
</script>

<svelte:head>
	<title>Magacine - home</title>
</svelte:head>

<Hero />
<Tabs {tabs} bind:active></Tabs>

{#if data.stream}
	<!-- <div id="index-movies"> -->
	{#await data.stream.movies then value}
		{#if active === 'Movies'}
			<CarouselMovies
				details={false}
				movies={value}
				title="Our pick for {data?.user?.name ?? 'you'}"
			/>
		{/if}
	{/await}
	{#await data.stream.series then value}
		{#if active === 'Series'}
			<CarouselMovies
				details={false}
				movies={value}
				title="Our pick for {data?.user?.name ?? 'you'}"
			/>
		{/if}
	{/await}
	<!-- </div> -->
{/if}
