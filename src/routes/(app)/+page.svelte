<script lang="ts">
	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import Hero from '$components/ui/hero.svelte';
	import NavbarTop from '$components/navbar/navbarTop.svelte';

	export let data;

	let act = 'movies';

	const setTab = (tab: string) => {
		act = tab;
	};
</script>

<svelte:head>
	<title>Magacine - home</title>
</svelte:head>

<!-- <NavbarTop>
	{#await data.stream.movies then _}
		<a
			data-sveltekit-replacestate
			class:active={act === 'movies'}
			on:click={() => setTab('movies')}
			href="#index-movies">Movies</a
		>
	{/await}
	{#await data.stream.series then _}
		<a
			data-sveltekit-replacestate
			class:active={act === 'series'}
			on:click={() => setTab('series')}
			href="#index-movies">Series</a
		>
	{/await}
</NavbarTop> -->

<Hero />

{#if data.stream}
	<div id="index-movies">
		{#await data.stream.movies then value}
			{#if act === 'movies'}
				<CarouselMovies
					details={false}
					movies={value}
					title="Our pick for {data.user.name ?? 'you'}"
				/>
			{/if}
		{/await}
		{#await data.stream.series then value}
			{#if act === 'series'}
				<CarouselMovies
					details={false}
					movies={value}
					title="Our pick for {data.user.name ?? 'you'}"
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
