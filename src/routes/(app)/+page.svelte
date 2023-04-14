<script>
	// import { page } from '$app/stores';
	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import Hero from '$components/ui/hero.svelte';
	import NavbarTop from '$components/navbar/navbarTop.svelte';

	export let data;

	let act = 'movies';

	const setTab = (tab) => {
		act = tab;
	};
</script>

<svelte:head>
	<title>Magacine - home</title>
</svelte:head>

<NavbarTop>
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
	<!-- <button
		use:scrollToTarget={{ target: '#index-movies' }}
		on:click={() => setTab('movies')}
		class:active={act === 'movies'}>Movies</button
	>
	<button
		use:scrollToTarget={{ target: '#index-movies' }}
		on:click={() => setTab('series')}
		class:active={act === 'series'}>Series</button
	> -->
</NavbarTop>

<Hero />

<!-- <div class="content">
	{#if $session.user}
		<h1>¡Welcome again, <span>{$session.user.name}</span>!</h1>
	{/if}
</div> -->

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

<!-- {#if act === 'series'}
		<CarouselMovies
			details={false}
			movies={movies[1]}
			title="Our pick for {$page.data.user.name}"
		/>
	{/if} -->

<style>
	/* @media (min-width: 576px) {}
	@media (min-width: 768px) {}
	@media (min-width: 992px) {}
	@media (min-width: 1200px) {} */

	/* .content {
		padding-top: 1em;
	} */

	/* h1 {
		font-size: 2rem;
		margin-top: 0;
		font-weight: lighter;
		text-align: center;
	}

	span {
		font-weight: normal;
	} */
</style>
