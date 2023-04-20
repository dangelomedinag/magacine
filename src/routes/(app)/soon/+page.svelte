<script lang="ts">
	import CardMovie from '$components/card/cardMovie.svelte';
	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import GridCards from '$components/gridMovies/GridCards.svelte';
	import Icon from '$components/icons/icon.svelte';
	import Film from '$components/icons/solid/film.svg?raw';
	import NavbarTop from '$components/navbar/navbarTop.svelte';
	import SectionPage from '$components/ui/SectionPage.svelte';
	export let data;

	type tabs = 'week' | 'month' | 'year';
	let active: tabs = 'week';
	const setTab = (tab: tabs) => {
		active = tab;
	};
</script>

<!-- <NavbarTop /> -->

<SectionPage>
	<span><Icon>{@html Film}</Icon>this {active}</span>
	<h1>Next Releases</h1>
	<div class="tabs">
		{#each ['week', 'month', 'year'] as element}
			<button class:active={active === element} on:click={() => setTab(element)}>{element}</button>
		{/each}
	</div>
</SectionPage>

<div class="content">
	{#if active === 'week'}
		<GridCards movies={data.movies} />
	{:else if active === 'month'}
		<GridCards movies={{ ...data.movies, results: [...data.movies.results].reverse() }} />
	{:else if active === 'year'}
		<GridCards
			movies={{
				...data.movies,
				results: [...data.movies.results].sort((a, b) => a.title.localeCompare(b.title))
			}}
		/>
	{/if}
</div>

<style>
	/* .header {
		margin-block-start: 2em;
		margin-inline: 2em;
		border-radius: 15px;
		padding-block: 2em;
		border: 1px solid var(--c-divider);
		background: linear-gradient(to right, var(--c-front) -600%, var(--c-main) 50%);
		
	}

	h1 {
		margin-block-start: 0;
		margin-block-end: 0.5em;
		font-weight: lighter;
	}

	span {
		font-weight: bold;
		color: var(--c-front);
		display: inline-flex;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
	} */

	.wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(0px, var(--card-w)));
		place-items: center;
		justify-content: center;
		gap: 1em;
		padding-block: 3em;
	}

	/* .wrapper {
		padding-top: 1em;
	} */

	button {
		background-color: transparent;
		border: 1px solid transparent;
		/* color: white; */
		padding-inline: 1em;
		padding-block: 0.3em;
		border-radius: 5px;
		/* color: var(--c-text-invert); */
		font-size: 0.9em;
	}

	.active {
		box-shadow: var(--shadow-long);
		color: white;
		background-color: var(--c-front);
		/* border-color: white; */
	}

	.tabs {
		/* padding-block: 1em; */
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
		flex-wrap: wrap;
	}
</style>
