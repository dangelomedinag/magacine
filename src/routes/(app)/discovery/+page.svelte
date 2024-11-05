<script lang="ts">
	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import Hero from '$components/ui/hero.svelte';
	import GridCards from '$components/gridMovies/GridCards.svelte';
	import Tabs from '$components/ui/Tabs.svelte';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();

	const tabs = ['Suspense', 'Terror', 'Comedy'] as const;
	let active: (typeof tabs)[number] = $state('Suspense');
</script>

<svelte:head>
	<title>Magacine - Discovery</title>
</svelte:head>

<Hero
	word={active}
	images={data.images}
	copy="Discover everything we have for you."
	paragraph="only available on magacine"
/>

<Tabs {tabs} bind:active></Tabs>

{#if active === 'Suspense'}
	<CarouselMovies
		movies={data.movies[0]}
		full
		title="{active} {data.movies[0]?.totalResults ?? 'loading'} results"
	/>

	<GridCards details movies={data.movies[1]} />
{/if}

{#if data.defer}
	{#await data.defer.movies then movies}
		{#if active === 'Terror'}
			<CarouselMovies
				movies={movies[0]}
				full
				title="{active} {movies[0]?.totalResults ?? 'loading'} results"
				--card-w="240px"
				--card-h="390px"
			/>
			<CarouselMovies
				movies={movies[1]}
				title="{active} {movies[1]?.totalResults ?? 'loading'} results"
			/>
		{:else if active === 'Comedy'}
			<CarouselMovies
				movies={movies[2]}
				full
				title="{active} {movies[2]?.totalResults ?? 'loading'} results"
				--card-w="240px"
				--card-h="370px"
			/>
			<CarouselMovies
				movies={movies[3]}
				title="{active} {movies[3]?.totalResults ?? 'loading'} results"
			/>
		{/if}
	{/await}
{/if}

<style>
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
