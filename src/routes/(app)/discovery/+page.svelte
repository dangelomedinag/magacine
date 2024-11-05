<script lang="ts">
	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import Hero from '$components/ui/hero.svelte';
	import GridCards from '$components/gridMovies/GridCards.svelte';

	interface Props {
		data: any;
	}

	let { data }: Props = $props();

	type Tab = 'Suspense' | 'Terror' | 'Comedy';
	let tabs: Tab[] = ['Suspense', 'Terror', 'Comedy'];
	let active: Tab | string = $state('Suspense');
	const updateActiveTab = (e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => {
		const target = e.currentTarget;
		const tab = target?.dataset?.tab;
		active = tab ?? active;
	};
</script>

<svelte:head>
	<title>Magacine - Discovery</title>
</svelte:head>

<div>
	<button data-tab="Suspense" onclick={updateActiveTab} class:active={active === 'Suspense'}
		>Suspense</button
	>
	{#if data.defer}
		{#await data.defer.movies then movies}
			<button data-tab="Terror" onclick={updateActiveTab} class:active={active === 'Terror'}
				>Terror</button
			>
			<button data-tab="Comedy" onclick={updateActiveTab} class:active={active === 'Comedy'}
				>Comedy</button
			>
		{/await}
	{/if}
</div>
{#key active}
	<Hero
		word={active}
		images={data.images}
		copy="Discover everything we have for you."
		paragraph=""
	/>
{/key}

{#if active === 'Suspense'}
	<CarouselMovies movies={data.movies[0]} full title={active} />

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
		{/if}
		{#if active === 'Comedy'}
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
