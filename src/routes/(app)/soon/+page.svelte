<script lang="ts">
	import GridCards from '$components/gridMovies/GridCards.svelte';
	import SectionPage from '$components/ui/SectionPage.svelte';
	// icons
	import Icon from '$components/icons/icon.svelte';
	import Film from '$components/icons/solid/film.svg?raw';

	export let data;

	type Tab = 'week' | 'month' | 'year';
	type ButtonMouseEvent = MouseEvent & { currentTarget: EventTarget & HTMLButtonElement };

	let tabs: Tab[] = ['week', 'month', 'year'];
	let active: Tab | string = 'week';
	const updateActiveTab = (e: ButtonMouseEvent) => {
		const target = e.currentTarget;
		const tab = target?.dataset?.tab;
		active = tab ?? active;
	};

	let movies = data.movies;
	$: if (active) movies = { ...data.movies, results: data.movies.results.reverse() };
</script>

<SectionPage>
	<span><Icon>{@html Film}</Icon>this {active}</span>
	<h1>Next Releases</h1>
	<div class="tabs">
		{#each tabs as element}
			<button data-tab={element} class:active={active === element} on:click={updateActiveTab}
				>{element}</button
			>
		{/each}
	</div>
</SectionPage>

<div class="content">
	<GridCards {movies} />
</div>

<style>
</style>
