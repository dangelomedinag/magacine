<script lang="ts">
	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import Hero from '$components/ui/hero.svelte';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();

	let act = $state('movies');

	const setTab = (tab: string) => {
		act = tab;
	};
</script>

<svelte:head>
	<title>Magacine - home</title>
</svelte:head>

<Hero />

<button onclick={() => setTab('movies')}>movies</button>
<button onclick={() => setTab('series')}>series</button>
{#if data.stream}
	<div id="index-movies">
		{#await data.stream.movies then value}
			{#if act === 'movies'}
				<CarouselMovies
					details={false}
					movies={value}
					title="Our pick for {data?.user?.name ?? 'you'}"
				/>
			{/if}
		{/await}
		{#await data.stream.series then value}
			{#if act === 'series'}
				<CarouselMovies
					details={false}
					movies={value}
					title="Our pick for {data?.user?.name ?? 'you'}"
				/>
			{/if}
		{/await}
	</div>
{/if}

<style>
	/* @media (min-width: 576px) {}
	@media (min-width: 768px) {}
	@media (min-width: 992px) {}
	@media (min-width: 1200px) {} */
</style>
