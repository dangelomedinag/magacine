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

<style>
	/* @media (min-width: 576px) {}
	@media (min-width: 768px) {}
	@media (min-width: 992px) {}
	@media (min-width: 1200px) {} */

	div {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 1em;
		gap: 0.5em;
	}

	button {
		background-color: transparent;
		border-color: transparent;
		font-weight: bold;
		padding-block: 0.3em;
		padding-inline: 0.5em;
		border-radius: 5px;
		opacity: 0.5;
		cursor: pointer;
	}

	.active {
		opacity: 1;
		background-color: var(--c-front);
		color: white;
	}
</style>
